from django.db import models
from user_manager.models import User
from project_manager.models import Project
from backend.storage_backends import AttachmentStorage
import uuid


class Stage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
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
    description = models.TextField(blank=True, null=True)
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


class AttachmentFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    size = models.IntegerField()
    file = models.FileField(storage=AttachmentStorage, upload_to="./")
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name="attachments",
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="attachments",
        editable=False,
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="attachments",
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="comments", editable=False
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="comments",
        null=True,
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
