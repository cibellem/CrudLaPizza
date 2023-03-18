from rest_framework import serializers
from .models import Topping

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('id', 'value')