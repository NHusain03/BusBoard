class ArrivingBus():
    def __init__(self, timeToStation, lineID, destinationName):
        self.timeToStation = timeToStation
        self.lineID = lineID
        self.destinationName = destinationName

    def __str__(self):
        return "Bus " + str(self.vehicleID) + " heading to " + self.destinationName + " will arrive in " \
               + str(self.timeToStation) + " seconds"