import { TestItem } from "@/constants/hematology";


export default function HematologyTable( {record}: {record: TestItem[]} ) :any  {
  console.log("HematologyTable record:", record);
  return (
      <table className="w-full text-sm">
        <tbody>
            
            <tr className="font-semibold border border-gray-400">
                <td className="p-1 text-left">Test Name</td>
                <td className="p-1 text-left">Results</td>
                <td className="p-1 text-left">Units</td>
                <td className="p-1 text-right">Biological Ref. Interval</td>
            </tr>
            <tr>
                <td className="text-center mt-2 font-semibold bg-gray-100 p-1" colSpan={4}>
                    HEMATOLOGY
                </td>
            </tr>
          {record && record.map((row, index) => {

            if ("section" in row) {
              return (
                <tr key={index}>
                  <td  className="font-semibold pt-2 pb-1">
                    {row.section}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={index} className="">

                <td className="py-1">{row.test}</td>

                <td className="py-1 font-medium">
                  {row.result}
                  {row.flag && (
                    <span className="text-red-600 ml-2">
                      {row.flag}
                    </span>
                  )}
                </td>

                <td className="py-1">{row.unit}</td>

                <td className="py-1 text-right">{row.ref}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
  );
}