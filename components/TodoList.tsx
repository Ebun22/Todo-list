"use client";
import { AddTodo, Todo, TodoFilter } from "@/components"
import { useStore } from "@/root/Provider";
import { useEffect, useState } from "react";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

const TodoList = observer(() => {
    // const { newTodoStore } = useStore();
    let AllTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;
    
    const [open, setOpen] = useState(false);

    const showAdd = () => {
        setOpen(!open)
    }
    return (
        <div className="flex flex-col sm:flex-col gap-4 w-3/4 sm:items-center sm:justify-between mb-8 sm:mb-14">
            <div>
                <h2 className="text-2xl font-semibold">
                    All Todos
                </h2>
            </div>

            {/* <TodoFilter /> */}
            <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                +
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
            <AddTodo 
              open={open}
              setOpen={setOpen}
            />
            </DialogContent>
          </Dialog>
            <div>
                
            </div>
            <div className="flex flex-col gap-2 px-4 py-5 w-3/4 max-h-[600px] overflow-auto">
                {AllTodos.map((todo: any) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                    />
                ))}
            </div>
            {/* <AddTodo /> */}
        </div>
    )
})

export default TodoList;