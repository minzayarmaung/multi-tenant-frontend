import type { UserResponse } from "../dto/response/UserResponse";

interface Props {
    users:    UserResponse[];
    onView:   (user: UserResponse) => void;
    onEdit:   (user: UserResponse) => void;
    onDelete: (id: number) => void;
}

const ROLE_STYLES: Record<string, string> = {
    SYSTEM_ADMIN:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
    COMPANY_ADMIN: "bg-blue-500/10   text-blue-400   border-blue-500/20",
    USER:          "bg-slate-500/10  text-slate-400  border-slate-500/20",
};

const UserTable = ({ users, onView, onEdit, onDelete }: Props) => {
    if (users.length === 0) {
        return (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12
                            text-center text-slate-500 text-sm">
                No users found. Create one to get started.
            </div>
        );
    }

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-700 bg-slate-700/50">
                        {["ID", "Email", "Role", "Company", "Status", "Actions"].map((h) => (
                            <th key={h} className="text-left text-slate-400 font-medium
                                                   px-4 py-3 text-xs uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {users.map((u) => (
                        <tr key={u.id}
                            onClick={() => onView(u)}
                            className="hover:bg-slate-700/40 transition-colors cursor-pointer">
                            <td className="px-4 py-3 text-slate-400 text-xs">{u.id}</td>
                            <td className="px-4 py-3 text-white font-medium">{u.email}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                  border ${ROLE_STYLES[u.role] || ROLE_STYLES.USER}`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300">
                                {u.companyName || <span className="text-slate-500 italic">—</span>}
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border
                                    ${u.status === "ACTIVE"
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                                    {u.status}
                                </span>
                            </td>
                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEdit(u)}
                                            className="text-xs bg-blue-500/10 hover:bg-blue-500/20
                                                       text-blue-400 border border-blue-500/20
                                                       px-3 py-1.5 rounded-lg transition-all">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(u.id)}
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

export default UserTable;