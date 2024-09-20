from django.urls import path
from .views import *

issue_patterns = [
    path("create/", IssueCreateView.as_view(), name="issue-create"),
    path(
        "<uuid:pk>/",
        IssueRetrieveUpdateDestroyAPIViewView.as_view(),
        name="issue-retrieve-update-destroy",
    ),
]
