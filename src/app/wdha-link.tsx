"use client";
export function WdhaLink() {
    // return a message saying the form is closed if the date is past 15th of january 2026 23:59 CET
    const isFormClosed = new Date() > new Date("2026-01-15T23:59:59+01:00");
    if (isFormClosed) {
        return <p className="border border-gray-500 px-2 py-1">The World Dental Hygienist Award form is closed.</p>;
    }
    return (
        <a href="/world-dental-hygienist-awards">
            <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
                World Dental Hygienist Award
            </button>
        </a>
    );
}