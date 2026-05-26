from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Tour, Application, UserProfile


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
    login = serializers.CharField(source='username')
    password = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["login", "email", "password", "password_repeat"]

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


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
    new_password_repeat = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['new_password_repeat']:
            raise serializers.ValidationError("Новые пароли не совпадают")
        return data

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Неверный текущий пароль")
        return value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        del self.fields['username']
        self.fields['login'] = serializers.CharField()

    def validate(self, attrs):
        attrs['username'] = attrs.pop('login')
        return super().validate(attrs)