"use client";
import { useState } from "react";
import { usePurchases } from "@/lib/usePurchases";
import StatsPanel from "@/components/StatsPanel";
import PurchaseForm from "@/components/PurchaseForm";
import PurchaseList from "@/components/PurchaseList";
import PriceChart from "@/components/PriceChart";

export default function home() {
  const { purchases, addPurchase, deletePurchase } = usePurchases();
  const [selectedItem, setSelectedItem] = useState("");

  const totalSpend = purchases.reduce((acc, item) => acc + item.price, 0);
  const averagePrice = purchases.length === 0 ? 0 : totalSpend / purchases.length;
  const averagePriceDisplay = averagePrice === 0 ? "No Purchases yet" : `$${averagePrice.toFixed(2)}`;

  const cheapestStorePerItem = purchases.reduce((obj, purchase) => {
    if (!obj[purchase.item] || purchase.price < obj[purchase.item].price) {
      obj[purchase.item] = { price: purchase.price, store: purchase.store };
    }
    return obj;
  }, {});

  const uniqueItems = [...new Set(purchases.map((p) => p.item))];
  const filteredPurchases = purchases.filter((p) => p.item === selectedItem);
  const chartData = filteredPurchases
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((p) => ({
      date: new Date(p.created_at).toLocaleDateString(),
      price: p.price,
    }));

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <h1 className="font-mono text-2xl font-bold text-accent mb-8">
        My Purchases
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <StatsPanel
            totalSpend={totalSpend}
            averagePriceDisplay={averagePriceDisplay}
            cheapestStorePerItem={cheapestStorePerItem}
          />
          <PriceChart
            uniqueItems={uniqueItems}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            chartData={chartData}
          />
        </div>

        <div className="flex flex-col gap-6">
          <PurchaseForm onSubmit={addPurchase} />
          <PurchaseList purchases={purchases} onDelete={deletePurchase} />
        </div>
      </div>
    </div>
  );
}