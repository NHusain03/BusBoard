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
    arriving_buses_response = requests.get("https://api-nile.tfl.gov.uk/StopPoint/" + bus_code + "/Arrivals").json()
    print(arriving_buses_response)
    arriving_buses = []
    out = ""

    for bus in arriving_buses_response:
        arriving_buses.append(ArrivingBus(bus['timeToStation'], bus['vehicleId'], bus['destinationName']))

    arriving_buses.sort(key=lambda x: getattr(x, 'timeToStation'))

    if len(arriving_buses) > 5:
        arriving_buses = arriving_buses[:5]

    for bus in arriving_buses:
        out += str(bus) + "\n"

    return {"results": out}


@app.route('/GetBusStopsFromPostcode/<postcode>')
def GetBusStopsFromPostcode(postcode):  # put application's code here
    stops = []

    postcode_response = requests.get("http://api.postcodes.io/postcodes/" + postcode).json()

    stop_points_response = requests.get("https://api-nile.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram%2C%20\
    NaptanOnstreetBusCoachStopCluster%2C%20NaptanOnstreetBusCoachStopPair%2C%20NaptanPrivateBusCoachTram\
    %2C%20NaptanPublicBusCoachTram%2C%20NaptanBusWayPoint&radius=200&useStopPointHierarchy=\
    false&modes=bus&lat=" + str(postcode_response['result']['latitude']) + "&lon=" +
                                        (str(postcode_response['result']['longitude']))).json()

    for stop in stop_points_response['stopPoints']:
        stops.append(StopPoints(stop['id'], stop['commonName'],
                                stop['distance']))

    if len(stops) > 2:
        stops = stops[:2]
    elif not stops:
        return "No stops within that radius"

    for stop in stops:
        print(stop)
        buses = GetBusFromCode(stop.naptanID)

    return ""


if __name__ == '__main__':
    app.run()
