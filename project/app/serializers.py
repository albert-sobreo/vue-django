from rest_framework import serializers
from .models import *

class AuthorSZ(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

class ArticleSZ(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"