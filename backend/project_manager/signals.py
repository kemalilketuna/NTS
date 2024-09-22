from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Project, PermissionGroup, ProjectLastInteraction
from guardian.shortcuts import assign_perm
from .utils import get_random_image
from django.core.files.base import ContentFile
import threading


@receiver(post_save, sender=Project)
def assign_permissions(sender, instance, created, **kwargs):
    if not created:
        return
    admin_group = PermissionGroup.objects.create(
        name=f"{instance.id} Admins", project=instance
    )
    member_group = PermissionGroup.objects.create(
        name=f"{instance.id} Members", project=instance
    )
    assign_perm("project_manager.admin_project", admin_group, instance)
    assign_perm("project_manager.edit_project", member_group, instance)
    admin_group.user_set.add(instance.created_by)
    member_group.user_set.add(instance.created_by)

    ProjectLastInteraction.objects.update_or_create(
        project=instance, user=instance.created_by
    )


def set_project_icon(instance):
    response = get_random_image()
    icon = ContentFile(response, name="random_image.jpg")
    instance.icon.save("random_image.jpg", icon)
    instance.save()


@receiver(post_save, sender=Project)
def set_icon(sender, instance, created, **kwargs):
    if created and not instance.icon:
        threading.Thread(target=set_project_icon, args=(instance,)).start()


@receiver(post_save, sender=Project)
def init_default_stages(sender, instance, created, **kwargs):
    if not created:
        return
    instance.stages.create(name="TO DO", order=0)
    instance.stages.create(name="IN PROGRESS", order=1)
    instance.stages.create(name="DONE", order=2)


@receiver(pre_delete, sender=Project)
def delete_groups(sender, instance, **kwargs):
    PermissionGroup.objects.filter(project=instance).delete()
