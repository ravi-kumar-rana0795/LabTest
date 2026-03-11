// ...existing code...
"use client";

import React, { useEffect, useRef, useState } from "react";
import PrintButton from "@/components/Print";
import Logo from "@/components/Logo";
import { data, TestItem } from "@/constants/hematology";
import Report from "@/components/report";
import { RecordType } from "@/constants/types";



export default function PathologyReport() {
    const reportRef = useRef<HTMLDivElement | null>(null);

    // patient / report state
    const [patientName, setPatientName] = useState("");
    const [ageSex, setAgeSex] = useState("");
    const [referredBy, setReferredBy] = useState("");
    // store reporting time as a datetime-local string (yyyy-MM-ddTHH:mm)
    const [reportingTime, setReportingTime] = useState(() => {
        const now = new Date();
        return toDateTimeLocal(now);
    });
    const [labRefNo, setLabRefNo] = useState("");
    const [patientId, setPatientId] = useState("");

    const [savedRecords, setSavedRecords] = useState<RecordType[]>([]);
    const [savedRecord, setSavedRecord] = useState<RecordType | null>(null);

    // per-row validation messages keyed by test id
    const [errors, setErrors] = useState<Record<number, string>>({});

    useEffect(() => {
        const raw = localStorage.getItem("lab_records");
        if (raw) {
            try {
                setSavedRecords(JSON.parse(raw));
            } catch {
                setSavedRecords([]);
            }
        }
    }, []);

    // dynamic tests
    const [tests, setTests] = useState<TestItem[]>(data);

    function persistRecords(records: RecordType[]) {
        localStorage.setItem("lab_records", JSON.stringify(records));
        setSavedRecords(records);
    }
    function persistRecord(record: RecordType) {
        const next = [record, ...savedRecords].slice(0, 200); // keep recent 200
        localStorage.setItem("lab_records", JSON.stringify(next));
        setSavedRecords(next);
        setSavedRecord(record);
    }
    // handle input changes for test rows with validation for "result"
    function updateTest(id: number, key: string, value: string) {
        setTests((prev) => prev.map((t) => (t.id === id ? { ...t, [key]: value } : t)));

        if (key === "result") {
            const v = value.trim();
            let msg = "";
            if (v === "") {
                msg = "Result is required.";
            } else if (isNaN(Number(v))) {
                msg = "Value must be a number.";
            }
            // else {
            //     // try to parse reference interval like "13.0-17.0" and warn if out of range
            //     const t = tests.find((x) => x.id === id) ?? data.find((x) => x.id === id);
            //     const ref = (t && (t as any).ref) || "";
            //     const m = ref.match(/(-?\d+(\.\d+)?)/g);
            //     if (m && m.length >= 2) {
            //         const min = parseFloat(m[0]);
            //         const max = parseFloat(m[1]);
            //         const n = Number(v);
            //         if (!isNaN(min) && !isNaN(max) && (n < min || n > max)) {
            //             msg = `Outside reference (${min}-${max}).`;
            //         }
            //     }
            // }
            setErrors((prev) => ({ ...prev, [id]: msg }));
        }
    }
    function toDateTimeLocal(d: Date) {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
            d.getMinutes()
        )}`;
    }

    function formatDisplay(dtLocal: string) {
        const d = new Date(dtLocal);
        return isNaN(d.getTime()) ? dtLocal : d.toLocaleString();
    }

    // simple "save" to update report (in this file the report is rendered from state directly)
    const handleSave = (e?: React.FormEvent) => {
        e?.preventDefault();

        // ensure all results are present and no validation errors
        const newErrors: Record<number, string> = {};
        tests.forEach((t) => {
            if (!("section" in t)) {
                const val = (t as any).result;
                if (val === "" || val === null || val === undefined) {
                    newErrors[t.id] = "Result is required.";
                }
            }
        });

        // merge with existing errors and abort if any message exists
        const merged = { ...errors, ...newErrors };
        setErrors(merged);
        const hasError = Object.values(merged).some((m) => m && m.length > 0);
        if (hasError) {
            alert("Fix validation errors before saving.");
            return;
        }

        // create a record and persist to localStorage
        const record: RecordType = {
            id: `${Date.now()}`,
            patientName,
            ageSex,
            referredBy,
            reportingTime,
            labRefNo,
            patientId,
            tests,
            createdAt: new Date().toISOString(),
        };

        persistRecord(record);
    };


    const deleteRecord = (id: string) => {
        const next = savedRecords.filter((r) => r.id !== id);
        persistRecords(next);
    };
    const handlePrint = () => {
        if (!reportRef.current) return
        const printContent = reportRef.current.innerHTML
        const originalContent = document.body.innerHTML
        document.body.innerHTML = printContent
        window.print()
        document.body.innerHTML = originalContent;
        window.location.reload()
    }

    const handleLogOut = () => {
        // clear the simple client cookie to "log out"
        document.cookie = "auth=; path=/; max-age=0";
        // navigate back to home page after logout
        window.location.href = "/";
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                {/* Global validation errors */}
                {Object.values(errors).some(Boolean) && (
                    <div
                        role="alert"
                        className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700"
                    >
                        <strong className="block font-medium">Validation errors:</strong>
                        <ul className="mt-2 list-disc list-inside">
                            {Object.entries(errors).map(([id, msg]) =>
                                msg ? <li key={id}>Test #{id}: {msg}</li> : null
                            )}
                        </ul>
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="flex items-center gap-4">
                        <Logo />
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Patient / Report Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Name</label>
                            <input value={patientName} placeholder="Enter patient name" onChange={(e) => setPatientName(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Age & Sex</label>
                            <input value={ageSex} placeholder="Enter age and sex" onChange={(e) => setAgeSex(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Referred by</label>
                            <input value={referredBy} placeholder="Enter referred by" onChange={(e) => setReferredBy(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Reporting Time</label>
                            {/* <input value={reportingTime} onChange={(e) => setReportingTime(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" /> */}
                            <input
                                type="datetime-local"
                                value={reportingTime}
                                onChange={(e) => setReportingTime(e.target.value)}
                                className="mt-1 block w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Lab Ref No</label>
                            <input value={labRefNo} placeholder="Enter lab ref no" onChange={(e) => setLabRefNo(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700">Patient Id</label>
                            <input value={patientId} placeholder="Enter patient id" onChange={(e) => setPatientId(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                        </div>
                    </div>

                    <div className="space-y-2 mt-2">
                        <div className="grid grid-cols-12 gap-2 items-center border-1 border-gray-400 pb-1">
                            <span
                                className="col-span-4 font-semibold px-2 py-1"
                            >Test name
                            </span>
                            <span
                                className="col-span-2 font-semibold px-2 py-1"
                            >Result</span>
                            <span
                                className="col-span-2 font-semibold px-2 py-1"
                            >Units</span>
                            <span
                                className="col-span-3 font-semibold px-2 py-1"
                            >Biological Ref. Interval
                            </span>
                        </div>
                        {tests.map((t, index) => {

                            if ("section" in t) {
                                return (
                                    <div key={t.id} className="grid grid-cols-12 gap-2 items-center">
                                        <input
                                            className="col-span-6 font-semibold rounded-md border px-2 py-1 bg-gray-300"
                                            placeholder="Test name"
                                            value={t.section}
                                            disabled={true}
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={t.id} className="grid grid-cols-12 gap-2 items-center">
                                    <input
                                        className="col-span-4 rounded-md border px-2 py-1 bg-gray-300"
                                        placeholder="Test name"
                                        value={t.test}
                                        disabled={true}
                                    />
                                    <input
                                        className={`col-span-2 rounded-md border px-2 py-1 ${
                                            errors[t.id]
                                                ? "border-red-500"
                                                : "border-zinc-900"
                                        }`}
                                        placeholder="Result"
                                        value={t.result}
                                        type="text"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTest(t.id, "result", e.target.value)}
                                    />
                                    <input
                                        className="col-span-2 rounded-md border px-2 py-1 bg-gray-300"
                                        placeholder="Units"
                                        value={t.unit}
                                        disabled={true}
                                    />
                                    <input
                                        className="col-span-3 rounded-md border px-2 py-1 bg-gray-300"
                                        placeholder="Biological Ref. Interval"
                                        disabled={true}
                                        value={t.ref}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button type="submit" className="rounded-md bg-zinc-700 px-4 py-2 text-white">
                            Save
                        </button>
                        <button
                            onClick={handlePrint}
                            className={`rounded-md ${savedRecord ? "bg-zinc-800" : "bg-gray-300"} px-4 py-2 text-white`}
                            disabled={!savedRecord}
                        >
                            Generate Report
                        </button>
                        <button type="button" onClick={handleLogOut} className="flex-end rounded-md bg-red-600 px-4 py-2 text-white">
                            Sign Out
                        </button>
                    </div>
                </form>
            </div>
            <div ref={reportRef} className="hidden">
                {
                    savedRecord && (
                        <Report record={savedRecord} />
                    )
                }
            </div>
        </div>
    );
}
// ...existing code...