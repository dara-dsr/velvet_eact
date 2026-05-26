from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Tour, Application, UserProfile, Review


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    tour_title = serializers.CharField(source="tour.title", read_only=True)
    has_review = serializers.SerializerMethodField()
    review_status = serializers.SerializerMethodField()

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
            "has_review",
            "review_status",
        ]
        read_only_fields = ["user", "status", "created_at"]

    def get_has_review(self, obj):
        if not obj.user or not obj.tour or obj.status != "Подтверждена":
            return False
        return Review.objects.filter(user=obj.user, tour=obj.tour).exists()

    def get_review_status(self, obj):
        if not obj.user or not obj.tour:
            return None
        review = Review.objects.filter(user=obj.user, tour=obj.tour).first()
        return review.status if review else None


class ReviewSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    tour_title = serializers.CharField(source="tour.title", read_only=True)

    class Meta:
        model = Review
        fields = ["id", "tour", "tour_title", "text", "author_name", "author_avatar", "created_at"]
        read_only_fields = ["created_at"]

    def get_author_name(self, obj):
        first = obj.user.first_name
        last = obj.user.last_name
        if not first:
            return "Аноним"
        if last:
            return f"{first} {last[0]}."
        return first

    def get_author_avatar(self, obj):
        request = self.context.get("request")
        profile = getattr(obj.user, "profile", None)
        if profile and profile.avatar:
            return request.build_absolute_uri(profile.avatar.url) if request else profile.avatar.url
        return None


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