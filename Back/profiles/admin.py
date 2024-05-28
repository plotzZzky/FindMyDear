from django.contrib import admin

from .models import BaseProfile, CommentProfile, PetModel

admin.site.register(BaseProfile)
admin.site.register(CommentProfile)
admin.site.register(PetModel)
