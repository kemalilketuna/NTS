from django.urls import path
from .views import *

issue_patterns = [
    path("create/", IssueCreateView.as_view(), name="issue-create"),
    path(
        "<uuid:pk>/",
        IssueRetrieveUpdateDestroyAPIViewView.as_view(),
        name="issue-retrieve-update-destroy",
    ),
    path("detail/<uuid:pk>/", IssueDetailView.as_view(), name="issue-detail"),
]

attachment_patterns = [
    path("create/", AttachmentFileCreateView.as_view(), name="attachment-file-create"),
    path(
        "<uuid:pk>/",
        AttachmentFileRetrieveUpdateDestroyAPIView.as_view(),
        name="attachment-file-retrieve-update-destroy",
    ),
]

comment_patterns = [
    path("create/", CommentCreateView.as_view(), name="comment-create"),
    path(
        "<uuid:pk>/",
        CommentRetrieveUpdateDestroyAPIView.as_view(),
        name="comment-retrieve-update-destroy",
    ),
]
