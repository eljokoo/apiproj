import axios from 'axios';

const API_URL = 'https://numbersapi.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
};

// function to get a fact about a number
export default async function getNumberFact(number) {
  // make sure response is in json
  const params = {
    json: true,
  };

  const response = await axios.get(`${API_URL}/${number}/math`, { params, headers })
    .catch((error) => {
      console.error('Error getting number fact', error);
      throw error;
    });

  return response.data;
}
