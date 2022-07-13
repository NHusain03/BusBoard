class ArrivingBus():
    def __init__(self, timeToStation, vehicleID, destinationName):
        self.timeToStation = timeToStation
        self.vehicleID = vehicleID
        self.destinationName = destinationName

    def __str__(self):
        return "Bus " + str(self.vehicleID) + " heading to " + self.destinationName + " will arrive in " \
               + str(self.timeToStation) + " seconds"