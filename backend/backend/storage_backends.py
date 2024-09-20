from storages.backends.s3boto3 import S3Boto3Storage
from uuid import uuid4


class BaseStorage(S3Boto3Storage):
    bucket_name = "base-files"

    def _save(self, name, content):
        name = str(uuid4()) + "." + name.split(".")[-1]
        return super()._save(name, content)


class ProfilePictureStorage(BaseStorage):
    bucket_name = "profile-pictures"


class AttachmentStorage(BaseStorage):
    bucket_name = "attachments"


class ProjectIconStorage(BaseStorage):
    bucket_name = "project-icons"


class StaticFileStorage(S3Boto3Storage):
    bucket_name = "static-files"
