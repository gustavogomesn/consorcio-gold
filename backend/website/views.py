from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from datetime import date
from dateutil.relativedelta import relativedelta
from .models import Members, Loans, Meetings, TemporaryEntries, MeetingEntries
from .forms import UploadFileForm
import openpyxl
import json
import io

LOAN_FEE = 3/100
MULT_ALLOWED_LOAN = 3
STOCK_VALUE = 50
FUND_VALUE = 5

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
        meeting = Meetings(date = data['meeting-date'])
        meeting.save()
        return JsonResponse({'status': 'Meeting registered'})
    return JsonResponse({'status': 'Method not allowed'})

@csrf_exempt
def delete_meeting(request):
    if request.method == "POST":
        data = json.loads(request.body)
        meeting = Meetings.objects.filter(id=data['id'])
        meeting.delete()
        return JsonResponse({'status': 'Meeting deleted'})
    return JsonResponse({'status': 'Method not allowed'})

def show_meeting(request, meeting_id):
    temporary_entries = list(TemporaryEntries.objects.filter(meeting_id=meeting_id, type='stocks').values('id', 'member__name', 'value'))
    temporary_payments = list(TemporaryEntries.objects.select_related('member').filter(meeting_id=meeting_id, type='loan-payment').values('id', 'member__name', 'value'))
    loans = list(Loans.objects.filter(meeting_id=meeting_id).values())
    meeting_date = list(Meetings.objects.filter(id=meeting_id).values())[0]['date']
    return JsonResponse({'temporary_entries': temporary_entries,
                         'temporary_payments': temporary_payments,
                         'loans': loans,
                         'meeting_date': meeting_date})

def end_meeting(request, meeting_id):
    temporary_entries = TemporaryEntries.objects.filter(meeting_id=meeting_id).values()
    meeting_entries = [
        MeetingEntries(**entry)
    for entry in temporary_entries
    ]
    MeetingEntries.objects.bulk_create(meeting_entries)
    TemporaryEntries.objects.all().delete()
    meeting = Meetings.objects.get(id=meeting_id)
    meeting.finished = True
    meeting.save()
    # HANDLE LOAN PAYMENTS
    # HANDLE LOAN PAYMENTS
    # HANDLE LOAN PAYMENTS
    # HANDLE LOAN PAYMENTS
    return JsonResponse({'status': 'Meeting finished'})
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
def loan_payment_temporarily(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        print(data)
        meeting = Meetings.objects.get(id = data['meeting_id'])   
        loan = Loans.objects.get(id = data['loan_id'])
        loan_dict = Loans.objects.filter(id = data['loan_id']).values()[0]
        member = Members.objects.get(name = loan_dict['borrower'])
        loan = TemporaryEntries(meeting = meeting, loan = loan, member = member, type='loan-payment', value=data['payment'])
        loan.save()
        return JsonResponse({'status': 'Loan Deleted'})
    return JsonResponse({'status': 'Method not allowed'})

def contrib_model_download(request):
    wb = openpyxl.Workbook()
    ws = wb.active

    ws.append(["numero", "nome", "acoes"])
    members = list(Members.objects.order_by('number').values())
    for member in members:
        ws.append([member['number'], member['name'], ''])

    # Save the workbook to an in-memory buffer
    excel_file = io.BytesIO()
    wb.save(excel_file)
    excel_file.seek(0)

    response = HttpResponse(excel_file, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="aportes.xlsx"'

    return response

@csrf_exempt  
def new_contribs(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        print(data)
        # loan = Loans.objects.filter(id = data['loan-id'])
        # loan.remaining_value = loan.value - data.payment
        # loan.fee_by_month = loan.remaining_value * LOAN_FEE
        # loan.save()
        return JsonResponse({'status': 'Loan Deleted'})
    return JsonResponse({'status': 'Method not allowed'})

def handle_upload_contribs(file, meeting_id):
    try:
        wkb = openpyxl.load_workbook(file)
        sheet = wkb.active
        columns = sheet.max_column
        rows = sheet.max_row
        for r in range(1, rows):
            keys = ['number', 'name', 'value']
            contrib = {
                'number': 0,
                'name': '',
                'value': '',
                'type': 'stocks',
                'meeting_id': meeting_id
            }
            for c in range(1, columns+1):
                contrib[keys[c-1]] = sheet.cell(r+1, c).value
            contrib['member_id'] = list(Members.objects.filter(number=contrib['number']).values())[0]['id']
            del contrib['number'], contrib['name']
            temp = TemporaryEntries(**contrib)
            temp.save()
            
        sum_of_stocks = TemporaryEntries.objects.filter(type='stocks').aggregate(Sum('value'))
        print(sum_of_stocks)
        meeting_selected = Meetings.objects.get(Id=meeting_id)
        meeting_selected.stocks = sum_of_stocks
        meeting_selected.save(['stocks'])
        
        return JsonResponse({'status': 'Contribution uploaded successfully'})
            
    except:
        return JsonResponse({'status': 'This file isnt a spreadsheet'})
    
@csrf_exempt
def upload_contribs(request):
    if request.method == "POST":
        data = dict(request.POST.items())
        handle_upload_contribs(request.FILES["file"], data['meeting_id'])
        return JsonResponse({'status': 'File uploaded'})
    else:
        return JsonResponse({'status': 'Method isnt POST'})