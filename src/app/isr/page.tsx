import TodoList from "@/components/organisms/todo/TodoList";
import { todosService } from "@/services/todosService";
import { SearchProps } from "@/types/searchparams";
import { Todo } from "@/types/todo";
import { notFound } from "next/navigation";

export const revalidate = 60;

const DEFAULT_LIMIT = 10



async function getTodos(start: number, limit: number): Promise<Todo[]> {
  try {
    const response = await todosService.getTodos(start, limit, revalidate)
    return response
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}


async function getTotalTodos(): Promise<number> {
  try {
    const response = await todosService.getTotalTodos(revalidate)

    

    return response.length
  } catch (error) {
    console.error('Error fetching todos:', error);
    return 0;
  }
}

export default async function TodosPageISR({searchParams}:SearchProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page || '1', 10);
  const limit = parseInt(resolvedSearchParams?.limit || DEFAULT_LIMIT.toString(), 10);
  const start = (currentPage - 1) * limit;

  const [todos, totalTodos] = await Promise.all([
      getTodos(start, limit),
      getTotalTodos()
    ]);
  
    const totalPages = Math.ceil(totalTodos / limit);
    if (currentPage > totalPages || currentPage < 1) {
      notFound();
    }
  return (
    <div className="flex flex-col items-center justify-center p-5 lg:px-10 lg:py-20 w-full">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold">Todo List Test EZV (ISR)</h1>
        <p className="text-md text-slate-600">RTK Query with ISR</p>
      </div>
      <TodoList initialTodos={todos} />
    </div>
  );
}
