from flask import Flask

app = Flask(__name__)

@app.get("/hello")
def hello():
    return "Hello from Docker - Python"