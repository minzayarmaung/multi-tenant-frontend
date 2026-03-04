/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CompanyService from "../service/CompanyService";
import CompanyTable   from "../components/CompanyTable";
import CompanyForm    from "../components/CompanyForm";
import Modal          from "../../../common/components/Modal";
import ViewDetail     from "../../../common/components/ViewDetail";
import type { CompanyResponse } from "../dto/response/CompanyResponse";
import { defaultPagination } from "../../../common/request/PaginationRequest";
import Sidebar from "../../dashboard/components/Sidebar";

type ModalMode = "create" | "edit" | "view" | null;

const CompanyPage = () => {
    const [companies,  setCompanies]  = useState<CompanyResponse[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page,       setPage]       = useState(0);
    const [loading,    setLoading]    = useState(true);
    const [modal,      setModal]      = useState<ModalMode>(null);
    const [selected,   setSelected]   = useState<CompanyResponse | null>(null);

    const fetchCompanies = async (p = 0) => {
        setLoading(true);
        try {
            const res = await CompanyService.getAll({ ...defaultPagination, page: p });
            setCompanies(res.data);
            setTotalPages(res.meta.totalPages);
        } catch {
            toast.error("Failed to load companies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCompanies(page); }, [page]);

    const handleCreate = async (data: any) => {
        await CompanyService.create(data);
        setModal(null);
        fetchCompanies(page);
    };

    const handleUpdate = async (data: any) => {
        if (!selected) return;
        await CompanyService.update(selected.id, data);
        setModal(null);
        fetchCompanies(page);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this company?")) return;
        try {
            await CompanyService.delete(id);
            toast.success("Company deleted.");
            fetchCompanies(page);
        } catch {
            toast.error("Failed to delete.");
        }
    };

    const openCreate = () => { setSelected(null); setModal("create"); };
    const openEdit   = (c: CompanyResponse) => { setSelected(c); setModal("edit"); };
    const openView   = (c: CompanyResponse) => { setSelected(c); setModal("view"); };
    const closeModal = () => { setModal(null); setSelected(null); };

    return (
        <div className="flex min-h-screen bg-slate-900">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Companies</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage all tenant companies
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500
                                   text-white text-sm font-medium px-4 py-2.5 rounded-lg
                                   transition-all"
                    >
                        <span className="text-lg leading-none">+</span>
                        Create Company
                    </button>
                </div>

                {/* Loading */}
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
                        <CompanyTable
                            companies={companies}
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
                <Modal title="Create Company" onClose={closeModal}>
                    <CompanyForm initial={null} onSubmit={handleCreate} onCancel={closeModal} />
                </Modal>
            )}

            {/* Edit Modal */}
            {modal === "edit" && selected && (
                <Modal title="Edit Company" subtitle={selected.name} onClose={closeModal}>
                    <CompanyForm initial={selected} onSubmit={handleUpdate} onCancel={closeModal} />
                </Modal>
            )}

            {/* View Modal */}
            {modal === "view" && selected && (
                <Modal title="Company Details" subtitle={`ID: ${selected.id}`} onClose={closeModal} size="lg">
                    <ViewDetail fields={[
                        { label: "Name",       value: selected.name },
                        { label: "Email",      value: selected.email },
                        { label: "Phone",      value: selected.phone },
                        { label: "Address",    value: selected.address },
                        { label: "Status",     value: selected.status },
                        { label: "Created At", value: new Date(selected.createdAt).toLocaleString() },
                    ]} />
                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
                        <button onClick={() => { setModal("edit"); }}
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

export default CompanyPage;