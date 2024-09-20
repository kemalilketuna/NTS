from django.db import models
from django.contrib.auth.models import AbstractUser
from backend.storage_backends import ProfilePictureStorage
import uuid


class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    firebase_uid = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True,
    )
    bio = models.TextField(
        max_length=500,
        blank=True,
        null=True,
    )
    profile_picture = models.ImageField(
        storage=ProfilePictureStorage,
        upload_to="./",
        null=True,
        blank=True,
    )
