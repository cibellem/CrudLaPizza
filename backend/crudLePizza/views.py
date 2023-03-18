from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToppingSerializer
from .models import Topping

#Topping View
class ToppingView(viewsets.ModelViewSet):
    serializer_class = ToppingSerializer
    queryset = Topping.objects.all()