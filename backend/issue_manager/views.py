from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.pagination import CursorPagination
from user_manager.permissions import IsProjectMember
from rest_framework.permissions import IsAuthenticated


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


class IssueRetrieveUpdateDestroyAPIViewView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class IssueDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = IssueDetailSerializer

    def get_object(self):
        return (
            Issue.objects.select_related("created_by")
            .prefetch_related("comments")
            .prefetch_related("attachments")
            .prefetch_related("assigned_to")
            .prefetch_related("comments__created_by")
            .get(id=self.kwargs["pk"])
        )


class AttachmentFileCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttachmentFileSerializer


class AttachmentFileDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttachmentFileSerializer

    def get_queryset(self):
        return AttachmentFile.objects.filter(issue_id=self.kwargs["pk"])
