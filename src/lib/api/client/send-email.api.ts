"use client";

import { useApi } from "../utils.api";
import { FormData } from "@/types/types";

export function useSendEmail() {
  const { post, pending } = useApi();

  const sendEmail = async (data: Partial<FormData & { type: string }>) => {
    const { error, message } = await post("send-email", data);

    return {
      error,
      message,
    };
  };

  return { sendEmail, pending };
}
