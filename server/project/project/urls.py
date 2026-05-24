from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from app.admin_auto_login import auto_admin_login
from app.views import (
    ApplicationCreateView,
    MeView,
    ProfileView,
    RegisterView,
    TourDetailView,
    TourListView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("admin-login/", auto_admin_login),

    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/tours/", TourListView.as_view(), name="tour-list"),
    path("api/tours/<int:pk>/", TourDetailView.as_view(), name="tour-detail"),
    path("api/applications/", ApplicationCreateView.as_view(), name="application-create"),
    path("api/profile/", ProfileView.as_view(), name="profile"),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/me/", MeView.as_view(), name="me"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)