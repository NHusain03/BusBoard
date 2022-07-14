class StopPoints():
    def __init__(self, naptanID, commonName, distance, nextBuses):
        self.naptanID = naptanID
        self.commonName = commonName
        self.distance = distance
        self.nextBuses = nextBuses

    def __str__(self):
        return "Stop " + str(self.naptanID) + " called " + self.commonName + " is " \
               + str(self.distance) + " metres away"