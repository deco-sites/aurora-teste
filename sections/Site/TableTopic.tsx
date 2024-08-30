import LineTitle from "site/components/Site/Table/line-title.tsx";

export default function TableTopic({ topic }) {
    //console.log("Tópico", topic);
    return (
        <>
            <div className="overflow-x-auto px-14 py-7">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-6 border-r border-r-gray-200 border-opacity-20 bg-orange1 text-white text-left text-sm font-medium rounded-tl-[20px]">
                                {topic.table.column1Name}
                            </th>
                            <th className="px-6 py-6 bg-orange1 text-white text-left text-sm font-medium rounded-tr-[20px]">
                                {topic.table.column2Name}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {topic.table.line.map((line, index) => (
                            <tr
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                                <td className="px-6 py-4 border-b border-gray-200 text-black border-r border-r-gray-200 border-r-opacity-20">
                                    {line.dataCel1}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-black">
                                    {line.dataCel2}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <span className="text-black text-opacity-40 mt-7">
                {topic.table.textBehindTable}
            </span>
        </>
    );
}
