from django.contrib import admin
from .models import Tour, Application


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
# Register your models here.
