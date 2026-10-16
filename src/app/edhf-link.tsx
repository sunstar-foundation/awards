"use client";
import { EDHF_DEADLINE, EDHF_FORM_ENABLED, isAwardClosed } from "@/config/awards";

export function EdhfLink() {
    // return a message saying the form is closed if the date is past the EDHF deadline
    const isFormClosed = !EDHF_FORM_ENABLED || isAwardClosed(EDHF_DEADLINE);
    if (isFormClosed) {
        return (
            <button
                className="px-4 py-2 text-white bg-bluecolor min-w-[150px] cursor-default opacity-50"
                disabled
                type="button"
                aria-disabled="true"
            >
                GUM EDHF Award of Distinction
            </button>
        );
    }
    return (
        <a href="/gum-edhf-award-of-distinction">
            <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
                GUM EDHF Award of Distinction
            </button>
        </a>
    );
}
