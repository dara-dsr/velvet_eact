from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from django.utils.html import format_html
from .models import Tour, Application, UserProfile


class CustomUserChangeForm(UserChangeForm):
    phone = forms.CharField(label="Телефон", max_length=30, required=False)
    avatar = forms.ImageField(label="Фото профиля", required=False, widget=forms.ClearableFileInput)

    class Meta:
        model = User
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            profile = getattr(self.instance, "profile", None)
            self.fields["phone"].initial = profile.phone if profile else ""
            if profile and profile.avatar:
                self.fields["avatar"].initial = profile.avatar

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.phone = self.cleaned_data.get("phone", "")
            avatar = self.cleaned_data.get("avatar")
            if avatar is False:
                profile.avatar = None
            elif avatar:
                profile.avatar = avatar
            profile.save()
        return user


class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    list_display = ("username", "email", "first_name", "last_name", "get_phone", "get_avatar_thumb", "is_staff")
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Личная информация", {"fields": ("first_name", "last_name", "email", "phone", "avatar")}),
        ("Права доступа", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Важные даты", {"fields": ("last_login", "date_joined")}),
    )

    @admin.display(description="Телефон")
    def get_phone(self, obj):
        profile = getattr(obj, "profile", None)
        return profile.phone if profile else "—"

    @admin.display(description="Фото")
    def get_avatar_thumb(self, obj):
        profile = getattr(obj, "profile", None)
        if profile and profile.avatar:
            return format_html(
                '<img src="{}" width="40" height="40" style="border-radius:50%;object-fit:cover;" />',
                profile.avatar.url,
            )
        return "—"


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ("title", "city", "season", "duration", "price")
    list_filter = ("season", "city")
    search_fields = ("title", "city")


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "tour", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "phone")
