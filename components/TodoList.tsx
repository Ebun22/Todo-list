"use client";
import { AddTodo, Todo, TodoFilter } from "@/components"
import { useStore } from "@/root/Provider";
import { useEffect, useState } from "react";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { useSearchParams } from "next/navigation";

const TodoList = observer(() => {

    const searchParams = useSearchParams();
    const filter = searchParams.get("todo");

    let AllTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;

    if (filter === "Pending") {
        AllTodos = newTodoStore.todos.filter(todo => todo.status === "pending")
    } else if (filter === "in_progress") {
        AllTodos = newTodoStore.todos.filter(todo => todo.status === "in_progress")
    } else if (filter === "completed") {
        AllTodos = newTodoStore.todos.filter(todo => todo.status === "completed")
    }


    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const showAdd = () => {
        setAddOpen(true)
    }
    return (
        <div className="flex flex-col sm:flex-col gap-4 w-3/4 sm:items-center sm:justify-between mb-8 sm:mb-14">
       
            <TodoFilter />
            
            <Dialog
                open={addOpen}
                onOpenChange={setAddOpen}
            >
                <DialogTrigger asChild>
                    <Button className="bg-neutral-50 w-1/4 py-4 mt-3 drop-shadow-md">
                        +
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <AddTodo
                        open={addOpen}
                        setOpen={setAddOpen}
                    />
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-2 px-4 py-5 w-3/4 max-h-[600px] overflow-auto">
                {AllTodos.map((todo: any) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                        open={editOpen}
                        setOpen={setEditOpen}
                    />
                ))}
            </div>
   
        </div>
    )
})

export default TodoList;