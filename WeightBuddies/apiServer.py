from flask import Flask, request, abort, jsonify
from db import UserDatabase
import os

app = Flask(__name__)
db = UserDatabase("testDB1")

def formatOutput(success, message, data):
  return {
    "success": success,
    "message": message,
    "data": data
  }

@app.route("/api/user/<string:username>", methods=["POST"])
def user(username):
  if request.method == "POST":
    formData = request.form

    action = formData.get("action")
    if action is not None:
      action = action.lower() # to avoid case sensitive actions
      
      if action == "getinfo":
        user = db.getUser(username, True)
        message = "User (" + username + ") is not found."

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
          return jsonify(formatOutput(False, message, []))
      elif action == "update":
        args = request.args
        
        key = args.get("key")
        val = args.get("val")

        if key is not None and val is not None:
          success = db.updateUserField(username, key, val)
          message = ""
          data = []

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
          success = db.registerUser(username, name, pw, role)
          data = []
          message = ""
          if success is True:
            data = db.getUser(username, True)
            if data is None:
              data = []
          else:
            message = "Username (" + username + ") is taken."
          
          return jsonify(formatOutput(success, message, data))
        else:
          return jsonify(formatOutput(False, "Missing fields.", []))
      elif action == "support":
        args = request.args

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
        
        return jsonify(formatOutput(success, message, []))
      else:
        return jsonify(formatOutput(False, "Unknown action.", []))
    else:
      abort(403)
  else:
    abort(403) # no you

if __name__ == "__main__":
  app.secret_key = os.urandom(24)
  app.run(port=7000)