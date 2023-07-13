import { RootModel } from ".";
import { onSnapshot, getSnapshot, applySnapshot } from "mobx-state-tree";


export const setupRootStore = () => {
    const rootTree = RootModel.create({
        todo: {
            id: "1",
            title: "Cleaning",
            description: "I clean good",
            status: "pending"
        }
    });

    onSnapshot(rootTree, snapshot => console.log("snapshot: ", snapshot));
    
    const currentSnapshot = getSnapshot(rootTree);

    applySnapshot(rootTree, {...currentSnapshot, todo: {...currentSnapshot.todo, status: "done"}})

    return { rootTree };
}