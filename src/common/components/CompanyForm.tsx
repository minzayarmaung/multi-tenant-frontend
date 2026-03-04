/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { CompanyResponse } from "../../features/company/dto/response/CompanyResponse";

interface Props {
    initial?: CompanyResponse | null;
    onSubmit: (data: { name: string; email: string; phone: string; address: string }) => Promise<void>;
    onCancel: () => void;
}

const fields = [
    { label: "Company Name", key: "name",    type: "text",  required: true  },
    { label: "Email",        key: "email",   type: "email", required: true  },
    { label: "Phone",        key: "phone",   type: "text",  required: false },
    { label: "Address",      key: "address", type: "text",  required: false },
] as const;

const CompanyForm = ({ initial, onSubmit, onCancel }: Props) => {
    const [values,  setValues]  = useState({ name: "", email: "", phone: "", address: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValues({
            name:    initial?.name    || "",
            email:   initial?.email   || "",
            phone:   initial?.phone   || "",
            address: initial?.address || "",
        });
    }, [initial]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(values);
            toast.success(initial ? "Company updated." : "Company created.");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Request failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {fields.map(({ label, key, type, required }) => (
                    <div key={key} className="flex flex-col gap-1.5">
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

            <div className="flex items-center gap-3 pt-2 border-t border-slate-700">
                <button
                    type="submit" disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60
                               text-white text-sm font-medium px-5 py-2.5 rounded-lg
                               transition-all flex items-center gap-2"
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
                    type="button" onClick={onCancel}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-300
                               text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CompanyForm;