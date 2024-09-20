from rest_framework import serializers
from .models import Project
from user_manager.models import User
from issue_manager.serializers import StageSerializer
from user_manager.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "created_at",
            "updated_at",
            "icon",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["created_by"] = user
        return super().create(validated_data)


class ProjectListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "created_at",
            "icon",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProjectDetailSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True, read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "created_at",
            "updated_at",
            "stages",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class PermissionChoiceField(serializers.ChoiceField):
    def __init__(self, *args, **kwargs):
        self.choices = [
            ("project_manager.admin_project", "Admin"),
            ("project_manager.edit_project", "Member"),
        ]
        kwargs["choices"] = self.choices
        super().__init__(*args, **kwargs)


class ProjectMemberSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.only("id"))
    project = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.only("id", "name")
    )
    permission = PermissionChoiceField()
