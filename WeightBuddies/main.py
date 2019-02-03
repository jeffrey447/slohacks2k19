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

fakeMidpoint = datetime.datetime(2019, 1, 5)

fakeStartdate = datetime.datetime(2019, 1, 1)
fakeEnddate = datetime.datetime(2019, 1, 9)
# end of fake variables


class Points:
    @staticmethod
    def checkpoints(startWeight,startdate):
        endWeight = 150
        # Returns a tuple of two numbers: first one is when they reached 1/3rd of the goal, second is when they reached 2/3rd of goal
        weightTolose = startWeight - endWeight
        thirdway = weightTolose / 3
        checkpoints = [np.array([])]
        checkDateone = startdate + datetime.timedelta(days=30)
        checkDatetwo = startdate + datetime.timedelta(days=60)
        checkpoints = np.append(checkpoints, [((thirdway * 2) + endWeight, checkDateone), (thirdway + endWeight, checkDatetwo)])
        return checkpoints

    @staticmethod
    def ifBothreachGoal(personOneweight, personTwoweight, oneEndweight, twoEndweight):
        # Returns end coin count if both reach goal
        if(personOneweight <= oneEndweight and personTwoweight <= twoEndweight):
            extraLostone = oneEndweight - personOneweight
            extraLosttwo = twoEndweight - personTwoweight
            return(multiplier * initialCoin + extraLosttwo + extraLostone)
        elif(personOneweight <= oneEndweight or personTwoweight <= twoEndweight):
            print("Only one person reached goal!")

    @staticmethod
    def checkpointOnereached(weight, date, checkpoint):
        if(weight <= checkpoint[0] and date <= checkpoint[1]):
            global multiplier
            multiplier += .5
            return "Success!"
        elif(weight <= checkpoint[0] and date >= checkpoint[1]):
            print("Checkpoint reached, but done too late")
        elif(weight >= checkpoint[0] and date <= checkpoint[1]):
            print("Weight above checkpoint, but time is still left!")
        else:
            print("Checkpoint deadline surpassed and weigt is above checkpoint")

    @staticmethod
    def checkPointTworeached(weight, date, checkpoint):
        if(weight <= checkpoint[2] and date <= checkpoint[3]):
            global multiplier
            multiplier += .75
            return "Success!"
        elif(weight <= checkpoint[2] and date >= checkpoint[3]):
            print("Checkpoint reached, but done too late")
        elif(weight >= checkpoint[2] and date <= checkpoint[3]):
            print("Weight above checkpoint, but time is still left!")
        else:
            print("Checkpoint deadline surpassed and weigt is above checkpoint")


#fakeDudescheckpoint = checkpoints(300, 200, fakeStartdate)
#print(checkpointOnereached(299, fakeMidpoint, fakeDudescheckpoint))
#print(multiplier)