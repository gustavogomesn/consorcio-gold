from django.http import JsonResponse
from .models import Members, Loans, Meetings, TemporaryEntries
from .forms import UploadFileForm
from django.views.decorators.csrf import csrf_exempt
import openpyxl
import openpyxl.workbook
from datetime import date
from dateutil.relativedelta import relativedelta

LOAN_FEE = 3/100
MULT_ALLOWED_LOAN = 3
STOCK_VALUE = 50

def index(request):
    print('Server running')
    return JsonResponse({'Status': 'Server running'})

def get_meetings(request):
    meetings = list(Meetings.objects.order_by('id').values())
    return JsonResponse({'meetings': meetings})

@csrf_exempt
def new_meeting(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        print(data)
        meeting = Meetings(date = data['meeting-date'])
        meeting.save()
        return JsonResponse({'status': 'meeting registered'})
    return JsonResponse({'status': 'Method not allowed'})

def get_members(request):
    members = list(Members.objects.order_by('number').values())
    return JsonResponse({'members': members})

def handle_upload_members(file):
    try:
        wkb = openpyxl.load_workbook(file)
        sheet = wkb.active
        columns = sheet.max_column
        rows = sheet.max_row
        
        for r in range(1, rows):
            keys = ['number', 'name', 'role', 'contact', 'stocks']
            member = {
                'number': 0,
                'name': '',
                'role': '',
                'contact': '',
                'stocks': 0
            }
            for c in range(1, 6):
                member[keys[c-1]] = sheet.cell(r+1, c).value
            m = Members(**member)
            m.save()
    except:
        return JsonResponse({'status': 'This file isnt a spreadsheet'})
    
@csrf_exempt
def upload_members(request):
    if request.method == "POST":
        # i dont need this, after this will be removed i guess
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_upload_members(request.FILES["file"])
            return JsonResponse({'status': 'File uploaded'})
    else:
        return JsonResponse({'status': 'Method isnt POST'})
    return JsonResponse({'status': 'Form invalid'})

@csrf_exempt
def new_loan(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        data['meeting'] = Meetings.objects.get(id=data['meeting_id'])   
        data['member'] = Members.objects.get(id = data['member_id'])
        data['value'] = data['loan-value']
        data['remaining_value'] = data['loan-value']
        data['fee_by_month'] = round(float(data['loan-value'])*LOAN_FEE, 2)
        del data['loan-value']
        data['due_month'] = (date.today() + relativedelta(months=+6)).strftime('%m-%Y')
        data['date'] = date.today()
        loan = Loans(**data)
        loan.save()
        return JsonResponse({'status': 'Loan registered'})

@csrf_exempt  
def delete_loan(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        loan = Loans.objects.filter(id = data['loan_id'])
        loan.delete()
        return JsonResponse({'status': 'Loan Deleted'})
    return JsonResponse({'status': 'Method not allowed'})

def get_loans(request):
    loans = list(Loans.objects.values())
    return JsonResponse({'loans': loans})

@csrf_exempt  
def loan_payment(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        print(data)
        # loan = Loans.objects.filter(id = data['loan-id'])
        # loan.remaining_value = loan.value - data.payment
        # loan.fee_by_month = loan.remaining_value * LOAN_FEE
        # loan.save()
        return JsonResponse({'status': 'Loan Deleted'})
    return JsonResponse({'status': 'Method not allowed'})

@csrf_exempt  
def loan_payment_temporarily(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        
        meeting = Meetings.objects.get(id = data['meeting_id'])   
        loan = Loans.objects.get(id = data['loan_id'])
        loan_dict = Loans.objects.filter(id = data['loan_id']).values()[0]
        member = Members.objects.get(name = loan_dict['borrower'])
        print(meeting)
        loan = TemporaryEntries(meeting = meeting, loan = loan, member = member, type='loan-payment', value=data['payment'])
        loan.save()
        return JsonResponse({'status': 'Loan Deleted'})
    return JsonResponse({'status': 'Method not allowed'})