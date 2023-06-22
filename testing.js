const axios = require("axios");

const makeCall = async (url) => {
  const axios = require("axios");

  let config = {
    method: "get",
    url: "https://api.publicapis.org/entries",
    headers: {
      "Content-Type": "application/json",
    },
    // data: data,
  };

  const response = await axios(config);
  console.log("response is ", JSON.stringify(response.data));
};

makeCall("https://api.publicapis.org/entries")