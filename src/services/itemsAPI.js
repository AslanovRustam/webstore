const BASE_URL = "https://run.mocky.io/v3";

const FetchItems = () => {
  return fetch(`${BASE_URL}/b7d36eea-0b3f-414a-ba44-711b5f5e528e`).then(
    (response) => {
      return response.json();
    }
  );
};

export { FetchItems };
