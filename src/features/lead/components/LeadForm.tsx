/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { LeadResponse } from "../dto/response/LeadResponse";

interface Props {
    editing:  LeadResponse | null;
    onSubmit: (data: { name: string; email: string; phone: string , description: string }) => Promise<void>;
    onCancel: () => void;
}

const LeadForm = ({ editing, onSubmit, onCancel }: Props) => {
    const [values,  setValues]  = useState({ name: "", email: "", phone: "" , description: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValues({
            name:  editing?.name  || "",
            email: editing?.email || "",
            phone: editing?.phone || "",
            description: editing?.description || ""
        });
    }, [editing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(values);
            toast.success(editing ? "Lead updated." : "Lead created.");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Request failed.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { label: "Name",  key: "name",  type: "text",  required: true  },
        { label: "Email", key: "email", type: "email", required: false },
        { label: "Phone", key: "phone", type: "text",  required: false },
        { label: "Description" , key: "description" , type: "text" , required: false}
    ] as const;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold text-base mb-5">
                {editing ? "Edit Lead" : "Create New Lead"}
            </h3>

                <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    {fields.map(({ label, key, type, required }) => (
                        // Conditional class for wide description field
                        <div key={key} className={`flex flex-col gap-1.5 ${key === 'description' ? 'sm:col-span-3' : ''}`}>
                            <label className="text-slate-300 text-sm font-medium">
                                {label}
                                {required && <span className="text-red-400 ml-1">*</span>}
                            </label>
                            <input
                                type={type}
                                value={values[key]}
                                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                                required={required}
                                className="bg-slate-700/50 border border-slate-600 text-white
                                           placeholder-slate-400 rounded-lg px-3 py-2.5 text-sm
                                           focus:outline-none focus:ring-2 focus:ring-blue-500
                                           focus:border-transparent transition-all"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60
                                   disabled:cursor-not-allowed text-white text-sm font-medium
                                   px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                Saving...
                            </>
                        ) : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300
                                   text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeadForm;