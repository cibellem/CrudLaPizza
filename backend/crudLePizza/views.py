from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToppingSerializer, PizzaSerializer
from .models import Topping, Pizza

#Topping View
class ToppingView(viewsets.ModelViewSet):
    serializer_class = ToppingSerializer
    queryset = Topping.objects.all()

#Pizza View
class PizzaView(viewsets.ModelViewSet):
    serializer_class = PizzaSerializer
    queryset = Pizza.objects.all()