from django.contrib import admin
from apis.models import Fridge, Recipe, ValidUser

# Register your models here.
admin.site.register(ValidUser)
admin.site.register(Fridge)
admin.site.register(Recipe)