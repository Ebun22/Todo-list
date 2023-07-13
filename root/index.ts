import {types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot } from "mobx-state-tree";
import React from "react";
import { useState } from 'react';

const [ id, setId ] = useState("");
const [ title, setTitle ] = useState("");
const [ description, setDescription ] = useState("");
const [ status, setStatus ] = useState("");
const [ todoStore, setTodoStore ] = useState([]);

const TodoModel = types.model("Todo", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
});

const TodoStore = types.model("TodoStore", {
    todos: types.optional(types.array(TodoModel), [])
})
.actions((self) => {
    return {
        addTodo(todo: SnapshotIn<typeof TodoModel> | Instance<typeof TodoModel>)
        {

            applySnapshot(self, {...self, todos: [todo, ...self.todos]})

        },
        editTodo(id: string, editedTodo: {title: string; description: string; status: string }){
           
            const todo = self.todos.find((todo) => todo.id === id);
            if(todo){
                applySnapshot(todo, {
                    ...todo,
                    title: editedTodo.title,
                    description: editedTodo.description,
                    status: editedTodo.status
                })
            }

        },
        deleteTodo(id:string){
            const todo = self.todos.find((todo) => todo.id === id);
            if (todo){
                destroy(todo);
            }
        }
    }
});

const RootModel = types.model("Root", {
    todo: TodoModel
})

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type TodoModel = Instance<typeof TodoModel>;
export type TodoStore = Instance<typeof TodoStore>;
