"use client";
export function EdhfLink() {
    // return a message saying the form is closed if the date is past 15th of september 2025 23:59 CEST
    const isFormClosed = new Date() > new Date("2025-09-15T23:59:59+02:00");
    if (isFormClosed) {
        return <p className="border border-gray-500 px-2 py-1">The GUM EDHF Award of Distinction form is closed.</p>;
    }
    return (
        <a href="/gum-edhf-award-of-distinction">
            <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
                GUM EDHF Award of Distinction
            </button>
        </a>
    );
}
