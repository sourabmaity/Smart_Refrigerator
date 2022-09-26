from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from apis.models import Recipe
# from apis.models import ValidUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
