"use client";
import { Todo, TodoFilter } from "@/components"
import { useStore } from "@/root/Provider";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { useState } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import Select from "react-tailwindcss-select";

const options = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
];

const AddTodo = observer(() => {
    // // const { newTodoStore } = useStore();
    // let filteredTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(null);


    const handleTitle = (e: any) => {
        setTitle(e.target.value)
        console.log(e.target.value);
    }
    const handleDescription = (e: any) => {
        setDescription(e.target.value)
        console.log(e.target.value);
    }
    const handleStatus = (value: any) => {
        setStatus(value)
        console.log(value);
    }
    return (
        <form>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="title" className="text-left">
                        Title:
                    </Label>
                    <Input
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
                        onChange={(e) => handleDescription(e)}
                        placeholder="Description"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                        htmlFor="description"
                        className="text-left"
                    >
                        Status
                    </Label>
                    <Select
                        value={status}
                        onChange={handleStatus}
                        options={options} 
                        primaryColor={"sky"}                    />
                </div>
            </div>
        </form>
    )
})

export default AddTodo;