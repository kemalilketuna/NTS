from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from user_manager.permissions import IsProjectMember, IsProjectAdmin
from .models import Project, PermissionGroup, ProjectLastInteraction
from .serializers import (
    ProjectDetailSerializer,
    ProjectMemberSerializer,
    ProjectSerializer,
    ProjectListSerializer,
)
from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework import status
from user_manager.serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination


class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProjectAdmin]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "HEAD"]:
            return [permission() for permission in [IsAuthenticated, IsProjectMember]]
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        data = kwargs.get("data")
        payload = data.copy()
        if payload.get("icon") == "null":
            payload["icon"] = None
        kwargs["data"] = payload
        return super().get_serializer(*args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if "icon" in request.data:
            project = self.get_object()
            if project.icon:
                project.icon.delete()
        return super().patch(request, *args, **kwargs)


class ProjectDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = ProjectDetailSerializer

    def get_object(self):
        user = self.request.user
        project = (
            Project.objects.select_related("created_by")
            .prefetch_related("stages")
            .prefetch_related("stages__issues")
            .get(id=self.kwargs["pk"])
        )
        ProjectLastInteraction.objects.update_or_create(project=project, user=user)
        return project


class ProjectCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer


class ProjectListView(generics.ListAPIView):
    class ProjectPagination(PageNumberPagination):
        page_size = 10

    permission_classes = [IsAuthenticated]
    serializer_class = ProjectListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]
    pagination_class = ProjectPagination

    def get_queryset(self):
        user = self.request.user
        return (
            Project.objects.filter(access_logs__user=user)
            .order_by("-access_logs__accessed_at")
            .select_related("created_by")
        )


class AddRemoveProjectMemberView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsProjectAdmin]
    serializer_class = ProjectMemberSerializer

    def manage_membership(self, request, action):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        project = serializer.validated_data["project"]
        permission = serializer.validated_data["permission"]

        group_name = (
            f"{project.name} Admins"
            if permission == "project_manager.admin_project"
            else f"{project.name} Members"
        )
        group = Group.objects.get(name=group_name)

        if action == "add":
            user.groups.add(group)
            ProjectLastInteraction.objects.update_or_create(project=project, user=user)
            return Response(status=status.HTTP_201_CREATED)
        elif action == "remove":
            group.user_set.remove(user)
            ProjectLastInteraction.objects.filter(project=project, user=user).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        return self.manage_membership(request, "add")

    def delete(self, request, *args, **kwargs):
        return self.manage_membership(request, "remove")


class ProjectMemberListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = UserSerializer

    def get_queryset(self):
        return (
            PermissionGroup.objects.select_related("project")
            .filter(project__id=self.kwargs["pk"], name__endswith="Members")
            .first()
            .user_set.all()
        )


class ProjectAdminListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = UserSerializer

    def get_queryset(self):
        return (
            PermissionGroup.objects.select_related("project")
            .filter(project__id=self.kwargs["pk"], name__endswith="Admins")
            .first()
            .user_set.all()
        )
