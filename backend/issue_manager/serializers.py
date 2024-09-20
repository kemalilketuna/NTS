from rest_framework import serializers
from .models import Stage, Issue, AtachmentFile
from project_manager.models import Project


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
        request = self.context["request"]
        user = request.user
        project = Project.objects.get(id=validated_data["project"])
        stage = Stage.objects.get(id=validated_data["stage"])

        issue = Issue.objects.create(
            title=validated_data["title"],
            stage=stage,
            project=project,
            created_by=user,
        )
        return issue

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.priority = validated_data.get("priority", instance.priority)
        if validated_data.get("stage"):
            try:
                instance.stage = Stage.objects.get(id=validated_data["stage"])
            except Stage.DoesNotExist:
                pass
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
