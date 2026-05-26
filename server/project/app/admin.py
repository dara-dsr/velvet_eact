from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from django.utils.html import format_html
from .models import Tour, Application, UserProfile, Review


class CitiesField(forms.CharField):
    """Comma-separated text input that serializes to/from a list."""

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('required', False)
        kwargs.setdefault('help_text', 'Города маршрута через запятую: Токио, Киото, Осака')
        kwargs.setdefault('widget', forms.TextInput(attrs={'style': 'width:100%', 'placeholder': 'Токио, Киото, Осака'}))
        super().__init__(*args, **kwargs)

    def prepare_value(self, value):
        if isinstance(value, list):
            return ', '.join(value)
        return value or ''

    def to_python(self, value):
        raw = super().to_python(value)
        if not raw:
            return []
        return [c.strip() for c in raw.split(',') if c.strip()]


class TourAdminForm(forms.ModelForm):
    cities = CitiesField(label='Маршрут (города)')

    class Meta:
        model = Tour
        fields = '__all__'


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
    form = TourAdminForm
    list_display = ("title", "get_route", "season", "duration", "price")
    list_filter = ("season",)
    search_fields = ("title",)

    @admin.display(description="Маршрут")
    def get_route(self, obj):
        return ' → '.join(obj.cities) if obj.cities else '—'


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "tour", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "phone")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("get_author", "tour", "status", "created_at", "get_short_text")
    list_filter = ("status", "created_at", "tour")
    search_fields = ("user__username", "user__first_name", "user__last_name", "tour__title", "text")
    list_editable = ("status",)
    ordering = ("-created_at",)
    readonly_fields = ("user", "tour", "created_at")

    @admin.display(description="Автор")
    def get_author(self, obj):
        first = obj.user.first_name
        last = obj.user.last_name
        if first and last:
            return f"{first} {last[0]}. (@{obj.user.username})"
        if first:
            return f"{first} (@{obj.user.username})"
        return f"@{obj.user.username}"

    @admin.display(description="Текст")
    def get_short_text(self, obj):
        return obj.text[:80] + "…" if len(obj.text) > 80 else obj.text
