"use client";
import { Todo, TodoFilter } from "@/components"
import { useStore } from "@/root/Provider";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { useState } from "react";

const AddTodo = observer(() => {
    // // const { newTodoStore } = useStore();
    // let filteredTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;
    const [title, setTitle] = useState(" ");

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
        console.log(e.target.value);
    }
    return (
        <form>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="title" className="text-left">
                        Title: 
                    </label>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input
                            id="name"
                            value={title}
                            onChange={(e) => handleTitle(e)}
                            placeholder="Title"
                            className="col-span-3 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="description"
                className="text-left"
              >
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              </div>
                </div>
            </div>
        </form>
    )
})

export default AddTodo;