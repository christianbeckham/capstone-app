from datetime import datetime
from operator import itemgetter
from django.core.mail import send_mail
import os


def email_user(data):
    weight, weekly_review, created_date, trainer_feedback = itemgetter(
        'weight', 'weekly_review', 'created_date', 'trainer_feedback')(data)
    user_email, full_name = itemgetter('email', 'full_name')(data['user'])

    if trainer_feedback is not None:
        formatted_date = formatDateString(created_date)
        subject = f'Check-In Feedback'
        message = f'Hello {full_name},'
        message += '\n\nYour trainer has provided feedback to the following check-in.'
        message += f'\n\nCheck-In Details'
        message += f'\n\tDate: {formatted_date}'
        message += f'\n\tWeight: {weight}'
        message += f'\n\tWeekly Review: {weekly_review}'
        message += f'\n\nFeedback: {trainer_feedback}'
        message += f'\n\nThank you,'
        message += f'\nFitHub Team'
        email_from = os.environ.get("EMAIL_HOST_USER")
        email_to = [user_email, ]
        send_mail(subject, message, email_from, email_to, False)


def email_admin(data):
    weight, weekly_review, created_date, images = itemgetter(
        'weight', 'weekly_review', 'created_date', 'images')(data)
    full_name = itemgetter('full_name')(data['user'])

    formatted_date = formatDateString(created_date)
    subject = f'New check-in from {full_name}'
    message = f'Hello,'
    message += f'\n\nA new check-in has been submitted by {full_name}.'
    message += f'\n\n\tDate: {formatted_date}'
    message += f'\n\tWeight: {weight}'
    message += f'\n\tWeekly Review: {weekly_review}'
    message += f'\n\tImages: {len(images)}'
    email_from = os.environ.get("EMAIL_HOST_USER")
    email_to = [os.environ.get("EMAIL_ADMIN_USER"), ]
    send_mail(subject, message, email_from, email_to, False)


def formatDateString(date):
    date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%f%z")
    date = date.strftime('%x')
    return date
