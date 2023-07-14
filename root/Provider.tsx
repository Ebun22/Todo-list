"use client"
import {types, Instance, SnapshotIn, onSnapshot, destroy, applySnapshot, getSnapshot } from "mobx-state-tree";
import React from "react";
import { newTodoStore, TodoStore } from '@/root/index';
// import { RootStoreContext } from "./index";
import { createContext, useContext } from "react";


const RootStoreContext = createContext<null | Instance<typeof TodoStore>>(null)

export function useStore(){
    const store = useContext(RootStoreContext);
    if(store === null){
        throw new Error("store cannot be null, please add a context provider") 
    }
    return store;
}


//export const StoreProvider = RootStoreContext.Provider;

export default function StoreProvider({ children }: any){
   

    return  <RootStoreContext.Provider value={newTodoStore}>{children}</RootStoreContext.Provider>
} 