from django.urls import path
from .views import *

project_patterns = [
    path("search/", ProjectListView.as_view(), name="search_project"),
    path(
        "<uuid:pk>/",
        ProjectRetrieveUpdateDestroyView.as_view(),
        name="project_detail",
    ),
    path("create/", ProjectCreateView.as_view(), name="create_project"),
    path("detail/<uuid:pk>/", ProjectDetailView.as_view(), name="project_detail"),
    path("<uuid:pk>/members/", ProjectMemberListView.as_view(), name="project_members"),
    path("<uuid:pk>/admins/", ProjectAdminListView.as_view(), name="project_admins"),
    path(
        "add-remove-member/",
        AddRemoveProjectMemberView.as_view(),
        name="add_project_member",
    ),
]
