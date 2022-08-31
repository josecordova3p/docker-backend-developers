FROM python:3.10.6-bullseye
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV FLASK_APP server.py
CMD ["flask", "run", "--host=0.0.0.0"]