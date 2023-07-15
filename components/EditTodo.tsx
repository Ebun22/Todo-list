"use client";
import { AddTodo, Todo, TodoFilter } from "@/components"
import { useStore } from "@/root/Provider";
// import { newTodoStore, TodoStore } from '@/root/index'
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import Select, { Option } from "./ui/Select";
import { Dialog, DialogContent, DialogFooter } from "./ui/Dialog";
import { Button } from "./ui/Button";

interface editProps {
    id: string,
    title: string,
    description: string,
    status: string,
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const options: Option[] = [
    { value: "default_option", label: "Select an option" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
];

const EditTodo = observer(({id, title, description, status, open, setOpen }: editProps) => {
  
    console.log(id)
    let editedTodo
    if(typeof window !== "undefined"){
        const response: any = localStorage.getItem("editedTodo");
        if(response){
            try{
              editedTodo = JSON.parse(response)
            } catch (error) {
                console.log("couldn't parse from localStorage: ", error)
            }
        }
    }

    const [newTitle, setNewTitle] = useState<string>(editedTodo.title);
    const [newDescription, setNewDescription] = useState<string>(editedTodo.description);
    const [newStatus, setNewStatus] = useState<string>(editedTodo.status);
    const [Id, setId] = useState<string>(editedTodo.id);
    const [errMsg, setErrMsg] = useState<string>();
 
   
     

  
    const handleEditTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const newTodo = {
            id: Id,
            title: newTitle,
            description: newDescription,
            status: newStatus,
        };

        newTodoStore.editTodo(Id, newTodo)
        setOpen(!open);

      
    }    

    const handleTitle = (e: any) => {
        setNewTitle(e.target.value)
        console.log(e.target.value);
    }
    const handleDescription = (e: any) => {
        setNewDescription(e.target.value)
        console.log(e.target.value);
    }
    const handleStatus = (e: any) => {
        setNewStatus(e) 
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
                    value={newTitle}
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
                    value={newDescription}
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
                    selectedOption={newStatus}
                    handelChange={(e: any) => handleStatus(e)}
                    options={options}
                />
            </div>
            <DialogFooter>
                <Button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleEditTask(e)}>Save Task</Button>
            </DialogFooter>
        </div>
    </form>
    )
})

export default EditTodo;