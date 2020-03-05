from flask import Flask, request, redirect, render_template
from flask_cors import CORS as cors
from flask_pymongo import PyMongo
import bcrypt
from response import Response
from pymongo import MongoClient

global test 
global username
global password 

app = Flask(__name__)

cors(app, resources={r"*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)

uri = "mongodb://app:noteworthy@backend-shard-00-00-7dz25.mongodb.net:27017,backend-shard-00-01-7dz25.mongodb.net:27017,backend-shard-00-02-7dz25.mongodb.net:27017/test?ssl=true&replicaSet=backend-shard-0&authSource=admin&retryWrites=true&w=majority"
client = MongoClient(uri)
#?ssl=true&ssl_cert_reqs=CERT_NONE 
app.secret_key = 'mysecret' 

# Init MongoDB Connection and run sample query to test authentication
app.config["MONGO_URI"] = uri
mongo = PyMongo(app)

@app.route('/register', methods=['GET', 'POST'])
def home():
  if request.method == 'GET':   
    return render_template('register.html')
  if request.method == 'POST':
    document = request.form.to_dict()
    firstName = document['firstname']
    lastName = document['lastname']
    email = document['email']
    rawPassword = document['password'].encode('utf-8')
    
    hashedPassword = bcrypt.hashpw(rawPassword, bcrypt.gensalt())
    user = mongo.db.users.find_one({'email': email})

    if user is not None:
      return "User already exists."
    else:
      mongo.db.users.insert_one({
        'firstName': firstName,
        'lastName': lastName,
        'password': hashedPassword,
        'email': email
      })
      verifiedUser = mongo.db.users.find_one({'email': email})

      if verifiedUser is None:
        return "The API reported an error"
      else:
        return ("Welcome " +  verifiedUser['firstName'] )

      #redirect("http://localhost:5000/postRegister")

@app.route('/postRegister')
def postReg():
  return("post register")

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

@app.route('/registration', methods=['POST', 'GET'])
def registration(): 
   return render_template('registration.html')
  
@app.route('/login', methods=['POST', 'GET'])
def loginPage(): 
  if request.method == 'GET':
    return render_template('login.html')
  if request.method == 'POST':
    document = request.form.to_dict()
    email = document['email'].lower()
    password = document['password']

    user = mongo.db.users.find_one({'email': email})
    if user is None:
      return "the user doesn't exist"
    correctPassword = bcrypt.checkpw(password.encode('utf8'), user['password'])
    if correctPassword == True:
      return "Welcome " + user['firstName']
    else:
      return "invalid password" 

    