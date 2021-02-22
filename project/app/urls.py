from os import name
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"author", views.AuthorAPI, 'author')
router.register(r"article", views.ArticleAPI, 'article')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.home, name='home'),
    path('index1/', views.index1, name='index1')
]