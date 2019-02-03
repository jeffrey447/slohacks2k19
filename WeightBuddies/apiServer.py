from flask import Flask, request, abort, jsonify
from db import UserDatabase
from main import Points
from datetime import datetime
import os, calendar

app = Flask(__name__)
db = UserDatabase("test111")

def formatOutput(success, message, data):
  return {
    "success": success,
    "message": message,
    "data": data
  }

def getMonthNumber(dateStr):
  m = {
        'jan': 1,
        'feb': 2,
        'mar': 3,
        'apr':4,
         'may':5,
         'jun':6,
         'jul':7,
         'aug':8,
         'sep':9,
         'oct':10,
         'nov':11,
         'dec':12
        }
        
  s = dateStr.strip()[:3].lower()

  try:
      out = m[s]
      return out
  except:
      raise ValueError('Not a valid month.')

def getDateTime(dateString):
  return datetime.strptime(dateString + ' 12:00PM', '%b %d %Y %I %M%p')

@app.route("/api/points/<string:action>", methods=["GET"])
def points(action):
  if request.method == "GET":
    args = request.args

    username = args.get("user")
    if username is not None:
      user = db.getUser(username, True)

      action = action.lower()
      if action == "checkpoint":
        wData = user['weightData']
        if len(wData) > 0:
          first = wData[0]
          actualDate = getDateTime(first['date'])
          
          return jsonify(formatOutput(True, '', Points.checkpoints(first['weight'], actualDate)))
        else:
          return jsonify(formatOutput(False, 'Invalid data.', {}))
      else:
        return jsonify(formatOutput(False, 'Invalid action.', {}))
    else:
      return jsonify(formatOutput(False, 'Invalid user.', {}))

@app.route("/api/user/<string:username>", methods=["GET", "POST"])
def user(username):
  if request.method == "POST":
    formData = request.form

    action = formData.get("action")
    if action is not None:
      action = action.lower() # to avoid case sensitive actions
      
      if action == "getinfo":
        user = db.getUser(username, True)

        if user is not None:
          dataTable = {
            "user": user,
            "supporter": None
          }

          if user['supporter'] is not None:
            dataTable['supporter'] = db.getUser(user['supporter'], True)
            if dataTable['supporter'] is None:
              dataTable['supporter'] = []

          return jsonify(formatOutput(True, "", dataTable))
        else:
          return jsonify(formatOutput(False, "User (" + username + ") is not found.", []))
      elif action == "update":
        args = request.args
        
        key = args.get("key")
        val = args.get("val")

        if key is not None and val is not None:
          success = db.updateUserField(username, key, val)
          message = ""
          data = {}

          if success is True:
            data = db.getUser(username, True)
          else:
            message = "User (" + username + ") is not found."
          
          return jsonify(formatOutput(success, message, data))
      elif action == "register":
        args = request.args

        name = args.get("name")
        pw = args.get("pass")
        role = args.get("role")

        if name is not None and pw is not None and role is not None:
          success = (db.registerUser(username, name, pw, role) is not None)
          data = {}
          message = ""
          if success is True:
            data = db.getUser(username, True)
            if data is None:
              data = {}
          else:
            message = "Username (" + username + ") is taken."
          
          return jsonify(formatOutput(success, message, data))
        else:
          return jsonify(formatOutput(False, "Missing fields.", []))
      elif action == "support":
        args = request.args

        success = False
        other = args.get("other")
        message = ""
        
        if other is not None:
          user = db.getUser(username, True)
          otherUser = db.getUser(other, True)

          if user is not None:
            if otherUser is not None:
              success = db.updateUserField(username, "supporter", other)
              if success:
                success = db.updateUserField(other, "supporter", username)

                if success is False:
                  message = "Unknown error."
              else:
                message = "Unknown error."
            else:
              message = "User (" + other + ") is not found."
        
        return jsonify(formatOutput(success, message, {}))
      elif action == "addweight":
        args = request.args
        
        weight = args.get("weight")
        message = ""
        success = True

        if weight is not None:
          try:
            weight = int(weight)
          except ValueError:
            message = "Invalid weight number."
            success = False
          
          if success is True:
            if weight > 0:
              user = db.getUser(username, True)
              
              if user is not None:
                date = datetime.now()
                month = calendar.month_name[date.month][:3]

                user['weightData'].append({
                  "weight": weight,
                  "date": month + " " + str(date.day) + ", " + str(date.year)
                })

                success = db.updateUserField(username, "weightData", user['weightData'])
                if success:
                  message = ""
                else:
                  message = "Unknown error."
              else:
                success = False
                message = "User (" + username + ") is not found."
            else:
              success = False
              message = "Weight number must be positive."

        return jsonify(formatOutput(success, message, {})) 
      else:
        return jsonify(formatOutput(False, "Unknown action.", {}))
    else:
      abort(403)
  else:
    abort(403) # no you

if __name__ == "__main__":
  app.secret_key = os.urandom(24)
  app.run(port=7000)