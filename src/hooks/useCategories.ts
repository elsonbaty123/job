import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('projects')
        .select('category');
      
      if (!error && data) {
        const uniqueCategories = Array.from(new Set(data.map(d => d.category).filter(Boolean)));
        setCategories(uniqueCategories);
      }
    }
    fetchCategories();
  }, []);

  return categories;
}
