from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.pagination import CursorPagination
from user_manager.permissions import IsProjectMember
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response


class StagePagination(CursorPagination):
    page_size = 10
    ordering = "order"


class StageListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    queryset = Stage.objects.all()
    serializer_class = StageSerializer
    pagination_class = StagePagination


class IssueCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IssueSerializer

    def create(self, request, *args, **kwargs):
        project = Project.objects.get(id=request.data["project"])
        user = request.user
        if not user.has_perm("project_manager.edit_project", project):
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)


class IssueRetrieveUpdateDestroyAPIViewView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
