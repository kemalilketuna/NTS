import uuid
from django.db import models
from user_manager.models import User
from django.contrib.auth.models import Group
from backend.storage_backends import ProjectIconStorage


class Project(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(
        max_length=255,
        unique=True,
    )
    description = models.TextField(
        blank=True,
        null=True,
    )
    icon = models.FileField(
        storage=ProjectIconStorage,
        upload_to="./",
        blank=True,
        null=True,
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="created_projects",
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        permissions = [
            ("edit_project", "Can edit project"),
            ("admin_project", "Can manage project"),
        ]

    def __str__(self):
        return self.name


class ProjectLastInteraction(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="access_logs", editable=False
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="access_logs", editable=False
    )
    accessed_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["project", "user"]


class PermissionGroup(Group):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
