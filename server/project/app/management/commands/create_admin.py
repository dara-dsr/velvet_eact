import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Create default admin user if it does not exist"

    def handle(self, *args, **kwargs):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@mail.ru")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "admin12345")

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "is_staff": True,
                "is_superuser": True,
            },
        )

        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Admin user '{username}' created"))
        else:
            user.is_staff = True
            user.is_superuser = True
            user.email = email
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.WARNING(f"Admin user '{username}' updated"))