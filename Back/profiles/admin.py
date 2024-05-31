from django.contrib import admin

from .models import PeopleModel, PetModel

admin.site.register(PeopleModel)
admin.site.register(PetModel)
