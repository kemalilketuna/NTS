from django.contrib import admin
from .models import Stage, Issue, AtachmentFile


class ClomunAdmin(admin.ModelAdmin):
    list_display = ("name", "project")
    search_fields = ("name", "project__name")
    list_filter = ("project",)


class AtachmentFileInline(admin.StackedInline):
    model = AtachmentFile
    extra = 1


class IssueAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "stage",
        "created_by",
        "display_assigned_users",
        "priority",
        "project",
        "updated_at",
        "created_at",
    )

    def display_assigned_users(self, obj):
        text = ", ".join([user.username for user in obj.assigned_to.all()])
        if len(text) > 50:
            return text[:50] + "..."
        return text

    search_fields = ("title",)
    list_filter = ("priority", "created_at", "assigned_to")
    filter_horizontal = ("assigned_to",)
    autocomplete_fields = ("created_by",)
    inlines = [AtachmentFileInline]


admin.site.register(Stage, ClomunAdmin)
admin.site.register(Issue, IssueAdmin)
