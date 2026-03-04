/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../security/hooks/useAuth";
import { Role } from "../../../data/enums/Role";
import UserService from "../service/UserService";
import UserForm    from "../components/UserForm";
import UserTable   from "../components/UserTable";
import Modal       from "../../../common/components/Modal";
import ViewDetail  from "../../../common/components/ViewDetail";
import type { UserResponse } from "../dto/response/UserResponse";
import { defaultPagination } from "../../../common/request/PaginationRequest";
import Sidebar from "../../dashboard/components/Sidebar";

type ModalMode = "create" | "edit" | "view" | null;

const UserPage = () => {
    const { user }                    = useAuth();
    const [users,      setUsers]      = useState<UserResponse[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page,       setPage]       = useState(0);
    const [loading,    setLoading]    = useState(true);
    const [modal,      setModal]      = useState<ModalMode>(null);
    const [selected,   setSelected]   = useState<UserResponse | null>(null);

    const isSystemAdmin = user?.role === Role.SYSTEM_ADMIN;

    const fetchUsers = async (p = 0) => {
        setLoading(true);
        try {
            const res = isSystemAdmin
                ? await UserService.getAll({ ...defaultPagination, page: p })
                : await UserService.getCompanyUsers({ ...defaultPagination, page: p });
            setUsers(res.data);
            setTotalPages(res.meta.totalPages);
        } catch {
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(page); }, [page]);

    const handleSubmit = async (data: any) => {
        if (selected && modal === "edit") {
            await UserService.update(selected.id, {
                name: data.name,
                email: data.email,
                password: data.password || undefined,
            });
        } else if (isSystemAdmin) {
            await UserService.createCompanyAdmin({
                name: data.name,
                email: data.email,
                password: data.password,
                companyId: data.companyId!,
            });
        } else {
            await UserService.createMember({
                name: data.name,
                email: data.email,
                password: data.password,
            });
        }
        setModal(null);
        fetchUsers(page);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await UserService.delete(id);
            toast.success("User deleted.");
            fetchUsers(page);
        } catch {
            toast.error("Failed to delete.");
        }
    };

    const openCreate = () => { setSelected(null); setModal("create"); };
    const openEdit   = (u: UserResponse) => { setSelected(u); setModal("edit"); };
    const openView   = (u: UserResponse) => { setSelected(u); setModal("view"); };
    const closeModal = () => { setModal(null); setSelected(null); };

    return (
        <div className="flex min-h-screen bg-slate-900">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Users</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {isSystemAdmin
                                ? "Manage all users across companies"
                                : "Manage members in your company"}
                        </p>
                    </div>
                    <button onClick={openCreate}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500
                                       text-white text-sm font-medium px-4 py-2.5 rounded-lg
                                       transition-all">
                        <span className="text-lg leading-none">+</span>
                        {isSystemAdmin ? "Create Admin" : "Create Member"}
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center gap-3 text-slate-400 py-12 justify-center">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                    stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Loading...
                    </div>
                ) : (
                    <>
                        <UserTable
                            users={users}
                            onView={openView}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                        />
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <p className="text-slate-400 text-sm">
                                    Page <span className="text-white">{page + 1}</span> of{" "}
                                    <span className="text-white">{totalPages}</span>
                                </p>
                                <div className="flex gap-2">
                                    <button disabled={page === 0}
                                            onClick={() => setPage(p => p - 1)}
                                            className="px-3 py-2 rounded-lg text-sm bg-slate-800
                                                       border border-slate-700 text-slate-300
                                                       hover:bg-slate-700 disabled:opacity-40
                                                       disabled:cursor-not-allowed transition-all">
                                        ← Prev
                                    </button>
                                    <button disabled={page + 1 >= totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="px-3 py-2 rounded-lg text-sm bg-slate-800
                                                       border border-slate-700 text-slate-300
                                                       hover:bg-slate-700 disabled:opacity-40
                                                       disabled:cursor-not-allowed transition-all">
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Create Modal */}
            {modal === "create" && (
                <Modal title={isSystemAdmin ? "Create Company Admin" : "Create Member"}
                       onClose={closeModal}>
                    <UserForm editing={null} isSystemAdmin={isSystemAdmin}
                              onSubmit={handleSubmit} onCancel={closeModal} />
                </Modal>
            )}

            {/* Edit Modal */}
            {modal === "edit" && selected && (
                <Modal title="Edit User" subtitle={selected.email} onClose={closeModal}>
                    <UserForm editing={selected} isSystemAdmin={isSystemAdmin}
                              onSubmit={handleSubmit} onCancel={closeModal} />
                </Modal>
            )}

            {/* View Modal */}
            {modal === "view" && selected && (
                <Modal title="User Details" subtitle={`ID: ${selected.id}`} onClose={closeModal} size="lg">
                    <ViewDetail fields={[
                        { label: "Email",      value: selected.email },
                        { label: "Role",       value: selected.role },
                        { label: "Company",    value: selected.companyName },
                        { label: "Status",     value: selected.status },
                        { label: "Created At", value: new Date(selected.createdAt).toLocaleString() },
                    ]} />
                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
                        <button onClick={() => setModal("edit")}
                                className="bg-blue-600 hover:bg-blue-500 text-white text-sm
                                           font-medium px-4 py-2 rounded-lg transition-all">
                            Edit
                        </button>
                        <button onClick={closeModal}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-300
                                           text-sm font-medium px-4 py-2 rounded-lg transition-all">
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UserPage;