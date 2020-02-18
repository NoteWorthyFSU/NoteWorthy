from flask import Flask, request, redirect
from flask_cors import CORS as cors
from response import Response

global test 
global username
global password 

app = Flask(__name__)

cors(app, resources={r"*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)

@app.route('/')
def index():
  return Response(200, {}).serialize()

@app.route('/testApi', methods=['GET'])
def user_count():
  res = 'This is a response from the API'
  return Response(200, res).serialize()

@app.route('/login', methods=['POST', 'GET'])
def login(): 
  global test
  global username
  global password 
  if request.method == 'POST': 
    document = request.form.to_dict()
    username = document['username']
    password = document['password']
    #emailEntered = document['fsuEmail'].lower()
    #passwordEntered = document['password']
    return redirect("http://localhost:5000/login")
     
  elif request.method == 'GET':
    var = "username: " + username + "|||||||" + "password: " + password 
    return Response(200, var).serialize()

    