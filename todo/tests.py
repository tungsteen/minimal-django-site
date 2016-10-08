from django.test import TestCase

from .models import Todo

class TodoModelTests(TestCase):
    
    def setUp(self):
        Todo.objects.create(text="First Todo", done=False)
        Todo.objects.create(text="Second Todo", done=True)

    def test_full_todo(self):
        todo1 = Todo.objects.get(text="First Todo")
        todo2 = Todo.objects.get(text="Second Todo")
        self.assertEqual(todo1.full(), "First Todo is not done")
        self.assertEqual(todo2.full(), "Second Todo is done")
