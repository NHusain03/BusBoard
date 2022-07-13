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
            fetch("/GetBooks/" + bus_code, {
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

    GetBusStopsFromPostcode(postcode) {
        return new Promise((resolve) =>
            fetch("/GetBooks/" + postcode, {
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
