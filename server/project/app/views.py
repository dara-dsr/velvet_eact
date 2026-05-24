from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Tour, Application
from .serializers import TourSerializer, ApplicationSerializer, RegisterSerializer


class TourListView(generics.ListAPIView):
    serializer_class = TourSerializer

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


class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer

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


class MeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "email": request.user.email,
        })
# Create your views here.
