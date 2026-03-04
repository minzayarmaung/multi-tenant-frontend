import type { CompanyResponse } from "../dto/response/CompanyResponse";

interface Props {
    companies: CompanyResponse[];
    onView:    (company: CompanyResponse) => void;
    onEdit:    (company: CompanyResponse) => void;
    onDelete:  (id: number) => void;
}

const CompanyTable = ({ companies, onView, onEdit, onDelete }: Props) => {
    if (companies.length === 0) {
        return (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12
                            text-center text-slate-500 text-sm">
                No companies found. Create one to get started.
            </div>
        );
    }

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-700 bg-slate-700/50">
                        {["ID", "Name", "Email", "Phone", "Address", "Status", "Actions"]
                            .map((h) => (
                                <th key={h} className="text-left text-slate-400 font-medium
                                                       px-4 py-3 text-xs uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {companies.map((c) => (
                        <tr
                            key={c.id}
                            onClick={() => onView(c)}
                            className="hover:bg-slate-700/40 transition-colors cursor-pointer"
                        >
                            <td className="px-4 py-3 text-slate-400 text-xs">{c.id}</td>
                            <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                            <td className="px-4 py-3 text-slate-300">{c.email}</td>
                            <td className="px-4 py-3 text-slate-300">{c.phone || "-"}</td>
                            <td className="px-4 py-3 text-slate-300">{c.address || "-"}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border
                                    ${c.status === "ACTIVE"
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEdit(c)}
                                            className="text-xs bg-blue-500/10 hover:bg-blue-500/20
                                                       text-blue-400 border border-blue-500/20
                                                       px-3 py-1.5 rounded-lg transition-all">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(c.id)}
                                            className="text-xs bg-red-500/10 hover:bg-red-500/20
                                                       text-red-400 border border-red-500/20
                                                       px-3 py-1.5 rounded-lg transition-all">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;