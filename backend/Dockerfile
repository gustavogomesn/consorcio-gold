FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apk add weasyprint font-terminus

COPY . .

EXPOSE 4000

CMD [ "sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:4000" ]
