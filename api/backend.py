from flask import Flask, request, redirect, render_template
from flask_cors import CORS as cors
from flask_pymongo import PyMongo
from response import Response
from pymongo import MongoClient

global test 
global username
global password 

app = Flask(__name__)

cors(app, resources={r"*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)

uri = "mongodb://orlando:panama@backend-shard-00-00-7dz25.mongodb.net:27017,backend-shard-00-01-7dz25.mongodb.net:27017,backend-shard-00-02-7dz25.mongodb.net:27017/test?ssl=true&replicaSet=backend-shard-0&authSource=admin&retryWrites=true&w=majority"
client = MongoClient(uri)

# Init MongoDB Connection and run sample query to test authentication
app.config["MONGO_URI"] = uri
mongo = PyMongo(app)

@app.route('/html', methods=['GET', 'POST'])
def home():
  return render_template('filename.html')

@app.route('/')
def index():
  return Response(200, {}).serialize()

@app.route('/testApi', methods=['GET'])
def user_count():
  res = 'This is a response from the API'
  return Response(200, res).serialize()

@app.route('/testDB', methods=['GET'])
def test_db():

  mongo.db.users.insert_one({
    'first_name': "humbert",
    'second_name': "humbert"
  })

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
    mongo.db.users.insert_one({
      "username": username,
      "password": password 
    })
    #emailEntered = document['fsuEmail'].lower()
    #passwordEntered = document['password']
    return redirect("http://localhost:5000/login")
     
  elif request.method == 'GET':
    var = "username: " + username + "|||||||" + "password: " + password 
    return Response(200, var).serialize()

    