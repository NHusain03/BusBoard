from flask import Flask
import requests

app = Flask(__name__)


@app.route('/')
def get_data():  # put application's code here
    response = requests.get("https://api-nile.tfl.gov.uk/StopPoint/490008660N/Arrivals").content



if __name__ == '__main__':
    app.run()