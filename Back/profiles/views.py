from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import SimplePeopleSerializer, PeoplesSerializer, SimplePetSerializer, PetSerializer
from .models import BaseProfile, PeopleModel, PetModel


class PeoplesView(ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = SimplePeopleSerializer
    permission_classes_by_action = {"list": [AllowAny], "retrieve": [AllowAny], "create": [IsAuthenticated]}

    def list(self, request, *args):
        """ Retorna uma lista de pessoas desaparecidas """
        query = PeopleModel.objects.all()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        """ Retorna o perfil selcionado """
        try:
            profile_id = kwargs['pk']
            query = PeopleModel.objects.get(pk=profile_id)
            serializer = PeoplesSerializer(query)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (ValueError, TypeError, BaseProfile.DoesNotExist):  # type:ignore
            return Response({"error": "Perfil não encontrado"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            picture = request.data.get('picture', "")
            name = request.data['name']
            man = bool(request.data['sex'])
            age = request.data['age']
            age_group = request.data['ageGroup']
            telephone = request.data.get('telephone', 'Sem contato')
            desc = request.data['desc']
            location = request.data['location']
            PeopleModel.objects.create(
                picture=picture, name=name, man=man, age=age, age_group=age_group,
                telephone=telephone, desc=desc, location=location
                )
            return Response({"msg": f"perfil de {name} criado!"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, TypeError):
            return Response({"error": "Formulario incorreto"}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action in self.permission_classes_by_action:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        return [permission() for permission in self.permission_classes]


class PetsView(ModelViewSet):
    http_method_names = ['get', 'post']
    serializer_class = SimplePetSerializer
    permission_classes_by_action = {"list": [AllowAny], "retrieve": [AllowAny], "create": [IsAuthenticated]}

    def list(self, request, *args, **kwargs):
        """ Retorna a lista de pets desaparecidos """
        query = PetModel.objects.all()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        """ Retorna o perfil selcionado """
        try:
            profile_id = kwargs['pk']
            query = PetModel.objects.get(pk=profile_id)
            serializer = PetSerializer(query)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (ValueError, TypeError, BaseProfile.DoesNotExist):  # type:ignore
            return Response({"error": "Perfil não encontrado"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            picture = request.data.get('picture', "")
            name = request.data['name']
            breed = request.data['breed']
            specie = request.data['specie']
            telephone = request.data.get('telephone', 'Sem contato')
            desc = request.data['desc']
            location = request.data['location']
            PetModel.objects.create(
                picture=picture, name=name, breed=breed, specie=specie, telephone=telephone, desc=desc,
                location=location
                )
            return Response({"msg": f"perfil de {name} criado!"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, TypeError):
            return Response({"error": "Formulario incorreto"}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action in self.permission_classes_by_action:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        return [permission() for permission in self.permission_classes]
