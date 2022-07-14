from flask import Flask
import requests
from ArrivingBus import ArrivingBus
from StopPoints import StopPoints

app = Flask(__name__)

@app.route('/healthcheck')
def healthcheck():
    print("hello")
    return {"Status" : "What's up"}

@app.route('/GetBusFromCode/<bus_code>')
def GetBusFromCode(bus_code):  # put application's code here
    url = "https://api.tfl.gov.uk/StopPoint/" + bus_code + "/Arrivals"
    print("!!!",url)
    arriving_buses_response = requests.get(url).json()
    arriving_buses = []

    for bus in arriving_buses_response:
        arriving_buses.append(ArrivingBus(bus['timeToStation'], bus['lineId'], bus['destinationName']))

    arriving_buses.sort(key=lambda x: getattr(x, 'timeToStation'))

    if len(arriving_buses) > 5:
        arriving_buses = arriving_buses[:5]

    output = [
        {
            'TimeToStation': bus.timeToStation,
            'LineID': bus.lineID,
            'Destination': bus.destinationName
        } for bus in arriving_buses]
    return output


@app.route('/GetBusStopsFromPostcode/<postcode>/<radius>')
def GetBusStopsFromPostcode(postcode, radius):  # put application's code here
    stops = []
    postcode_url = "http://api.postcodes.io/postcodes/" + postcode
    print(postcode_url)
    postcode_response = requests.get(postcode_url).json()


    stop_points_url = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram%2C%20NaptanOnstreetBusCoachStopCluster%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanPrivateBusCoachTram%2C%20NaptanPublicBusCoachTram%2C%20NaptanBusWayPoint&radius="+str(radius)+"&useStopPointHierarchy=false&modes=bus&lat=" + str(postcode_response['result']['latitude']) + "&lon=" + (str(postcode_response['result']['longitude']))

    print("!!", stop_points_url)
    stop_points_response = requests.get(stop_points_url).json()

    print(len(stop_points_response['stopPoints']))

    for stop in stop_points_response['stopPoints']:
        stops.append(StopPoints(stop['id'], stop['commonName'],
                                stop['distance'], GetBusFromCode(stop['id'])))

    print("loop done")

    if len(stops) > 2:
        stops = stops[:2]
    elif not stops:
        return {"Error":"No stops within that radius"}

    output = [
        {
            'NaptanID': stop.naptanID,
            'CommonName': stop.commonName,
            'Distance': stop.distance,
            'Buses': stop.nextBuses
        } for stop in stops]
    return {"Stops": output}


if __name__ == '__main__':
    app.run()
