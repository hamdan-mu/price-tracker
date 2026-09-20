export default function StatsPanel({ totalSpend, averagePriceDisplay, cheapestStorePerItem }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
                <p className="text-muted text-sm uppercase tracking-wide mb-1">Total spent</p>
                <p className="font-mono text-3xl font-bold text-foreground">${totalSpend.toFixed(2)}</p>
            </div>

            <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
                <p className="text-muted text-sm uppercase tracking-wide mb-1">Average Price</p>
                <p className="font-mono text-3xl font-bold text-foreground">{averagePriceDisplay}</p>
            </div>

            <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
                <p className="text-muted text-sm uppercase tracking-wide mb-1">Cheapest Store per Item</p>
                <ul>
                    {Object.entries(cheapestStorePerItem).map(([item, info]) => (
                        <li key={item}>
                            {item}: cheapest at {info.store} (${info.price})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}