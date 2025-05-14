"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;
const API_URL = `${BASE_URL}/api`;

type APISuccessResponse<T> = {
  error: false;
  data: T;
  message: string;
  pending: boolean;
};

type APIErrorResponse = {
  error: true;
  data: null;
  message: string;
  pending: boolean;
};

type ApiResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export const useApi = () => {
  const [pending, setPending] = useState(false);

  const post = async <T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> => {
    setPending(true);
    const url = `${API_URL}/${endpoint}`;
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();

      setPending(false);

      if (response.error) {
        return {
          data: null,
          message: response.message || "Something went wrong",
          error: true,
          pending: false,
        };
      }

      return {
        data: response.data as T,
        message: response.message || "Success",
        error: false,
        pending: false,
      };
    } catch (error) {
      console.error("POST request failed:", error);
      setPending(false);
      return {
        data: null,
        message: (error as Error).message,
        error: true,
        pending: false,
      };
    }
  };

  const get = async <T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<ApiResponse<T>> => {
    setPending(true);
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = `${API_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;
    try {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      setPending(false);

      if (response.error) {
        return {
          data: null,
          message: response.message || "Something went wrong",
          error: true,
          pending: false,
        };
      }

      return {
        data: response.data as T,
        message: response.message || "Success",
        error: false,
        pending: false,
      };
    } catch (error) {
      console.error("GET request failed:", error);
      setPending(false);
      return {
        data: null,
        message: (error as Error).message,
        error: true,
        pending: false,
      };
    }
  };

  const del = async <T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> => {
    setPending(true);
    const url = `${API_URL}/${endpoint}`;
    try {
      const request = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();

      setPending(false);

      if (response.error) {
        return {
          data: null,
          message: response.message || "Something went wrong",
          error: true,
          pending: false,
        };
      }

      return {
        data: response.data as T,
        message: response.message || "Success",
        error: false,
        pending: false,
      };
    } catch (error) {
      console.error("DELETE request failed:", error);
      setPending(false);
      return {
        data: null,
        message: (error as Error).message,
        error: true,
        pending: false,
      };
    }
  };

  const patch = async <T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> => {
    setPending(true);
    const url = `${API_URL}/${endpoint}`;
    try {
      const request = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await request.json();

      setPending(false);

      if (response.error) {
        return {
          data: null,
          message: response.message || "Something went wrong",
          error: true,
          pending: false,
        };
      }

      return {
        data: response.data as T,
        message: response.message || "Success",
        error: false,
        pending: false,
      };
    } catch (error) {
      console.error("PATCH request failed:", error);
      setPending(false);
      return {
        data: null,
        message: (error as Error).message,
        error: true,
        pending: false,
      };
    }
  };

  return { post, get, del, patch, pending };
};
