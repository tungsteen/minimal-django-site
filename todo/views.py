from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.forms import model_to_dict

from .models import Todo

def index(request):
    todo_list = Todo.objects.all()
    template = loader.get_template('todo/index.html')
    context = {'todo_list': todo_list}
    return HttpResponse(template.render(context, request))

def add_todo(request):
    postText = request.POST['text']
    isDone = request.POST['done'] == 'false'
    q = Todo(text=postText, done=isDone)
    q.save()
    return JsonResponse(model_to_dict(q))

def done(request, id):
    todo_entry = Todo.objects.get(id=id)
    todo_entry.done = not todo_entry.done
    todo_entry.save()
    return JsonResponse({'isDone': todo_entry.done})

def delete_todo(request, id):
    todo_entry = Todo.objects.get(id=id)
    todo_entry.delete()
    return HttpResponse('ok')
