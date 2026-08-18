"use client";
import { useState } from "react";



export default function home() {
  const [newItem, setNewItem] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newStore, setNewStore] = useState("")
  const [purchases, setPurchases] = useState([
    { id: 1, item: "Rice", price: 12, store: "Giant" },
    { id: 2, item: "Milk", price: 8, store: "99 Speedmart" },
    { id: 3, item: "Rice", price: 15, store: "Cold Storage" },
    { id: 4, item: "Bread", price: 5, store: "99 Speedmart" },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    const newPurchase = {
      id: purchases.length + 1,
      item: newItem,
      price: Number(newPrice),
      store: newStore,
    };
    setPurchases([...purchases, newPurchase]);
    setNewItem("");
    setNewPrice("");
    setNewStore("");
  }


  return (
    <div>
      <h1>My purchases</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Item"
        />
        <input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          value={newStore}
          onChange={(e) => setNewStore(e.target.value)}
          placeholder="Store"
        />
        <button type="submit">Add purchases</button>
      </form>
      <ul>
        {
          purchases.map((p) =>
            <li key={p.id}>{p.item} - ${p.price} at {p.store}</li>
          )
        }
      </ul>
    </div>
  );
}
