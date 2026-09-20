import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PriceChart({ uniqueItems, selectedItem, onSelectItem, chartData }) {
    return (
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
            <select
                value={selectedItem}
                onChange={(e) => onSelectItem(e.target.value)}
                className="bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent"
            >
                <option value="" className="bg-background text-foreground">Select an item</option>
                {uniqueItems.map((item) => (
                    <option key={item} value={item} className="bg-background text-foreground">
                        {item}
                    </option>
                ))}
            </select>

            {selectedItem && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#8A94A6" />
                        <YAxis stroke="#8A94A6" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#16213E",
                                border: "1px solid rgba(244,239,225,0.1)",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#8A94A6" }}
                            itemStyle={{ color: "#E3A72F" }}
                        />
                        <Line type="linear" dataKey="price" stroke="#E3A72F" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}