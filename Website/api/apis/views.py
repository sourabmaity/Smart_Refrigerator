from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.contrib.auth.models import User
from apis.models import Fridge, Recipe,ValidUser
from apis.serializers import UserSerializer
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getData(request):
    home = {'API':'Smart Refrigerator With Smart Cooking Techniques'}
    return Response(home)

@api_view(['POST'])
def register(request):
    person_data = JSONParser().parse(request)
    # print(person_data)
    person_name = person_data["name"]
    person_username = person_data["username"]
    person_email = person_data["email"]
    person_fpassword = person_data["fpassword"]
    person_spassword = person_data["spassword"]
    if(person_fpassword==person_spassword):
        try:
            user = User.objects.get(username=person_username)
            return Response({'error':'This username already exists','data':person_username},status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=person_email)
                return Response({'error':'This email already exists','data':person_email},status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                fname = None
                lname = None
                try:
                    fname= person_name.split()[0]
                    lname = person_name.split()[1]
                except:
                    fname = person_name
                newuser = User.objects.create_user(
                    first_name = fname,
                    last_name = lname,  
                    username = person_username,
                    email = person_email,
                    password = person_fpassword
                )
                ValidUser.objects.create(
                    username = newuser,
                    name = person_name,
                    email = person_email
                )
                Fridge.objects.create(
                    username = newuser
                )
                
                return Response({'success':'User Created','person_data':person_data},status=status.HTTP_200_OK)
    else:
        return Response({'error':'Password not matched'},status=status.HTTP_400_BAD_REQUEST)

def addRecipe(recipename,ingredients,process):
    stringredients = "//".join(ingredients)
    strprocess = "//".join(process)
    recipe = Recipe.objects.filter(itemname=recipename)
    if(recipe.count()==0):
        create_recipe = Recipe(
            itemname=str(recipename).lower(),
            ingredient=stringredients,
            process = strprocess
        )
        create_recipe.save()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST,content_type='application/json')
    return Response(status=status.HTTP_200_OK,content_type='application/json')

@api_view(['POST'])
def addrecipe(request):
    print(request.user)
    reciepe = JSONParser().parse(request)
    print(reciepe)
    getresponse = addRecipe(reciepe["recipename"],reciepe["indgredients"],reciepe["process"])
    if(getresponse.status_code!=200):
        return Response({"error":"Recipe name alredy exist"},status=status.HTTP_400_BAD_REQUEST)
    context = {
        "success":"Recipe Added"
    }
    return Response(context,status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getUsername(request,email):
    try:
        username = ValidUser.objects.get(email=email)
    except:
        return Response({"error":"User doesn't exists"},status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(username,many=False)
    return Response(serializer.data,content_type=None)