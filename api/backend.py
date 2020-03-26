from flask import Flask, request, redirect, render_template, session
from flask_cors import CORS as cors
from flask_pymongo import PyMongo
import bcrypt
from response import Response
from pymongo import MongoClient


isInvalid = False
isDuplicate = False
isLoggedIn = False

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
  global isInvalid
  global isDuplicate

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
      isInvalid = False
      isDuplicate = True
      return "User already exists."
    else:
      isInvalid = False
      isDuplicate = False

      mongo.db.users.insert_one({
        'firstName': firstName,
        'lastName': lastName,
        'password': hashedPassword,
        'email': email
      })
      verifiedUser = mongo.db.users.find_one({'email': email})

      # Flagged for deletion
      if verifiedUser is None:
        return "The API reported an error"
      else:
        isLoggedIn = True
        session['username'] = str(verifiedUser['_id'])
        return redirect("http://localhost5000/dashboard")



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

  global isInvalid
  global isDuplicate
  if request.method == 'GET':
    return render_template('login.html')
  if request.method == 'POST':
    document = request.form.to_dict()
    email = document['email'].lower()
    password = document['password']

    user = mongo.db.users.find_one({'email': email})
    if user is None:
      isInvalid = True
      isDuplicate = False
      return "Invalid Credentials"
    correctPassword = bcrypt.checkpw(password.encode('utf8'), user['password'])
    if correctPassword == True:
      isInvalid = False
      isDuplicate = False

      session['username'] = str(user['_id'])
      isLoggedIn = True
      return redirect("http://localhost:3000/dashboard")
    else:
      isInvalid = True
      isDuplicate = False
      return "Invalid Credentials"

@app.route('/status', methods=['GET'])
def status():
  global isInvalid
  global isDuplicate

  if(isInvalid == False and isDuplicate == False) :
    isInvalid = False
    isDuplicate = False
    return "successful"
  elif(isInvalid == False and isDuplicate == True) :
    isInvalid = False
    isDuplicate = False
    return "duplicate"
  elif(isInvalid == True and isDuplicate == False) :
    isInvalid = False
    isDuplicate = False
    return "invalid"



  return("isInvalid" + str(isInvalid) + '\n' + "isDuplicate" + str(isDuplicate))



@app.route('/logout', methods=['POST'])
def logout():
  global isLoggedIn

  # FIX THIS (ERROR CHECKING)
  if(request.method == 'POST') :
    session.pop('username')

    if('username' in session) :
      return "There was an error logging out"

    isLoggedIn = False
    return redirect("http://localhost:3000/")


@app.route('/isLoggedIn', methods=['GET'])
def isLoggedIn() :

  if('username' in session) :
    return str(True)
  else :
    return str(False)
