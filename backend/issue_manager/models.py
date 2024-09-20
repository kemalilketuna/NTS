from django.db import models
from user_manager.models import User
from project_manager.models import Project
from backend.storage_backends import AttachmentStorage
import uuid


class Stage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    order = models.IntegerField(default=0)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="stages", editable=False
    )

    def __str__(self):
        return self.name


class Issue(models.Model):
    class Priority(models.IntegerChoices):
        HIGHEST = 1
        HIGH = 2
        MEDIUM = 3
        LOW = 4
        LOWEST = 5

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    stage = models.ForeignKey(
        Stage, on_delete=models.CASCADE, related_name="issues", editable=False
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="created_issues",
        null=True,
    )
    assigned_to = models.ManyToManyField(
        User, related_name="assigned_issues", blank=True
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="issues", editable=False
    )
    priority = models.IntegerField(choices=Priority.choices, default=Priority.MEDIUM)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AtachmentFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(storage=AttachmentStorage, upload_to="./")
    uploaded_to = models.ForeignKey(
        Issue, on_delete=models.CASCADE, related_name="attachments"
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="attachments",
        editable=False,
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
