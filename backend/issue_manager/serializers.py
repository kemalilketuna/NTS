from rest_framework import serializers
from .models import Stage, Issue, AttachmentFile, Comment
from project_manager.models import Project
from rest_framework.exceptions import PermissionDenied
from user_manager.serializers import UserSerializer


class IssueSerializer(serializers.ModelSerializer):
    project = serializers.UUIDField()
    stage = serializers.UUIDField()

    class Meta:
        model = Issue
        fields = [
            "id",
            "title",
            "stage",
            "description",
            "created_by",
            "assigned_to",
            "project",
            "priority",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ["created_by", "updated_at", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        project = Project.objects.get(id=validated_data["project"])

        if not user.has_perm("project_manager.edit_project", project):
            raise PermissionDenied(
                "You don't have permission to create issues in this project."
            )

        return Issue.objects.create(
            title=validated_data["title"],
            stage_id=validated_data["stage"],
            project=project,
            created_by=user,
        )

    def update(self, instance, validated_data):
        if "stage" in validated_data:
            instance.stage_id = validated_data.pop("stage")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class StageSerializer(serializers.ModelSerializer):
    issues = IssueSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = "__all__"


class AttachmentFileSerializer(serializers.ModelSerializer):
    issue = serializers.UUIDField()
    project = serializers.UUIDField()

    class Meta:
        model = AttachmentFile
        fields = "__all__"
        read_only_fields = [
            "created_by",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        project = Project.objects.get(id=validated_data.pop("project"))

        if not user.has_perm("project_manager.edit_project", project):
            raise PermissionDenied(
                "You don't have permission to create attachments in this project."
            )

        return AttachmentFile.objects.create(
            issue_id=validated_data.pop("issue"),
            project=project,
            created_by=user,
            **validated_data
        )


class CommentSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    issue = serializers.UUIDField()
    project = serializers.UUIDField()

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = [
            "created_by",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        project = Project.objects.get(id=validated_data.pop("project"))

        if not user.has_perm("project_manager.edit_project", project):
            raise PermissionDenied(
                "You don't have permission to create comments in this project."
            )

        return Comment.objects.create(
            issue_id=validated_data.pop("issue"),
            project=project,
            created_by=user,
            **validated_data
        )


class IssueDetailSerializer(serializers.ModelSerializer):
    attachments = AttachmentFileSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    created_by = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True, many=True)
    description = serializers.CharField(required=False)

    class Meta:
        model = Issue
        fields = [
            "id",
            "title",
            "stage",
            "description",
            "created_by",
            "assigned_to",
            "attachments",
            "comments",
            "project",
            "priority",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ["created_by", "updated_at", "created_at"]
