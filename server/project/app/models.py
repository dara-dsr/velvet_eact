from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)


class Tour(models.Model):
    SEASONS = [
        ("Весна", "Весна"),
        ("Лето", "Лето"),
        ("Осень", "Осень"),
        ("Зима", "Зима"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    city = models.CharField(max_length=100)
    season = models.CharField(max_length=50, choices=SEASONS)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="tours/")
    program = models.TextField(blank=True)
    included = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    STATUS_CHOICES = [
        ("Новая", "Новая"),
        ("В обработке", "В обработке"),
        ("Подтверждена", "Подтверждена"),
        ("Отклонена", "Отклонена"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    tour = models.ForeignKey(Tour, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    comment = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Новая")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.status}"


class Review(models.Model):
    STATUS_CHOICES = [
        ("На модерации", "На модерации"),
        ("Опубликован", "Опубликован"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="На модерации")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'tour')

    def __str__(self):
        return f"Review by {self.user.username} on {self.tour.title}"
