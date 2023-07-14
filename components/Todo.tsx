"use client";

import { useStore } from "@/root/Provider";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { AiOutlineDelete } from 'react-icons/ai';
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';
import CheckBox from "./ui/CheckBox";
import EditTodo from "./EditTodo";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

interface props {
    id: string;
    title: string;
    description: string;
    status: string;
}

const Todo = observer(({ id, title, description, status }: props) => {
    // const { newTodoStore } = useStore();

    return (
        <>
            <div className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        {<CheckBox />}
                    </div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-sm text-gray-600">{description = description.charAt(0).toUpperCase() + description.slice(1).slice(0, 100) + "..."}</p>
                    <div>
                        <div>
                            <EditTodo />
                        </div>
                        <div>
                            <Button><AiOutlineDelete /></Button>
                        </div>
                    </div>

                    <Badge>
                        {status}
                    </Badge>
                </div>
            </div>
        </>
    )
})

export default Todo;