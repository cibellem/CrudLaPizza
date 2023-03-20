from django.contrib import admin
from .models import Topping, Pizza

class ToppingAdmin(admin.ModelAdmin):
    list_display = ['value']

class PizzaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'get_toppings')

admin.site.register(Topping, ToppingAdmin)
admin.site.register(Pizza, PizzaAdmin)