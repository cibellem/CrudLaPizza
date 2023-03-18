from django.db import models

# Create your models here.

class Topping(models.Model):
    value = models.TextField()

    def _str_(self):
        return self.value


