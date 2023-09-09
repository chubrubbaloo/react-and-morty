const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function fetchCharacters() {
  try {
    const response = await fetch(`${BASE_URL}/character`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can re-throw the error if you want to handle it in a different part of your application
  }
}
