"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
const recoil_1 = require("recoil");
const store_1 = require("./store/store");
const TodoList = () => {
    const todoList = (0, recoil_1.useRecoilValue)(store_1.filteredTodoListState);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TodoListStats, {}), (0, jsx_runtime_1.jsx)(TodoListFilters, {}), (0, jsx_runtime_1.jsx)(TodoItemCreator, {}), todoList.map((todoItem) => ((0, jsx_runtime_1.jsx)(TodoItem, { item: todoItem }, todoItem.id)))] }));
};
const TodoItemCreator = () => {
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const setTodoList = (0, recoil_1.useSetRecoilState)(store_1.todoListState);
    const addItem = () => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ]);
        setInputValue('');
    };
    const onChange = (e) => {
        setInputValue(e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: inputValue, onChange: onChange }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: addItem }, { children: "Add" }))] }));
};
const TodoItem = ({ item }) => {
    const [todoList, setTodoList] = (0, recoil_1.useRecoilState)(store_1.todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);
    const editItemText = (e) => {
        const newList = replaceItemAtIndex(todoList, index, Object.assign(Object.assign({}, item), { text: e.target.value }));
        setTodoList(newList);
    };
    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, Object.assign(Object.assign({}, item), { isComplete: !item.isComplete }));
        setTodoList(newList);
    };
    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);
        setTodoList(newList);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: item.text, onChange: editItemText }), (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: item.isComplete, onChange: toggleItemCompletion }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: deleteItem }, { children: "X" }))] }));
};
const TodoListFilters = () => {
    const [filter, setFilter] = (0, recoil_1.useRecoilState)(store_1.todoListFilterState);
    const updateFilter = (e) => {
        setFilter(e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Filter:", (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: filter, onChange: updateFilter }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "Show All" }, { children: "All" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "Show Completed" }, { children: "Completed" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "Show UnCompleted" }, { children: "Uncompleted" }))] }))] }));
};
const TodoListStats = () => {
    const todoListStats = (0, recoil_1.useRecoilValue)(store_1.todoListStatesState);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { children: ["\uCD1D \uAC1C\uC218: ", todoListStats.totalNum, (0, jsx_runtime_1.jsx)("br", {}), "\uC644\uB8CC \uAC1C\uC218: ", todoListStats.completedTodoNum, (0, jsx_runtime_1.jsx)("br", {}), "\uC644\uB8CC\uB418\uC9C0\uC54A\uC740 \uAC1C\uC218: ", todoListStats.unCompletedTodoNum, (0, jsx_runtime_1.jsx)("br", {}), "\uC644\uB8CC: ", todoListStats.completedTodoPercentage, (0, jsx_runtime_1.jsx)("br", {})] }) }));
};
function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
    return id++;
}
exports.default = TodoList;
