import axios from "axios";

const RestEngine = async (
  endpoint: string,
  headers: Array<{ key: any; val: any }>,
  body: string,
  method: string
) => {
  try {
    const processed_headers: Record<string, string> = {};

    headers.forEach((header) => {
      processed_headers[header.key.value] = header.val.value;
    });

    const response = await axios({
      method: method,
      url: endpoint,
      headers: processed_headers,
      data: JSON.parse(body),
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
