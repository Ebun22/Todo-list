"use client";

import {types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot, getSnapshot } from "mobx-state-tree";
import React from "react";
import { createContext, useContext } from "react";


export const TodoModel = types.model("Todo", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
});

export const TodoStore = types.model("TodoStore", {
    todos: types.optional(types.array(TodoModel), [])
})
.actions((self) => {
    return {
        addTodo(todo: SnapshotIn<typeof TodoModel> | Instance<typeof TodoModel>)
        {

            applySnapshot(self, {...self, todos: [...self.todos, todo]})
            // console.log(todo)
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
let store: any = [];
if(typeof window !== "undefined"){
    const response: any = localStorage.getItem("todoStore");
    console.log(response)
    if(response){
        try{
            console.log(JSON.parse(response).todos)
            store = JSON.parse(response).todos
        } catch (error) {
            console.log("couldn't parse from localStorage: ", error)
        }
    }
}

//created instance of TodoStore
export let newTodoStore = TodoStore.create({
    todos: store,
})
console.log(newTodoStore.todos)
//updating the value of todoStore
if (typeof window !== "undefined") {
    const initialSnapshot = getSnapshot(newTodoStore);
    console.log(initialSnapshot)
    applySnapshot(newTodoStore, initialSnapshot);
  }

// saving the store in local storage 
if(typeof window !== "undefined"){
    onSnapshot(newTodoStore, (snapshot) => {
        localStorage.setItem("todoStore", JSON.stringify(snapshot))
    })
}





// React.Provider<null | Instance<typeof TodoStore>> = RootStoreContext.Provider;


