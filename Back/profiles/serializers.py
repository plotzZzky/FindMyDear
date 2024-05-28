from rest_framework.serializers import ModelSerializer
from datetime import datetime

from .models import BaseProfile
from comments.serializers import CommentSerializer


class SimpleProfileSerializer(ModelSerializer):
    """ Serializer simplificado para pagina de buscas """
    class Meta:
        model = BaseProfile
        fields = ['id', 'name', 'picture', 'man', 'age']


class PetsSerializer(ModelSerializer):
    """ Serializa o perfil de um pet """
    comments = CommentSerializer(many=True, source='get_reverse_comments')

    class Meta:
        model = BaseProfile
        fields = '__all__'


class PeoplesSerializer(ModelSerializer):
    """ Serializa o perfil de uma pessoa """
    comments = CommentSerializer(many=True, source='get_reverse_comments')

    class Meta:
        model = BaseProfile
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        date = instance.age
        age = self.calculate_age(date)
        ret['age'] = date.strftime(f"%d/%m/%Y, {age} anos")
        return ret

    def calculate_age(self, birth_date):
        today = datetime.today()
        age = today.year - birth_date.year
        month_diff = today.month - birth_date.month
        if month_diff < 0 or (month_diff == 0 and today.day < birth_date.day):
            age -= 1
        return age
