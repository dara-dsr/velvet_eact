from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tour, Application


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    tour_title = serializers.CharField(source="tour.title", read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "user",
            "tour",
            "tour_title",
            "name",
            "phone",
            "email",
            "comment",
            "status",
            "created_at",
        ]
        read_only_fields = ["user", "status", "created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password_repeat"]

    def validate(self, data):
        if data["password"] != data["password_repeat"]:
            raise serializers.ValidationError("Пароли не совпадают")
        return data

    def create(self, validated_data):
        validated_data.pop("password_repeat")
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )