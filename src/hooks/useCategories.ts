import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setCategories(data.map(d => d.name));
      }
    }
    fetchCategories();
  }, []);

  return categories;
}
