"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function usePurchases() {
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

    async function addPurchase({ item, price, store }) {
        const { data, error } = await supabase
            .from("purchases")
            .insert([{ item, price, store }])
            .select();

        if (error) {
            console.error("Error adding purchases:", error.message);
            return;
        }
        setPurchases((prev) => [data[0], ...prev]);
    }

    async function deletePurchase(id) {
        const { error } = await supabase
            .from("purchases")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting purchases:", error.message);
            return;
        }

        setPurchases((prev) => prev.filter((p) => p.id !== id));
    }

    return { purchases, addPurchase, deletePurchase };
}