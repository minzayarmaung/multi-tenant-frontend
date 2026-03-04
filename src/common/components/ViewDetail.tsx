interface Field {
    label: string;
    value: React.ReactNode;
}

interface Props {
    fields: Field[];
}

const ViewDetail = ({ fields }: Props) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
                <span className="text-slate-500 text-xs uppercase tracking-wider">
                    {label}
                </span>
                <span className="text-white text-sm font-medium">
                    {value || <span className="text-slate-500 italic">—</span>}
                </span>
            </div>
        ))}
    </div>
);

export default ViewDetail;