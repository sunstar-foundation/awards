"use client";
import { WDHA_DEADLINE, isAwardClosed } from "@/config/awards";

export function WdhaLink() {
  // return a message saying the form is closed if the date is past the WDHA deadline
  const isFormClosed = isAwardClosed(WDHA_DEADLINE);
  if (isFormClosed) {
    return (
      <p className="border border-gray-500 px-2 py-1">
        The World Dental Hygienist Award form is closed.
      </p>
    );
  }
  return (
    <button
      className="px-4 py-2 text-white bg-bluecolor min-w-[150px] cursor-default opacity-50"
      disabled
      type="button"
      aria-disabled="true"
    >
      World Dental Hygienist Award
    </button>
  );
}
