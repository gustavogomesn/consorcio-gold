from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='home'),
    path('upload-members/', views.upload_members, name='upload-members'),
    path('get-meetings/', views.get_meetings, name='get-meetings'),
    path('new-meeting/', views.new_meeting, name='new-meeting'),
    path('delete-meeting/', views.delete_meeting, name='delete-meeting'),
    path('get-members/', views.get_members, name='get-members'),
    path('get-loans/', views.get_loans, name='get-loans'),
    path('new-loan/', views.new_loan, name='new-loan'),
    path('delete-loan/', views.delete_loan, name='delete-loan'),
    path('loan-payment/', views.loan_payment, name='loan-payment'),
    path('loan-payment-temporarily/', views.loan_payment_temporarily, name='loan-payment-temporarily'),
    path('contrib-model-download/', views.contrib_model_download, name='contrib-model-download'),
    path('upload-contribs/', views.upload_contribs, name='upload-contribs'),
]
