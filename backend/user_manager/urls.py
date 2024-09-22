from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
)
from .views import *

user_patterns = [
    path("search/", SearchUserListView.as_view(), name="search_user"),
    path("<uuid:pk>/", UserDetailView.as_view(), name="user_detail"),
]

account_patterns = [
    path("me/", ProfileView.as_view(), name="profile"),
    path("update/", ProfileUpdateView.as_view(), name="update_profile"),
    path("create/", ProfileCreateView.as_view(), name="create_profile"),
]

auth_patterns = [
    path("token/", TokenPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("sign-out/", TokenBlacklistView.as_view(), name="logout"),
]
