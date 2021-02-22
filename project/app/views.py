from django.db.models.sql import query
from django.http.response import HttpResponse
from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .serializers import *
from .models import *

#Create your APIs here.
class AuthorAPI(viewsets.ModelViewSet):
    serializer_class = AuthorSZ
    queryset = Author.objects.all()

class ArticleAPI(viewsets.ModelViewSet):
    serializer_class = ArticleSZ
    queryset = Article.objects.all()

# Create your views here.
def home(request):
    return render(request, 'index.html', {})

def index1(request):
    return render(request, "index1.html")

