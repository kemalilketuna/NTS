from rest_framework import serializers
from .models import Stage, Issue, AtachmentFile
from project_manager.models import Project
from rest_framework.exceptions import PermissionDenied


class IssueSerializer(serializers.ModelSerializer):
    project = serializers.UUIDField()
    stage = serializers.UUIDField()

    class Meta:
        model = Issue
        fields = [
            "id",
            "title",
            "stage",
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


class AtachmentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtachmentFile
        fields = "__all__"
