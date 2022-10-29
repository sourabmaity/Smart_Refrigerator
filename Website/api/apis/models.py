from djongo import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
class ValidUser(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    username = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=255)
    def __str__(self):
        return str(self.username)

class Fridge(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    username = models.OneToOneField(User,on_delete=models.CASCADE)
    onion = models.BooleanField(default=False)
    potato = models.BooleanField(default=False)
    tomato = models.BooleanField(default=False)
    brinjal = models.BooleanField(default=False)
    pointed_gourd = models.BooleanField(default=False)
    capsicum = models.BooleanField(default=False)
    ladys_finger = models.BooleanField(default=False)
    carrot = models.BooleanField(default=False)
    bitter_gourd = models.BooleanField(default=False)
    cauliflower = models.BooleanField(default=False)
    spong_gourd = models.BooleanField(default=False)
    taro_root = models.BooleanField(default=False)
    green_beans = models.BooleanField(default=False)
    chilly = models.BooleanField(default=False)
    garlic = models.BooleanField(default=False)
    ginger = models.BooleanField(default=False)
    lemon = models.BooleanField(default=False)
    green_peas = models.BooleanField(default=False)
    def __str__(self):
        return str(self.username)

class Recipe(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    authorname = models.ForeignKey(User,on_delete=models.CASCADE)
    itemname = models.CharField(max_length=255)
    ingredient = models.TextField(default=None)
    process = models.TextField(default=None)
    vegetables = models.TextField(default=None)
    videourl = models.URLField(default=None)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return str(self.itemname)+" ("+str(self.authorname)+")"
    