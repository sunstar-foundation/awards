"use client";

import { useApi } from "../utils.api";
import { FormData } from "@/types/types";

export function useShareVideo() {
  const { post, pending } = useApi();

  const sendVideo = async (
    data: Partial<FormData & { videoUrl: string; submissionId: string }>
  ) => {
    const { error, message } = await post("share-video", data);

    return {
      error,
      message,
    };
  };

  return { sendVideo, pending };
}
