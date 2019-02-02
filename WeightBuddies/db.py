from pymongo import MongoClient
from hashlib import md5

class UserDatabase:
  def __init__(self, dbName):
    self.client = MongoClient()
    self.db = self.client[dbName]
    self.table = self.db.users
  
  def checkUniqueField(self, field, value):
    for user in self.table.find():
      if user[field] and user[field].lower() == value.lower():
        return True

    return False
  
  def md5_hash(self, str):
    return md5(str.encode("utf-8")).hexdigest()

  def registerUser(self, username, name, pw, role):
    if self.checkUniqueField("username", username) is False:
      pwhash = self.md5_hash(pw)
      data = { "username": username,
              "name": name,
              "pass_hash": pwhash,
              "weight_data": {}, # contains tuples of weight & date
              "coins": 0,
              "role": role # 0: mentor, 1: mentee
            }
      
      return self.table.insert_one(data)
    
    return False
  
  def getUser(self, username):
    for user in self.table.find():
      if user["username"] == username:
        return user
    
    return None
  
  def updateUserField(self, username, field, value):
    user = self.getUser(username)
    if user is not None:
      # user exists
      u_id = user["_id"]
      user[field] = value
      self.table.update_one({"_id": u_id}, {"$set": user}, upsert=False)
      
      return True
    return False

# db = UserDatabase("testDB")
# db.registerUser("jeef110", "jeef", "o", 0)
# db.updateUserField("jeef110", "weight_data", {
#  {
#      { "weight": 100, "date": }
#  }
# })