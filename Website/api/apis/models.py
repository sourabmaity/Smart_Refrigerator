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
    carrot = models.BooleanField(default=False)
    onion = models.BooleanField(default=False)
    potato = models.BooleanField(default=False)
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
    