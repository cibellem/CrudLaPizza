from django.db import models

# Create your models here.

class Topping(models.Model):
    value = models.TextField()

    def _str_(self):
        return self.value


class Pizza(models.Model):
    name = models.TextField()
    toppings = models.ManyToManyField(Topping)

    def get_toppings(self):
        return "\n".join([p.toppings for p in self.topping.all()])






