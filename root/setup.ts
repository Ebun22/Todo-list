import { RootModel } from ".";
import { onSnapshot, getSnapshot, applySnapshot } from "mobx-state-tree";


export const setupRootStore = () => {
    const rootTree = RootModel.create();

    onSnapshot(rootTree, snapshot => console.log("snapshot: ", snapshot));
    
    const currentSnapshot = getSnapshot(rootTree);
    console.log("snapshot: ", currentSnapshot)
    applySnapshot(rootTree, {...currentSnapshot, TodoStore: {...currentSnapshot.TodoStore}})

    return { rootTree };
}