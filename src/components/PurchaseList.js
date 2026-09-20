export default function PurchaseList({ purchases, onDelete }) {
    return (
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
            <ul>
                {purchases.map((p) => (
                    <li
                        className="flex justify-between items-center border-b border-foreground/10 py-2"
                        key={p.id}
                    >
                        <span>
                            {p.item} - ${p.price} at {p.store}
                        </span>
                        <button
                            type="button"
                            onClick={() => onDelete(p.id)}
                            className="text-danger text-sm hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}