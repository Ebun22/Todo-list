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
import Select, { Option } from "./ui/Select";
import { Dialog, DialogContent, DialogFooter } from "./ui/Dialog";
import { Button } from "./ui/Button";

const options: Option[] = [
    { value: "default_option", label: "Select an option" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
];

const AddTodo = observer(() => {
    const initial = options.find((value) => value.value);
    // // const { newTodoStore } = useStore();
    // let filteredTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<Option | null>(options[0]);
    const [errMsg, setErrMsg] = useState<string>();

    const handleAddTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const newTodo = {
            id: Date.now().toString(),
            title,
            description,
            status: status?.value ?? " ",
        };

        newTodoStore.addTodo(newTodo)

        console.log(newTodoStore)
    }    

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
        console.log(e.target.value);
    }
    const handleDescription = (e: any) => {
        setDescription(e.target.value)
        console.log(e.target.value);
    }
    const handleStatus = (e: any) => {
        setStatus(e)
        console.log(e);
    }
    return (
        //  <DialogContent>
        //  <Dialog>
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
                        selectedOption={status}
                        handelChange={(e: any) => handleStatus(e)}
                        options={options}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAddTask(e)}>Save Task</Button>
                </DialogFooter>
            </div>
        </form>
        
    )
})

export default AddTodo;