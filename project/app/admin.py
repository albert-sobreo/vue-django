from django.contrib import admin
from .models import *

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')

# Register your models here.

admin.site.register(Author, AuthorAdmin)
admin.site.register(Article, ArticleAdmin)
