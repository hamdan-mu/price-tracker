"use client";
import { useState } from "react";

export default function PurchaseForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newStore, setNewStore] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({ item: newItem, price: newPrice, store: newStore });
        setNewItem("");
        setNewPrice("");
        setNewStore("");
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