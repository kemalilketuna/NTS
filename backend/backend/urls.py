from django.contrib import admin
from django.urls import path, include
from user_manager.urls import account_patterns, user_patterns, auth_patterns
from project_manager.urls import project_patterns
from issue_manager.urls import issue_patterns, attachment_patterns

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include(user_patterns)),
    path("api/account/", include(account_patterns)),
    path("api/project/", include(project_patterns)),
    path("api/issue/", include(issue_patterns)),
    path("api/auth/", include(auth_patterns)),
    path("api/attachment/", include(attachment_patterns)),
]

urlpatterns += [path("silk/", include("silk.urls", namespace="silk"))]
