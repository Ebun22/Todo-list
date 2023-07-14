"use client";

import { useStore } from "@/root/Provider";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';

const Todo = observer(() => {
    // const { newTodoStore } = useStore();

    return (
        <div>
           All todos
        </div>
    )
})

export default Todo;