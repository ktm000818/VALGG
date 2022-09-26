import { atom, selector, useRecoilValue } from "recoil";

export type TodoListType = {
    id: number,
    text: string,
    isComplete: boolean,
}

export const ob = atom({
    key: "ob",
    default: {
        test: 0
    }
})

export const todoListState = atom<TodoListType[]>({
    key: "todoListState",
    default: []
})

export const todoListFilterState = atom({
    key: "todoListFilterState",
    default: "Show All"
})

export const filteredTodoListState = selector<TodoListType[]>({
    key: "filteredTodoListState",
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState)

        switch (filter) {
            case 'Show Completed':
                return list.filter(({isComplete}: {isComplete: boolean}) => isComplete);
            case 'Show UnCompleted':
                return list.filter(({isComplete}: {isComplete: boolean}) => !isComplete);
            default:
                return list;
        }
    }
})

export const todoListStatesState = selector({
    key: "todoListStatesState",
    get: ({get}) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const completedTodoNum = todoList.filter(({isComplete}: {isComplete: boolean}) => isComplete).length;
        const unCompletedTodoNum = todoList.filter(({isComplete}: {isComplete: boolean}) => !isComplete).length;
        const completedTodoPercentage = totalNum === 0 ? '0%' : `${completedTodoNum/totalNum * 100}%`

        return {
            todoList,
            totalNum,
            completedTodoNum,
            unCompletedTodoNum,
            completedTodoPercentage
        }
    }
})