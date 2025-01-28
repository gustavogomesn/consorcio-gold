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
    loans_paid = models.FloatField(default=0)
    fees = models.FloatField(default=0)
    fines = models.FloatField(default=0)
    fund = models.FloatField(default=0)
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
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='temporaryentries')
    loan = models.ForeignKey(Loans, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=50)
    value = models.FloatField()

class MeetingEntries(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='meetingentries')
    loan = models.ForeignKey(Loans, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=50)
    value = models.FloatField()
    
    
class Fine(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='fines')
    reason = models.CharField(max_length=100)
    value = models.FloatField()
    paid = models.BooleanField(default=False)
    
class FundMovement(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='fund', null=True, blank=True)
    reason = models.CharField(max_length=100, null=True, blank=True)
    value = models.FloatField()
    type = models.CharField(max_length=20)