from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.contrib.auth.models import User
from apis.models import Fridge, Recipe,ValidUser
from apis.serializers import UserSerializer,RecipeSerializer
from rest_framework.permissions import IsAuthenticated
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
                    fname,lname= person_name.split()
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addrecipe(request):
    reciepe = JSONParser().parse(request)
    data = json.dumps(reciepe,indent=4)
    print(data)
    username = request.user
    recipename = reciepe['recipe_name']
    ingredients = reciepe['ingredients']
    stringredients="//".join(ingredients)
    recipe_process = reciepe['recipe_process']
    strprocess = "//".join(recipe_process)
    vegetable = reciepe['vegetables']
    strvegetable = "//".join(vegetable)
    vurl=reciepe['video_link']
    
    create_recipe = Recipe(
        authorname=User.objects.get(username=username),
        itemname=recipename,
        ingredient=stringredients,
        process=strprocess,
        vegetables=strvegetable,
        videourl=vurl
    )
    create_recipe.save()
    context = {
        "success":"Recipe Added"
    }
    return Response(context,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_dashboard(request):
    username = request.user
    recipies = Recipe.objects.filter(authorname=username)
    results=[]
    for recipie in recipies:
        temp={}
        temp["id"]=str(recipie.id)
        temp["recipe_name"]=str(recipie.itemname)
        temp["recipe_process"]=str(recipie.process).split("//")
        temp["ingredient"]=str(recipie.ingredient).split("//")
        temp["vegetables"]=str(recipie.vegetables).split("//")
        if len(str(recipie.videourl))>0:
            temp["videourl"] = str(recipie.videourl)
        temp["votes"] = str(recipie.votes)
        results.append(temp)
    if(len(results)==0):
        return Response({"alert":"Seriously? Without adding any recipe you are checking recipies ?LOL😂"}, status=status.HTTP_200_OK)
    return Response(results, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recipe_delete(request,id):
    print(request.user)
    print(id)
    recipe = Recipe.objects.get(id=id)
    recipe.delete()
    username = request.user
    recipies = Recipe.objects.filter(authorname=username)
    results=[]
    for recipie in recipies:
        temp={}
        temp["id"]=str(recipie.id)
        temp["recipe_name"]=str(recipie.itemname)
        temp["recipe_process"]=str(recipie.process).split("//")
        temp["ingredient"]=str(recipie.ingredient).split("//")
        temp["vegetables"]=str(recipie.vegetables).split("//")
        if len(str(recipie.videourl))>0:
            temp["videourl"] = str(recipie.videourl)
        temp["votes"] = str(recipie.votes)
        results.append(temp)
    if(len(results)==0):
        return Response({"alert":"Seriously? Without adding any recipe you are checking recipies ?LOL😂"}, status=status.HTTP_200_OK)
    return Response(results, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getUsername(request,email):
    try:
        username = ValidUser.objects.get(email=email)
    except:
        return Response({"error":"User doesn't exists"},status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(username,many=False)
    return Response(serializer.data,content_type=None)
