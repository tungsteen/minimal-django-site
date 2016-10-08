from __future__ import unicode_literals

from django.db import models

class Todo(models.Model):
    text = models.CharField(max_length=250)
    done = models.BooleanField()

    def full(self):
        return '{0} is {1}done'.format(self.text, '' if self.done else 'not ')
