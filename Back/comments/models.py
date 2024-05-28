from django.db import models
from django.contrib.auth.models import User

from profiles.models import BaseProfile


class CommentProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey(BaseProfile, on_delete=models.CASCADE, related_name='comments')
    desc = models.CharField(max_length=512)
    date = models.DateTimeField(auto_created=True, auto_now=True)

    objects = models.Manager()
