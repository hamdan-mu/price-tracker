"use client";
import { use, useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";



export default function home() {
  const [newItem, setNewItem] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newStore, setNewStore] = useState("")
  const [purchases, setPurchases] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

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
  const cheapestStorePerItem = purchases.reduce((obj, purchase) => {
    if (!obj[purchase.item] || purchase.price < obj[purchase.item].price) {
      obj[purchase.item] = { price: purchase.price, store: purchase.store };
    }
    return obj;
  }, {})
  const uniqueItems = [...new Set(purchases.map(p => p.item))];
  const filteredPurchases = purchases.filter((p) => p.item === selectedItem);
  const chartData = filteredPurchases
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((p) => ({
      date: new Date(p.created_at).toLocaleDateString(),
      price: p.price,
    }));

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
    <div className="min-h-screen p-6 lg:p-10">
      <h1 className="font-mono text-2xl font-bold text-accent mb-8">
        My Purchases
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
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
                {
                  Object.entries(cheapestStorePerItem).map(([item, info]) => (
                    <li key={item}>{item}: cheapest at {info.store} (${info.price})</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent"
            >
              <option value="" className="bg-background text-foreground">Select an item</option>
              {uniqueItems.map((item) => (
                <option key={item} value={item} className="bg-background text-foreground">{item}</option>
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
        </div>

        <div className="flex flex-col gap-6">
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
              <button className="bg-accent text-background font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition" type="submit">Add purchases</button>
            </form>
          </div>
          <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
            <ul>
              {
                purchases.map((p) =>
                  <li className="flex justify-between items-center border-b border-foreground/10 py-2" key={p.id}>
                    <span>{p.item} - ${p.price} at {p.store}</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-danger text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
