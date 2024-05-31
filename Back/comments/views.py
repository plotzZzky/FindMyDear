from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

from .serializers import CommentSerializer
from .models import CommentProfile
from profiles.models import BaseProfile


class CommentView(ModelViewSet):
    http_method_names = ['post', 'delete']
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    permission_classes_by_action = {"list": [AllowAny], "retrieve": [AllowAny], "create": [IsAuthenticated]}

    def create(self, request, *args, **kwargs):
        """ Cria um novo comentario em um perfil """
        try:
            user = request.user
            profile_id = request.data['profileId']  # id do perfil que vai receber o comenatario
            desc = request.data['comment']

            profile = BaseProfile.objects.get(pk=profile_id)
            CommentProfile.objects.create(user=user, profile=profile, desc=desc)
            serializer = self.get_serializer(profile.comments, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except (TypeError, KeyError, BaseProfile.DoesNotExist):  # type:ignore
            return Response({"error": "Não foi possivel criar o comentario"}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """ Apaga um comentario """
        try:
            comment_id = kwargs['pk']

            comment = CommentProfile.objects.get(pk=comment_id, user=request.user)
            comment.delete()
            serializer = self.get_serializer(comment.profile.comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (ValueError, CommentProfile.DoesNotExist):  # type:ignore
            return Response(
                {"error": "Não foi possivel deletar esse comentario"}, status=status.HTTP_400_BAD_REQUEST
            )
