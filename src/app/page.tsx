import { SearchProps } from "@/types/searchparams";
import TodosPageISR from "./isr/page";



export default function Home({searchParams}:SearchProps) {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <TodosPageISR searchParams={searchParams}/>
    </div>
  );
}
