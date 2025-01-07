from django.db import models

class Members(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    contact = models.CharField(max_length=50)
    stocks = models.IntegerField()

class Meetings(models.Model):
    date = models.DateField()
    stocks = models.IntegerField(default=0)
    loans_made = models.FloatField(default=0)
    fees = models.FloatField(default=0)
    fine = models.FloatField(default=0)
    finished = models.BooleanField(default=False)

class Loans(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE)
    borrower = models.CharField(max_length=100)
    value = models.FloatField()
    remaining_value = models.FloatField()
    fee_by_month = models.FloatField()
    due_month = models.CharField(max_length=25)
    date = models.DateField()
    isActive = models.BooleanField(default=True)


class TemporaryEntries(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE)
    loan = models.ForeignKey(Loans, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    value = models.FloatField()

class MeetingEntries(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE)
    loan = models.ForeignKey(Loans, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    value = models.FloatField()