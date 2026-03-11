"use client";

import React, { useRef } from "react";
import HematologyTable from "./hematology";
import LabSignature from "./labsignature";
import PrintButton from "@/components/Print";
import { RecordType } from "@/constants/types";

export default function PathologyReport({ record }: { record: RecordType }) {
  const reportRef = useRef<HTMLDivElement>(null);

const handlePrint = () => {
    if (!reportRef.current) return
    const printContent = reportRef.current.innerHTML
    const originalContent = document.body.innerHTML
    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent;
    window.location.reload()
  }

  return (
    <div className="bg-gray-100  min-h-screen"  ref={reportRef}>
      <div className="max-w-4xl mx-auto bg-white p-8" >

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold italic underline">
            *SN PATHOLOGY LAB*
          </h1>
          <p className="text-sm italic mt-1">KISAN HIGH SCHOOL EDLA ROAD DARI SIMARIA</p>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-6">

          {/* Left Box */}
          <div className="border border-gray-500 p-4 text-sm">
            <p>
              <span className="font-semibold">Name :</span> {record.patientName}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Age & Sex :</span> {record.ageSex}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Referred by :</span> {record.referredBy}
            </p>
          </div>

          {/* Right Box */}
          <div className="border border-gray-500 p-4 text-sm">

            {/* Barcode */}
            <div className="h-10 bg-gray-300 mb-4 flex items-center justify-center text-xs">
              {record.patientId}
            </div>

            <p>
              <span className="font-semibold">Reporting Time :</span>
              {record.reportingTime}
            </p>

            <p className="mt-2">
              <span className="font-semibold">Lab Ref No :</span>
              {record.labRefNo}
            </p>
          </div>
        </div>

        {/* Table Header */}
        <div className="mt-2">
          {/* <HematologyTable record={record} /> */}
          <LabSignature />
        </div>
      </div>
      <PrintButton onClick={handlePrint} />
    </div>

    
  );
}