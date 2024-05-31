from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import CommentSerializer
from .models import CommentProfile
from profiles.models import BaseProfile


class CommentView(ModelViewSet):
    http_method_names = ['get', 'post', 'delete']
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = CommentProfile.objects.all()

    def list(self, request, *args, **kwargs):
        """ Desativado por não ser necessario """
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, *args, **kwargs):
        profile_id = kwargs['pk']
        profile = BaseProfile.objects.get(pk=profile_id).order_by('-id')
        serializer = self.get_serializer(profile, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """ Cria um novo comentario em um perfil """
        user = request.user
        profile_id = request.data['profileId']  # id do perfil que vai receber o comenatario
        desc = request.data['comment']

        profile = BaseProfile.objects.get(pk=profile_id)
        CommentProfile.objects.create(user=user, profile=profile, desc=desc)
        serializer = self.get_serializer(profile.comments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """ Apaga um comentario """
        try:
            comment_id = kwargs['pk']

            comment = CommentProfile.objects.get(pk=comment_id, user=request.user)
            comment.delete()
            serializer = self.get_serializer(comment.profile.comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CommentProfile.DoesNotExist:  # type:ignore
            return Response(
                {"error": "Não foi possivel deletar esse comentario"}, status=status.HTTP_400_BAD_REQUEST
            )
