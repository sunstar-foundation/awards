"use client";

import React, { useState } from "react";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { Container } from "../components/container";
import { H1 } from "../components/typography";
import { Input } from "../components/input";
import { isValidLink } from "@/helpers/form-validation";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const isDisabled = !isChecked || !videoUrl || !isValidLink(videoUrl);
  return (
    <Container>
      <H1>Share your video</H1>
      <Input
        name="videoUrl"
        label="Video URL"
        placeholder="Enter your video URL"
        type="text"
        value={videoUrl}
        required={true}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <Checkbox
        name="authorizeVideo"
        label="I expressly AUTHORISE SUNSTAR to capture, record and / or reproduce my name, image and voice obtained during the recording of the video and / or photographs in medium and supports including internet (Sunstar Global Portal & Sunstar.com, Sunstar-Foundation.org), marketing material - brochures and social network."
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />
      <section className="flex flex-col gap-4">
        <Button
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) return;
            window.open(videoUrl, "_blank");
            setVideoUrl("");
            setIsChecked(false);
          }}
        >
          Share your video
        </Button>
      </section>
    </Container>
  );
}
