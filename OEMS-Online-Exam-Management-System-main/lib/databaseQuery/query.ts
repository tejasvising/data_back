import { DocumentNode } from "@apollo/client";
import axios from "axios";
import client from "../../apollo-client";
import { headers, url } from "../../headers";

export const query = async (query: DocumentNode) => {
  try {
    const { data } = await client.query({
      query,
    });

    return data;
  } catch (err) {
    return { message: err };
  }
};

export const mutation = async (query: DocumentNode) => {
  try {
    const { data } = await client.mutate({
      mutation: query,
    });

    return data;
  } catch (err) {
    return { message: err };
  }
};

export const axiosQuery = async (query: string) => {
  try {
    const {data} = await axios({
      url,
      method: "post",
      headers,
      data: {
        query,
      },
    });
    return data;
  } catch (err) {
    return { message: err };
  }
};
