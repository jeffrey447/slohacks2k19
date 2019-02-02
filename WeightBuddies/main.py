import numpy as np
import datetime

multiplier = 1
initialCoin = 500

# start of fake variables
fakePersonone = True  # Person one met goal
fakePersontwo = True  # Person two met goal

fakeStartweight = 300
fakeEndweight = 100

fakeCheckpointdateOne = 190
fakeCheckpointdateTwo = 160

fakeStartdate = datetime.datetime(2019, 1, 1)
fakeEnddate = datetime.datetime(2019, 1, 9)
# end of fake variables


def checkpoints(startWeight):
    # Returns a tuple of two numbers: first one is when they reached 1/3rd of the goal, second is when they reached 2/3rd of goal
    thirdway = startWeight / 3
    checkPoints = (thirdway, thirdway * 2)
    return checkPoints


def ifBothreachGoal(personOne, personTwo, oneEndweight, twoEndweight):
    # Returns end coin count if both reach goal
    if(personone <= oneEndweight and persontwo <= twoEndweight):


def checkpointOnereached(weight, date):
    if(date ==)


def checkPointTworeached(weight, date):


print(ifBothreachGoal(fakePersonone, fakePersontwo, initialCoin))
print(checkpoints(initialCoin))
