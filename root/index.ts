import {types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot } from "mobx-state-tree";
import React from "react";
import { useState } from 'react';

// const [ id, setId ] = useState("");
// const [ title, setTitle ] = useState("");
// const [ description, setDescription ] = useState("");
// const [ status, setStatus ] = useState("");
const [ store, setStore ] = useState([]);

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

//getting todo from local storage
if(typeof window !== "undefined"){
    const response = localStorage.getItem("todoStore");
    if(response){
        try{
            setStore(JSON.parse(response).tasks)
        } catch (error) {
            console.log("couldn't parse from localStorage: ", error)
        }
    }
}

//created instance of TodoStore
export let todoStore = TodoStore.create({
    todos: store,
})

// saving the store in local storage 
if(typeof window !== "undefined"){
    onSnapshot(todoStore, (snapshot) => {
        localStorage.setItem("todoStore", JSON.stringify(snapshot))
    })
}

const RootModel = types.model("Root", {
    TodoStore: TodoStore
})

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type TodoModel = Instance<typeof TodoModel>;
export type TodoStore = Instance<typeof TodoStore>;
