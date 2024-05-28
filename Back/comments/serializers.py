from rest_framework.serializers import ModelSerializer

from .models import CommentProfile


class CommentSerializer(ModelSerializer):
    class Meta:
        model = CommentProfile
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['date'] = instance.date.strftime("%H:%M de %d/%m/%Y")
        return ret
