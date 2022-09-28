"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoListStatesState = exports.filteredTodoListState = exports.todoListFilterState = exports.todoListState = exports.ob = void 0;
const recoil_1 = require("recoil");
exports.ob = (0, recoil_1.atom)({
    key: "ob",
    default: {
        test: 0
    }
});
exports.todoListState = (0, recoil_1.atom)({
    key: "todoListState",
    default: []
});
exports.todoListFilterState = (0, recoil_1.atom)({
    key: "todoListFilterState",
    default: "Show All"
});
exports.filteredTodoListState = (0, recoil_1.selector)({
    key: "filteredTodoListState",
    get: ({ get }) => {
        const filter = get(exports.todoListFilterState);
        const list = get(exports.todoListState);
        switch (filter) {
            case 'Show Completed':
                return list.filter(({ isComplete }) => isComplete);
            case 'Show UnCompleted':
                return list.filter(({ isComplete }) => !isComplete);
            default:
                return list;
        }
    }
});
exports.todoListStatesState = (0, recoil_1.selector)({
    key: "todoListStatesState",
    get: ({ get }) => {
        const todoList = get(exports.todoListState);
        const totalNum = todoList.length;
        const completedTodoNum = todoList.filter(({ isComplete }) => isComplete).length;
        const unCompletedTodoNum = todoList.filter(({ isComplete }) => !isComplete).length;
        const completedTodoPercentage = totalNum === 0 ? '0%' : `${completedTodoNum / totalNum * 100}%`;
        return {
            todoList,
            totalNum,
            completedTodoNum,
            unCompletedTodoNum,
            completedTodoPercentage
        };
    }
});
