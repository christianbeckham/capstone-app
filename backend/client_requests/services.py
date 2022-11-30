from datetime import datetime
from operator import itemgetter
from django.core.mail import send_mail
import os


def email_user(data):
    type, description, created_date, status_text, response = itemgetter(
        'type', 'description', 'created_date', 'status_text', 'response')(data)
    user_email, full_name = itemgetter('email', 'full_name')(data['user'])

    if response is not None:
        formatted_date = formatDateString(created_date)
        subject = f'Request Update'
        message = f'Hello {full_name},'
        message += '\n\nThis is an update regarding the following request.'
        message += f'\n\n\tCreated Date: {formatted_date}'
        message += f'\n\tType: {type}'
        message += f'\n\tMessage: {description}'
        message += f'\n\nStatus: {status_text.capitalize()}'
        message += f'\nUpdate: {response}'
        message += f'\n\nThank you,'
        message += f'\nFitHub Team'
        email_from = os.environ.get("EMAIL_HOST_USER")
        email_to = [user_email, ]
        send_mail(subject, message, email_from, email_to, False)


def email_admin(data):
    type, description, created_date = itemgetter(
        'type', 'description', 'created_date')(data)
    full_name = itemgetter('full_name')(data['user'])

    if description is not None:
        formatted_date = formatDateString(created_date)
        subject = f'New request from {full_name}'
        message = f'Hello,'
        message += f'\n\nA new request has been submitted by {full_name}.'
        message += f'\n\n\tDate: {formatted_date}'
        message += f'\n\tType: {type}'
        message += f'\n\tMessage: {description}'
        email_from = os.environ.get("EMAIL_HOST_USER")
        email_to = [os.environ.get("EMAIL_ADMIN_USER"), ]
        send_mail(subject, message, email_from, email_to, False)


def formatDateString(date):
    date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%f%z")
    date = date.strftime('%x')
    return date
