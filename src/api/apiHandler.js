const BASE_URL = process.env.REACT_APP_BASE_URL;

// Generic fetch function where you set the endpoint after the base url
async function fetchData(endpoint) {
  try {
    // If the response back from the server is not ok throw new error
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // returns the parsed data back
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { fetchData };
