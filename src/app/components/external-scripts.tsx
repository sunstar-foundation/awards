"use client";
import { useEffect } from "react";

declare global {
	interface Window {
		uc?: unknown;
		uc2?: {
			deactivateBlocking?: (args: string[]) => void;
		};
	}
}

export default function ExternalScripts() {
	useEffect(() => {
		const handleConsent = () => {
			if (window.uc) {
				window.uc2?.deactivateBlocking?.(["f6nkjdUL"]);
			}
		};

		window.addEventListener("consentmanager", handleConsent);

		return () => {
			window.removeEventListener("consentmanager", handleConsent);
		};
	}, []);
	return null;
}