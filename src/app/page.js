"use client";
import { use, useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";



export default function home() {
  const [newItem, setNewItem] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newStore, setNewStore] = useState("")
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchPurchases() {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error.message, error.details, error.hint);
      } else {
        setPurchases(data);
      }
    }

    fetchPurchases();
  }, []);

  const totalSpend = purchases.reduce((acc, item) => acc + item.price, 0);
  const averagePrice = purchases.length === 0 ? 0 : totalSpend / purchases.length;
  const averagePriceDisplay = averagePrice === 0 ? "No Purchases yet" : `$${averagePrice.toFixed(2)}`;

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("purchases")
      .insert([
        {
          item: newItem,
          price: newPrice,
          store: newStore,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding purchases:", error.message);
      return;
    }

    setPurchases([data[0], ...purchases]);
    setNewItem("");
    setNewPrice("");
    setNewStore("");
  }

  async function handleDelete(id) {
    const { error } = await supabase
      .from("purchases")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting purchases:", error.message);
      return;
    }

    setPurchases(purchases.filter(item => item.id !== id));
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
            <li key={p.id}>{p.item} - ${p.price} at {p.store} <button type="button" onClick={() => handleDelete(p.id)}>Delete Purchase</button></li>
          )
        }
      </ul>
      <p>Total spent: ${totalSpend.toFixed(2)}</p>
      <p>Average Price: {averagePriceDisplay}</p>
    </div>
  );
}
