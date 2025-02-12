// netlify/functions/getAccessToken.js

const axios = require("axios");
const qs = require("qs");

const consumerKey = "qGvUwmRugkDfZyRoKnmL"; // Twoje Consumer Key
const consumerSecret = "NWHRAiMJEAWcSetBkRrcqHdWeDmoyzRf"; // Twoje Consumer Secret

exports.handler = async (event, context) => {
  const { oauth_token, oauth_verifier } = JSON.parse(event.body);

  const url = "https://api.discogs.com/oauth/access_token";

  const params = {
    oauth_consumer_key: consumerKey,
    oauth_consumer_secret: consumerSecret,
    oauth_token: oauth_token,
    oauth_verifier: oauth_verifier,
  };

  try {
    const response = await axios.post(url, qs.stringify(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: response.data.oauth_token,
        access_token_secret: response.data.oauth_token_secret,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd podczas uzyskiwania access tokenu" }),
    };
  }
};
