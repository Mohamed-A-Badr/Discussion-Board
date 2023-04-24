from django.contrib import admin
from .models import Board, Topic, Post


# Register your models here.
class TopicInline(admin.TabularInline):
    model = Topic
    extra = 0


class PostInline(admin.TabularInline):
    model = Post
    extra = 0


class BoardAdmin(admin.ModelAdmin):
    inlines = (TopicInline,)


class TopicAdmin(admin.ModelAdmin):
    inlines = (PostInline,)


admin.site.register(Board, BoardAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Post)
