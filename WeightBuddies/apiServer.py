from flask import Flask, request, abort, jsonify
from db import UserDatabase
import os

app = Flask(__name__)
db = UserDatabase("testDatabase")

def formatOutput(success, message, data):
  return {
    "success": success,
    "message": message,
    "data": data
  }

@app.route("/api/user/<string:username>", methods=["GET", "POST"])
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
          return jsonify(formatOutput(True, None, user))
        else:
          return jsonify(formatOutput(False, message, []))
      elif action == "update":
        args = request.args
        
        key = args.get("key")
        val = args.get("val")

        if key is not None and val is not None:
          success = db.updateUserField(username, key, val)
          message = None
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
          message = None
          if success is True:
            data = db.getUser(username, True)
          else:
            message = "Username (" + username + ") is taken."

          return jsonify(formatOutput(success, message, data))
        else:
          return jsonify(formatOutput(False, "Missing fields.", []))
    else:
      abort(403)
  else:
    abort(403) # no you

if __name__ == "__main__":
  app.secret_key = os.urandom(24)
  app.run(port=7002)