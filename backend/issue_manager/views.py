from rest_framework import generics, status
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
