import numpy as np
import datetime

multiplier = 1
initialCoin = 500

# st7art of fake variables
fakePersonone = True  # Person one met goal
fakePersontwo = True  # Person two met goal

fakeStartweight = 300
fakeEndweight = 100

fakeCheckpointdateOne = 190
fakeCheckpointdateTwo = 160

fakeStartdate = datetime.datetime(2019, 1, 1)
fakeEnddate = datetime.datetime(2019, 1, 9)
# end of fake variables


def checkpoints(startWeight, endWeight, startdate):
    # Returns a tuple of two numbers: first one is when they reached 1/3rd of the goal, second is when they reached 2/3rd of goal
    weightTolose = startWeight - endWeight
    thirdway = weightTolose / 5
    checkpoints = [np.array([])]
    checkDateone = startdate + datetime.timedelta(days=10)
    checkDatetwo = startdate + datetime.timedelta(days=20)
    checkpoints = np.append(checkpoints, [((thirdway * 2) + endWeight, checkDateone), (thirdway + endWeight, checkDatetwo)])
    return checkpoints


def ifBothreachGoal(personOneweight, personTwoweight, oneEndweight, twoEndweight):
    # Returns end coin count if both reach goal
    if(personOneweight <= oneEndweight and personTwoweight <= twoEndweight):
        extraLostone = oneEndweight - personOneweight
        extraLosttwo = twoEndweight - personTwoweight
        return(multiplier * initialCoin + extraLosttwo + extraLostone)
    elif(personOneweight <= oneEndweight or personTwoweight <= twoEndweight):
        print("Only one person reached goal!")


# def checkpointOnereached(weight, date, checkpoint):
#     if(weight <= checkpoint[0][0] and date < checkpoint[0][1]):
#         return multiplier + .5


# def checkPointTworeached(weight, date, checkpoint):
#     if(weight <= checkpoint[1][0] and date < checkpoint[1][1]):
#         return multiplier + .75


print(ifBothreachGoal(150, 200, 200, 300))

firstCheck = checkpoints(fakeStartweight, fakeEndweight, fakeStartdate)
print(firstCheck)
secondCheck = checkpoints(400, 20, fakeStartdate)
print(secondCheck)
print(type(secondCheck[1]))
# print(checkpointOnereached(200, datetime.datetime(2019, 1, 5), firstCheck))
