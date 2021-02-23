from django.contrib import admin
from .models import *

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'is_staff', 'is_active', 'is_superuser', 'is_authenticated')

# Register your models here.

admin.site.register(Author, AuthorAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(User, UserAdmin)
