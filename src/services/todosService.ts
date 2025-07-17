import { BASE_URL } from "@/constants/constants";
import { Todo } from "@/types/todo";

export const todosService = {
  getTodos: async (
    start?: number,
    limit?: number,
    revalidate?: number
  ): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (start) {
      params.append("_start", start.toString());
    }
    if (limit) {
      params.append("_limit", limit.toString());
    }

    const fetchOptions: RequestInit | NextFetchRequestConfig =
      revalidate !== undefined
        ? { next: { revalidate }, cache:'force-cache' }
        : { cache: "no-store" };
    

    const res = await fetch(`${BASE_URL}/todos?${params}`, {
      method: "GET",
      ...fetchOptions,
    });
    if (!res.ok) {
      throw new Error(`failed to fetch todos`);
    }
    const resJson = await res.json();
    return resJson;
  },
  getTotalTodos: async (revalidate?: number) => {
    const fetchOptions: RequestInit | NextFetchRequestConfig =
      revalidate !== undefined
        ? { next: { revalidate }, cache:'force-cache' }
        : { cache: "no-store" };
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      ...fetchOptions,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch todos`);
    }
    const resJson = await res.json();
    return resJson;
  },
};
