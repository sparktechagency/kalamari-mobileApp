import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const baseQueryWithRath = async (args, api, extraOptions) => {
  // const result = await baseQuery(args, api, extraOptions);

  const token = await storage.getString("token"); // ✅ token load
  // console.log("token : ", token);

  try {
    const result = await axios({
      baseURL: "http://10.10.10.65:8000/api",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (typeof result?.data === "string") {
      const withCurly = result.data + "}";
      return { data: JSON.parse(withCurly) };
    }

    return { data: result?.data };
  } catch (error) {
    if (error.response?.data) {
      if (typeof error.response.data === "string") {
        const withCurly = error.response.data + "}";
        return { error: JSON.parse(withCurly) };
      } else {
        return { error: error.response.data };
      }
    }

    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "post",
    "home",
    "comment",
    "bookmarks",
    "profile",
    "randomuser",
    "report",
    "notification",
  ],
});

export const ImageUrl = "http://10.10.10.65:8000";

export const makeImage = (url) => {
  if (url) {
    return ImageUrl + url;
  }
  return null;
};
