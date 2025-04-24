import axios from "axios";

const RestEngine = async (
  endpoint: string,
  headers: Record<string, string>
  // body: Record<string, any>
) => {
  try {
    const response = await axios.get(endpoint, {
      headers: headers,
      // data: body,
    });

    if (!response) {
      return {
        error: "Something went wrong , please try again",
        data: null,
      };
    }

    if (response.status !== 200) {
      return {
        error: response.data,
        data: null,
      };
    }

    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: error,
      data: null,
    };
  }
};

export default RestEngine;
