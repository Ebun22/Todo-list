import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TaskFilterProps {}

const TodoFilter = ({}: TaskFilterProps) => {
  const searchParams = useSearchParams();
  const todoFilter: string | null = searchParams.get("todo");
console.log(todoFilter)
  return (
    <div className="mb-4">
      <ul className="flex flex-wrap gap-1 drop-shadow-lg bg-neutral-50 sm:gap-4 justify-center text-sm sm:text-base font-medium text-center text-slate-500 border-b border-slate-200 ">
        <Link
          href="/"
          className={`${
            todoFilter === null && "bg-neutral-950 text-white "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          All
        </Link>

        <Link
          href="/?todo=pending"
          className={`${
            todoFilter === "pending" && "bg-neutral-950 text-white "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          Pending
        </Link>

        <Link
          href="/?todo=in_progress"
          className={`${
            todoFilter === "in_progress" && "bg-neutral-950 text-white "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          In Progress
        </Link>

        <Link
          href="/?todo=completed"
          className={`${
            todoFilter === "completed" && "bg-neutral-950 text-white "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          Completed
        </Link>
      </ul>
    </div>
  );
};

export default TodoFilter;