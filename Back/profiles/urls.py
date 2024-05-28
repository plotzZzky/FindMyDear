from rest_framework import routers

from . import views

profiles_router = routers.DefaultRouter()
profiles_router.register(r'peoples', views.PeoplesView, basename='peoples')
profiles_router.register(r'pets', views.PetsView, basename='pets')
