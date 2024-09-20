from rest_framework.permissions import BasePermission
from project_manager.models import Project
from issue_manager.models import Stage, Issue, AtachmentFile


class IsProjectMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if isinstance(obj, Project):
            return user.has_perm("project_manager.edit_project", obj)
        elif (
            isinstance(obj, Stage)
            or isinstance(obj, Issue)
            or isinstance(obj, AtachmentFile)
        ):
            return user.has_perm("project_manager.edit_project", obj.project)
        return False


class IsProjectAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.has_perm("project_manager.admin_project", obj)
