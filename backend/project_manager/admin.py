from django.contrib import admin
from .models import Project, ProjectLastInteraction


class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_by",
        "created_at",
        "updated_at",
    )
    search_fields = ("name", "description", "created_by__username")
    readonly_fields = ("id", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "icon",
                    "description",
                    "created_by",
                )
            },
        ),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


class ProjectLastInteractionAdmin(admin.ModelAdmin):
    list_display = (
        "project",
        "user",
        "accessed_at",
    )
    list_filter = ("project", "user")
    search_fields = (
        "user__username",
        "project__name",
    )
    ordering = ("-accessed_at",)
    readonly_fields = ("accessed_at",)


admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectLastInteraction, ProjectLastInteractionAdmin)
