from os import name
from django.urls import path, include
from . import views
from rest_framework import routers
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r"author", views.AuthorAPI, 'author')
router.register(r"article", views.ArticleAPI, 'article')
router.register(r"user", views.UserAPI, 'user')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.home, name='home'),
    path('index1/', views.index1, name='index1'),
    path('register/', views.registerView, name='registerView'),
    path('login/', views.login, name="login"),
    path('logout/', views.logoutView, name='logout')
]