from rest_framework import serializers
from .models import Topping, Pizza
from .function import attempt_json_deserialize

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ['value']


class PizzaSerializer(serializers.ModelSerializer):
    toppings = ToppingSerializer(read_only=True, many=True)
    class Meta:
        model = Pizza
        fields = ('id', 'name', 'toppings')

    def create(self, validated_data):
        request = self.context['request']

        toppings_data = request.data.get('toppings')
        toppings_data = attempt_json_deserialize(toppings_data, expect_type=list)
        validated_data['toppings'] = toppings_data

        instance = super().create(validated_data)

        return instance