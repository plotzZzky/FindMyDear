from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError

from .validate import validate_user, validate_password
from .token import create_new_token
from .models import Recovery
from .serializer import UserSerializer


class RegisterView(ModelViewSet):
    http_method_names = ['post']
    serializer_class = UserSerializer
    queryset = []

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            pwd = request.data['pwd']
            username = request.data['username']
            email = request.data['email']
            question = request.data['question']
            answer = request.data['answer']

            if validate_user(password, pwd, username, email):
                user = User.objects.create(username=username, email=email)
                user.set_password(password)
                user.save()
                authenticate(username=username, password=password)
                token = create_new_token(user)
                answer_hashed = make_password(answer)  # salva a respota ja protegida por hash
                Recovery.objects.create(user=user, question=question, answer=answer_hashed)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            else:
                raise ValueError()
        except (AttributeError, KeyError, ValueError):
            return Response({"msg": "Informações incorretas!"}, status=status.HTTP_401_UNAUTHORIZED)
        except IntegrityError as error:
            if 'auth_user_username_key' in str(error):
                field = 'Nome de usuario'
            else:
                field = 'O e-mail'
            msg = f"{field} já existe e não pode ser cadastrado!"
            return Response({"msg": msg}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ModelViewSet):
    http_method_names = ['post']
    serializer_class = UserSerializer
    queryset = []

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            username = request.data['username']

            user = authenticate(username=username, password=password)
            if user:
                token = create_new_token(user)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Login incorreto!"}, status=status.HTTP_401_UNAUTHORIZED)
        except (KeyError, ValueError):
            return Response({"error": "Login incorreto"}, status=status.HTTP_400_BAD_REQUEST)


class RecoveryPassword(ModelViewSet):
    http_method_names = ['post']
    queryset = []
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        try:
            username = request.data['username']
            answer = request.data['answer']
            password = request.data['password']
            pwd = request.data['pwd']
            user = User.objects.get(username=username)
            if check_password(answer, user.recovery.answer):
                if validate_password(password, pwd):
                    user.set_password(password)
                    user.save()
                    return Response({"msg": "Senha atualizada!"}, status=200)
                else:
                    msg = "As senhas precisam ser iguais, no minimo uma letra, numero e 8 digitos!"
                    return Response({"erro": msg}, status=500)
            else:
                raise ValueError()
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"error": "Resposta incorreta!"}, status=500)


class ReceiverYourQuestion(ModelViewSet):
    # Envia a question do usuario para o front para fazer a recuperação de senha
    http_method_names = ['post']
    serializer_class = UserSerializer
    queryset = []

    def create(self, request, *args, **kwargs):
        try:
            username = request.data['username']
            user = User.objects.get(username=username)
            question = user.recovery.question
            return Response({"question": question}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"error": "Usuario não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
