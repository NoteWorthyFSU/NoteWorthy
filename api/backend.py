from flask import Flask, request, redirect, render_template, session
from flask_cors import CORS as cors
from flask_pymongo import PyMongo
import bcrypt
from response import Response
from pymongo import MongoClient
from time import gmtime, strftime


today = strftime("%Y-%m-%d %H:%M:%S", gmtime())

loggedFirstName = ""
loggedLastName = ""
loggedEmail = ""
loggedPass = ""
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

@app.route('/invalidCredentials')
def invalidCredentials():
  global isInvalid
  if isInvalid is True:
    isInvalid = False
    return Response(200, True).serialize()
  return Response(200, False).serialize()

@app.route('/duplicate')
def duplicate():
  global isDuplicate
  if isDuplicate is True:
    isDuplicate = False
    return Response(200, True).serialize()
  return Response(200, False).serialize()



@app.route('/register', methods=['GET', 'POST'])
def home():
  global isInvalid
  global isDuplicate
  global loggedFirstName
  global loggedLastName
  global loggedEmail
  global loggedPass
  global isLoggedIn

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
      return redirect("http://localhost:3000/login")
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
        loggedFirstName = verifiedUser['firstName']
        loggedLastName = verifiedUser['lastName']
        loggedEmail = verifiedUser['email']
        session['username'] = str(verifiedUser['_id'])
        return redirect("http://localhost:3000/dashboard")

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
  global loggedFirstName
  global loggedLastName
  global loggedEmail
  global isLoggedIn

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
      return redirect("http://localhost:3000/login")
    correctPassword = bcrypt.checkpw(password.encode('utf-8'), user['password'])
    if correctPassword == True:
      isInvalid = False
      isDuplicate = False
      loggedFirstName = user['firstName']
      loggedLastName = user['lastName']
      loggedEmail = user['email']
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



@app.route('/logout', methods=['GET'])
def logout():
  global isLoggedIn
  session.pop('username')
  if('username' in session) :
    return "There was an error logging out"
  isLoggedIn = False
  return redirect("http://localhost:3000/")


@app.route('/isLoggedIn', methods=['GET'])
def isLogged() :
  if('username' in session) :
    return Response(200, True).serialize()
  else :
    return Response(200, False).serialize()


@app.route('/changeInfo', methods=['POST', 'GET'])
def changeInfo() :
  global loggedFirstName
  global loggedLastName
  global loggedEmail
  global isLoggedIn

  if request.method == 'GET':
    string = loggedFirstName + " " + loggedLastName + " " + loggedEmail
    return Response(200, {string}).serialize()
  if request.method == 'POST':
    document = request.form.to_dict()
    
    if document['upPass'] == "":
      mongo.db.users.find_one_and_update({'email': loggedEmail}, {'$set': {'firstName': document['upFirst'], 'lastName': document['upLast'], 'email': document['upEmail']}})
      loggedFirstName = document['upFirst']
      loggedLastName = document['upLast']
      loggedEmail = document['upEmail']
      return redirect("http://localhost:3000/updateprofile")
    hashedPassword = bcrypt.hashpw(document['upPass'].encode("utf-8"), bcrypt.gensalt())
    mongo.db.users.find_one_and_update({'email': loggedEmail}, {'$set': {'firstName': document['upFirst'], 'lastName': document['upLast'], 'email': document['upEmail'], 'password': hashedPassword}})
    user = mongo.db.users.find_one({'email': document['upEmail']})

    loggedFirstName = user['firstName']
    loggedLastName = user['lastName']
    loggedEmail = user['email']
    return redirect("http://localhost:3000/updateprofile")

@app.route('/saveNotes', methods=['POST'])
def saveNotes() :
  global today
  global loggedEmail
  
  #example of how the data is recieved
  # NOTES FROM THE PREVIOUS PAGE 
  # Topic1
  #   - content1
  #   - content2
  # Topic2
  #   -content3
  #   -content4
  #
  # FORM SENDS THE FOLLOWING TO THE BACKEND 
  # Topic = Topic1, Topic2    - AS A STRING
  # Notes = [Topic1]content1, [Topic1]content2, [Topic2]content3, [Topic2]content4  - AS A STRING
  #
  # our job here is to seperate both of these raw strings...
  # the first one we just use the split function (it returns an array of strings without their , delimeter)
  #
  # for the second one we have to take out the topic from the raw strings and then seperate them...
  # we perform this task by iterating through the tasks and then internally iterating through the raw string and calling .split["[" + topic + "]"]
  # this returns the individual notes corresponding to a specific subject
  # individual notes are pushed to a topicNotes array 
  # once the topic has been iterated through we create a dictionary {topic: notes}
  # we push this dictionary to a final notes array
  # we push the final notes array to the database along with a timestamp and the user's email

  finalNotes = []
  document = request.form.to_dict()
  #take the comma seperated topics list nad turn it into an array
  topicsArr = (document["Topics"]).split(",")
  notesRawArr = (document["Notes"]).split(",")

  #iterate through every topic
  for topic in range(len(topicsArr)):  
    topicNotes = []
    #iterate through individual notes, line per line
    for index in range(len(notesRawArr)):   
      #find and remove the topic from the raw string array 
      if (topicsArr[topic] in notesRawArr[index]):
        tempNote = (notesRawArr[index].split("[" + topicsArr[topic] + "]"))
        topicNotes += tempNote
        while("" in topicNotes) : 
          topicNotes.remove("")
      #create a dictionary of the topic and the corresponding notes
      topicDict = dict({topicsArr[topic]: topicNotes})
      #add the dict to the final notes array, an array of dicts
    finalNotes+=[topicDict]

  #try to find the user's in the notes collection
  user = mongo.db.notes.find_one({'email': loggedEmail})
  #if nonexistent, make a new one
  if user is None:
    mongo.db.notes.insert_one({
      'email': loggedEmail,
      today: [finalNotes],
    })
    return redirect("http://localhost:3000/dashboard")

  #if it is existent, use $set to create a new entry for notes and set it to the timestamp 
  mongo.db.notes.find_one_and_update({
      'email': loggedEmail,
    }, {"$set": {today: [finalNotes]}})
  
  return Response(200, finalNotes).serialize()