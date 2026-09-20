"use client";
import { useState } from "react";
import { VALID_UNITS } from "@/lib/units";

export default function PurchaseForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newStore, setNewStore] = useState("");
    const [newBrand, setNewBrand] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newUnit, setNewUnit] = useState("");
    const [newOriginalPrice, setNewOriginalPrice] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            item: newItem,
            price: newPrice,
            store: newStore,
            brand: newBrand,
            quantity: newQuantity,
            unit: newUnit,
            original_price: newOriginalPrice
        });
        setNewItem("");
        setNewPrice("");
        setNewStore("");
        setNewBrand("");
        setNewQuantity("");
        setNewUnit("");
        setNewOriginalPrice("");
    }

    return (
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Item"
                />
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newStore}
                    onChange={(e) => setNewStore(e.target.value)}
                    placeholder="Store"
                />
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Brand"
                />
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="Quantity"
                />
                <select
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                >
                    <option value="" className="bg-background text-foreground">Select a Unit</option>
                    {VALID_UNITS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                </select>
                <input
                    className="bg-background border border-foreground/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    placeholder="Original Price for Discounted Items, leave blank if no discount"
                />
                <button
                    className="bg-accent text-background font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition"
                    type="submit"
                >
                    Add purchases
                </button>
            </form>
        </div>
    );
}