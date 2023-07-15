"use client";

import { useStore } from "@/root/Provider";
import { types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot, getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import { Dispatch, SetStateAction, useState } from "react";
import EditTodo from "./EditTodo";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import Checkbox from "./ui/CheckBox";

interface props {
    id: string;
    title: string;
    description: string;
    status: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Todo = observer(({ id, title, description, status, open, setOpen }: props) => {

    const [Id, setId] = useState<string>(id)
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [newStatus, setNewStatus] = useState<string>(status);
    const [isChecked, setIsChecked] = useState(false)


    const modifiedTitle = title.charAt(0).toUpperCase() + title.slice(1)

    const modifiedDescription = description.charAt(0).toUpperCase() + description.slice(1).slice(0, 100) + "..." + <p>see more</p>;

    const handleEdit = () => {

        const current = getSnapshot(newTodoStore)
        const todo: any = current.todos.find((todo) => todo.id === id);

        setNewTitle(todo.title)
        setNewDescription(todo.description)
        setNewStatus(todo.status)
        setId(todo.id)

        if (typeof window !== "undefined") {
            localStorage.setItem("editedTodo", JSON.stringify(todo))
        }
    }

    const handleDeleteTask = () => {
        newTodoStore.deleteTodo(id)
    }

    const checkHandler = (e: any) => {
        setIsChecked(!isChecked)
        const Id = e.target.id
        // console.log(e.target.checked)
        const todo: any = newTodoStore.todos.find((todo) => todo.id === Id)
        setNewStatus("completed")
        const newTodo = {
            id: todo.id,
            title: todo.title, 
            description: todo.description, 
            status: newStatus
        }
        newTodoStore.editTodo(Id, newTodo)
       
    }

    return (
        <>
            <div className="relative flex flex-row flex flex-row bg-white p-4 rounded shadow-lg mt-1 border-b border-slate-300 max-w-4xl">
                <div className="flex flex-row text-left gap-4 w-9/12">
                    <div className="mt-1">
                        <Checkbox
                            id = {Id}
                            isChecked={isChecked }
                            checkHandler={(e) => checkHandler(e) }
                        />
                    </div>
                    <div className="flex flex-col gap-2items-center justify-between text-left space-y-2 sm:text-left">
                        <h3 className="text-lg font-medium">{modifiedTitle}</h3>
                        <p className="text-sm text-gray-600">{modifiedDescription}</p>

                        <div className="mt-10">
                            <button className={
                                status === "pending"
                                    ?
                                    "bg-red-200 mt-8 text-xs p-1 px-2 rounded-md text-red-800"
                                    :
                                    status === "in_progress"
                                        ?
                                        "bg-yellow-200 mt-8 text-xs p-1 px-2 rounded-md  text-amber-800"
                                        :
                                        "bg-green-200 mt-8 text-xs p-1 px-2 rounded-md  text-lime-700"
                            }
                            >
                                {status === "pending"
                                    ? "Pending"
                                    : status === "in_progress"
                                        ? "In Progress"
                                        : "Completed"}
                            </button>
                        </div>

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


                    <Button onClick={() => handleDeleteTask()}><AiOutlineDelete className="text-rose-600" /></Button>

                </div>
            </div>
        </>
    )
})

export default Todo;