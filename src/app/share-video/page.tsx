"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { Container } from "../components/container";
import { H1 } from "../components/typography";
import { Input } from "../components/input";
import { isValidLink } from "@/helpers/form-validation";
import { useShareVideo } from "@/lib/api/client/share-video.api";

export default function Home() {
  const [queryParams, setQueryParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQueryParams(new URLSearchParams(window.location.search));
    }
  }, []);
  const submissionId = queryParams?.get("submissionId") ?? "";
  const firstName = queryParams?.get("firstName") ?? "";
  const lastName = queryParams?.get("lastName") ?? "";
  const email = queryParams?.get("email") ?? "";

  const [isChecked, setIsChecked] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const isDisabled = !isChecked || !videoUrl || !isValidLink(videoUrl);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { sendVideo, pending } = useShareVideo();

  const handleSubmit = async () => {
    setError(null);
    if (isDisabled) return;
    if (!submissionId || !firstName || !lastName || !email) return;
    const { error, message } = await sendVideo({
      videoUrl,
      submissionId,
      firstName,
      lastName,
      email,
    });
    if (error) {
      setError(message);
    } else {
      setStatus("SENT");
      setVideoUrl("");
      setIsChecked(false);
    }
  };
  return (
    <Container>
      {status === "SENT" ? (
        <div className="text-foreground text-lg">
          Your video link has been sent successfully!
        </div>
      ) : (
        <>
          <H1>Share your video</H1>
          {error && <div className="text-red-500">{error}</div>}
          <Input
            name="videoUrl"
            label="Video File Share Link"
            placeholder="https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing"
            type="text"
            value={videoUrl}
            required={true}
            onChange={(e) => setVideoUrl(e.target.value)}
            note="Please upload your video to a file-sharing platform such as Google Drive, OneDrive, Dropbox, or WeTransfer, and paste the public or shareable link here. Make sure the link is accessible without login."
          />
          <Checkbox
            name="authorizeVideo"
            label="I expressly AUTHORISE SUNSTAR to capture, record and / or reproduce my name, image and voice obtained during the recording of the video and / or photographs in medium and supports including internet (Sunstar Global Portal & Sunstar.com, Sunstar-Foundation.org), marketing material - brochures and social network."
            onChange={(e) => setIsChecked(e.target.checked)}
            checked={isChecked}
          />
          <section className="flex flex-col gap-4">
            <Button disabled={isDisabled || pending} onClick={handleSubmit}>
              {pending ? "Sending..." : "Send Video Link"}
            </Button>
          </section>
        </>
      )}
    </Container>
  );
}
