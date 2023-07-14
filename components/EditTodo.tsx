"use client";
import {AddTodo, Todo, TodoFilter} from "@/components"
import { useStore } from "@/root/Provider";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { newTodoStore, TodoStore, TodoModel } from '@/root/index';

const EditTodo = observer(() => {
    // const { newTodoStore } = useStore();
    let filteredTodos: Array<Instance<typeof TodoModel>> = newTodoStore.todos;

    return (
        <div>
            <div>
                <h2>
                    All Todos
                </h2>
                <AddTodo />
            </div>

            <TodoFilter />

            <div>
            {filteredTodos.map((todo: any) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        status={todo.status}
                    />
            ))}
            </div>
        </div>
    )
})

export default EditTodo;