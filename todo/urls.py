from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^todo/$', views.add_todo),
    url(r'^todo/done/(?P<id>[0-9]+)$', views.done),
]
