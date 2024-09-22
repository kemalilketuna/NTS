from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import User
from rest_framework.views import APIView
from firebase_admin import auth


class TokenPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        idToken = request.data.get("idToken")
        try:
            decoded_token = auth.verify_id_token(idToken)
            uid = decoded_token["uid"]
            user = User.objects.get(firebase_uid=uid)
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=200,
            )
        except User.DoesNotExist:
            return Response({"detail": "User does not exist"}, status=404)

        except Exception as e:
            return Response({"detail": "Invalid ID token"}, status=400)


class ProfileCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            idToken = request.data.get("idToken")
            try:
                decoded_token = auth.verify_id_token(idToken)
                uid = decoded_token["uid"]
                serializer.validated_data["firebase_uid"] = uid
            except Exception:
                return Response({"detail": "Invalid ID token"}, status=400)
            try:
                user = serializer.save()
            except Exception as e:
                print(e)
                return Response({"detail": "User ceration failed"}, status=500)
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchUserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["username", "email"]


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_serializer(self, *args, **kwargs):
        data = kwargs.get("data")
        payload = data.copy()
        if payload.get("profile_picture") == "null":
            payload["profile_picture"] = None
        kwargs["data"] = payload
        return super().get_serializer(*args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if "profile_picture" in request.data:
            if self.request.user.profile_picture:
                self.request.user.profile_picture.delete()
        return super().patch(request, *args, **kwargs)
