"use client"


export default function PrintButton({ onClick }: { onClick: () => void }): any {

    return (
        <button
            onClick={onClick}
            className="rounded-md bg-zinc-800 px-4 py-2 text-white"
        >
        Generate Report
        </button>
    );
}