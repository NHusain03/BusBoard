export class ApiService {
    healthCheck() {
        return new Promise((resolve) =>
            fetch("/healthcheck", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
                .then((response) => checkResponse(response))
                .then((response) => resolve(response.json()))
                .catch((error) => console.error(error))
        );
    }

    GetBusFromCode(bus_code) {
        return new Promise((resolve) =>
            fetch("/GetBusFromCode/" + bus_code, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then((response) => resolve(response.json()))
                .catch((error) => console.error(error))
        );
    }

    GetBusStopsFromPostcode(postcode, radius) {
        return new Promise((resolve) =>
            fetch("/GetBusStopsFromPostcode/" + String(postcode) + "/" + String(radius), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then((response) => resolve(response.json()))
                .catch((error) => console.error(error))
        );
    }
}

const checkResponse = (response) => {
  if (response.ok) {
    return response;
  }
  return response.text().then((e) => {
    throw new Error(e);
  });
};
