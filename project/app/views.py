from django.contrib.auth.forms import UserModel
from django.db.models.sql import query
from django.http.response import HttpResponse
from django.shortcuts import redirect, render, HttpResponse
from rest_framework import viewsets
from .serializers import *
from .models import *
from .forms import *
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache

#Create your APIs here.
class AuthorAPI(viewsets.ModelViewSet):
    serializer_class = AuthorSZ
    queryset = Author.objects.all()

class ArticleAPI(viewsets.ModelViewSet):
    serializer_class = ArticleSZ
    queryset = Article.objects.all()

class UserAPI(viewsets.ModelViewSet):
    serializer_class = UserSZ
    queryset = User.objects.all()

# Create your views here.
@login_required
def home(request):
    return render(request, 'index.html', {})

@login_required
def index1(request):
    return render(request, "index1.html")

@never_cache
def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        userModel = User.objects.get(username=username)
        if user is not None:
            auth_login(request, user)
            if user.position == 'BOSS':
                return redirect('/')
            else:
                return redirect('/index1/')

        else:
            return HttpResponse('login failed')

    return render(request, 'login.html')

def logoutView(request):
    logout(request)
    return redirect('/')

def registerView(request):
    form = RegisterForm(request.POST or None, request.FILES or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            messages.success(request, "Account created successfully")
            return redirect('registerView')
    
    return render(request, 'register.html', {'form': form})

