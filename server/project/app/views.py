from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .models import Tour, Application, UserProfile, Review
from .serializers import TourSerializer, ApplicationSerializer, RegisterSerializer, ChangePasswordSerializer, CustomTokenObtainPairSerializer, ReviewSerializer


class TourListView(generics.ListAPIView):
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Tour.objects.all()

        season = self.request.query_params.get("season")
        city = self.request.query_params.get("city")
        duration = self.request.query_params.get("duration")
        budget = self.request.query_params.get("budget")

        if season:
            queryset = queryset.filter(season=season)

        if city:
            queryset = queryset.filter(city__icontains=city)

        if duration:
            queryset = queryset.filter(duration__lte=duration)

        if budget:
            queryset = queryset.filter(price__lte=budget)

        return queryset


class TourDetailView(generics.RetrieveAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]


class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)


class ProfileView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user).order_by("-created_at")


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": profile.phone if profile else "",
            "avatar": request.build_absolute_uri(profile.avatar.url) if profile and profile.avatar else None,
        })

    def patch(self, request):
        user = request.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.save()

        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.phone = request.data.get('phone', profile.phone)

        if request.data.get('remove_avatar') == 'true':
            if profile.avatar:
                profile.avatar.delete(save=False)
            profile.avatar = None
        elif request.FILES.get('avatar'):
            profile.avatar = request.FILES['avatar']

        profile.save()

        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": profile.phone,
            "avatar": request.build_absolute_uri(profile.avatar.url) if profile.avatar else None,
        })


class ChangePasswordView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({"detail": "Пароль успешно изменён"})


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Review.objects.filter(status="Опубликован").order_by("-created_at")


class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        tour = serializer.validated_data["tour"]
        has_confirmed = Application.objects.filter(
            user=self.request.user, tour=tour, status="Подтверждена"
        ).exists()
        if not has_confirmed:
            raise PermissionDenied("У вас нет подтверждённой заявки на этот тур")
        serializer.save(user=self.request.user)


class TourReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Review.objects.filter(tour_id=self.kwargs["pk"], status="Опубликован").order_by("-created_at")
