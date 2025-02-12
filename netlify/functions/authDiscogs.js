const axios = require("axios");
const qs = require("qs");

const oauthConsumerKey = "qGvUwmRugkDfZyRoKnmL"; // Zastąp swoim Consumer Key
const oauthConsumerSecret = "NWHRAiMJEAWcSetBkRrcqHdWeDmoyzRf"; // Zastąp swoim Consumer Secret

// Funkcja do uzyskania Request Token
async function getRequestToken() {
  try {
    console.log("Wysyłam zapytanie do Discogs..."); // Logowanie przed zapytaniem

    const response = await axios.post(
      "https://api.discogs.com/oauth/request_token",
      qs.stringify({}),
      {
        headers: {
          Authorization: `OAuth oauth_consumer_key="${oauthConsumerKey}", oauth_consumer_secret="${oauthConsumerSecret}"`,
        },
      }
    );

    // Wypisz w konsoli Request Token i Token Secret
    const requestToken = response.data.oauth_token;
    const requestTokenSecret = response.data.oauth_token_secret;

    console.log("Request Token:", requestToken);
    console.log("Request Token Secret:", requestTokenSecret);

    return requestToken;
  } catch (error) {
    console.error("Błąd podczas pobierania Request Token:", error);
  }
}

// Wywołanie funkcji
getRequestToken();
