from django.contrib import admin
from .models import Topping

class ToppingAdmin(admin.ModelAdmin):
    list_display = ['value']

# Register your models here.

admin.site.register(Topping, ToppingAdmin)