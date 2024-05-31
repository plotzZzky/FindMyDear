from django.db import models
import os
import uuid


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profiles/', filename)


class BaseProfile(models.Model):
    picture = models.ImageField(upload_to=get_file_path)
    name = models.CharField(max_length=255)
    telephone = models.CharField(max_length=255)
    desc = models.CharField(max_length=512)
    location = models.CharField(max_length=512)

    objects = models.Manager()

    def get_reverse_comments(self):
        return self.comments.order_by('-id')


class PetModel(BaseProfile):
    breed = models.CharField(max_length=128)
    specie = models.CharField(max_length=128, null=True, blank=True)


class PeopleModel(BaseProfile):
    man = models.BooleanField(default=True)
    age = models.DateField()
    age_group = models.CharField()
