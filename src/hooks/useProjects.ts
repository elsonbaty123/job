import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/components/ProjectDetailModal";

export function useProjects(category: string, searchQuery: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 20;

  const fetchProjects = useCallback(async (reset = false) => {
    try {
      if (reset) setLoading(true);
      
      let query = supabase
        .from("projects")
        .select(`
          *,
          project_images (
            image_url,
            display_order
          )
        `)
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (category !== "الكل") {
        query = query.eq("category", category);
      }
      
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const from = (reset ? 0 : page) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) throw error;

      // Type assertion and sorting images
      const formattedData = (data as Project[]).map(p => {
        const sortedImages = p.project_images?.sort((a, b) => a.display_order - b.display_order) || [];
        return { ...p, project_images: sortedImages };
      }) as Project[];

      setProjects(prev => reset ? formattedData : [...prev, ...formattedData]);
      setHasMore(formattedData.length === PAGE_SIZE);
      if (!reset) setPage(p => p + 1);
      else setPage(1);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, page]);

  // Reset and fetch on filter changes
  useEffect(() => {
    fetchProjects(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchQuery]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProjects(false);
    }
  };

  return { projects, loading, hasMore, loadMore };
}
