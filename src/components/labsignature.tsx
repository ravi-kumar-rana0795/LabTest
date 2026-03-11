import Logo from "@/components/Logo";

export default function LabSignature(): any {
  return (
    <div className="mt-16 flex justify-end">
      
      <div className="text-center">

        {/* Signature Image */}
        <div className="h-16 mb-2">
          <Logo />
        </div>
        {/* Title */}
        <p className="text-md font-semibold">
          Lab Incharge
        </p>
        {/* Name */}
        <p className="text-sm font-semibold mt-1">
          Shankar Kr Modi
        </p>
      </div>

    </div>
  );
}