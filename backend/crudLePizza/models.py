import uuid
from django.db import models

# Create your models here.

class Topping(models.Model):
    value = models.CharField(
        primary_key=True,
        max_length=64
    )

class Pizza(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.TextField()
    toppings = models.ManyToManyField(Topping,related_name='+')

    def get_toppings(self):
        return "\n".join([p.toppings for p in self.topping.all()])






