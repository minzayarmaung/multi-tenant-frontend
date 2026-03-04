import { useEffect } from "react";

interface Props {
    title:      string;
    subtitle?:  string;
    onClose:    () => void;
    children:   React.ReactNode;
    size?:      "sm" | "md" | "lg";
}

const SIZE_MAP = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
};

const Modal = ({ title, subtitle, onClose, children, size = "md" }: Props) => {

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                        flex items-center justify-center z-50 px-4">
            <div className={`bg-slate-800 border border-slate-700 rounded-xl
                             shadow-2xl w-full ${SIZE_MAP[size]} max-h-[90vh]
                             overflow-y-auto`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4
                                border-b border-slate-700">
                    <div>
                        <h3 className="text-white font-semibold text-base">{title}</h3>
                        {subtitle && (
                            <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
};

export default Modal;