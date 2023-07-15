"use client";

import { useStore } from "@/root/Provider";
import {types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot, getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { Dispatch, SetStateAction, useState } from "react";
import EditTodo from "./EditTodo";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

interface props {
    id: string;
    title: string;
    description: string;
    status: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Todo = observer(({ id, title, description, status, open, setOpen }: props) => {
    // const { newTodoStore } = useStore();
    const [Id, setId] = useState<string>(id)
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [newStatus, setNewStatus] = useState<string>(status);
    
 const handleEdit = () => {
            console.log(id)
            const current = getSnapshot(newTodoStore)
            const todo: any = current.todos.find((todo) => todo.id === id);
            console.log(todo)
           setNewTitle(todo.title)
           setNewDescription(todo.descriptione)
           setNewStatus(todo.status)

           if(typeof window !== "undefined"){
                localStorage.setItem("editedTodo", JSON.stringify(todo))
            }
        }
        
            console.log(newTitle)

    console.log(title)
    const modifiedDescription =
        description.charAt(0).toUpperCase() +
        description.slice(1).slice(0, 100) +
        "...";

    return (
        <>
            <div className="relative flex flex-row flex flex-row bg-white p-4 rounded shadow-lg mt-1 border-b border-slate-300 max-w-4xl">
                <div className="flex flex-row text-left gap-4 w-9/12">
                    <div className="mt-1">
                        <input
                            type="checkbox"
                            className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2items-center justify-between text-left space-y-2 sm:text-left">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <p className="text-sm text-gray-600">{modifiedDescription}</p>

                        {/* 
                    <Badge>
                        {status}
                    </Badge> */}
                    </div>
                </div>

                <div className="w-40  flex flex-row justify-end">
                    <Dialog
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <DialogTrigger asChild>
                        <Button onClick={handleEdit} className="mr-6"><AiOutlineEdit /></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                            <EditTodo
                                id={Id}
                                title={newTitle}
                                description={newDescription}
                                status={newStatus}
                                open={open}
                                setOpen={setOpen}
                            />
                        </DialogContent>
                    </Dialog>
                 

                    <Button><AiOutlineDelete className="text-rose-600" /></Button>

                </div>
            </div>
        </>
    )
})

export default Todo;