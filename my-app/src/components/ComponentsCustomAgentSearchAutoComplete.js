"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const CustomAgentSearchAutoComplete = ({ options = [{ name: '' }], id = '', onChange = () => { }, onInputChange = () => { }, }) => {
    var _a;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(CustomInputContainer, Object.assign({ id: id }, { children: [(0, jsx_runtime_1.jsx)(CustomInput, {}), (0, jsx_runtime_1.jsx)(SearchButton, { children: "o" })] })), (0, jsx_runtime_1.jsxs)(DropDownListUl, { children: [options.length === 1 && ((_a = options[0]) === null || _a === void 0 ? void 0 : _a.name) === '' && (0, jsx_runtime_1.jsx)(DropDownListLi, { children: "\uAC80\uC0C9 \uC911 . . ." }, 0), options.map((item, index) => ((0, jsx_runtime_1.jsx)(DropDownListLi, Object.assign({ id: index + "id" }, { children: item.name }), index)))] })] }) }));
};
const Container = styled_1.default.div `
`;
const CustomInputContainer = styled_1.default.div `
    position: relative;
    display: flex;
    padding: 7px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #1C1C1F;
    z-index: 99;
    &:focus-within {
        box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
    }
`;
const CustomInput = styled_1.default.input `
    flex-grow: 1;
    width: 200px;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    color: white;
`;
const SearchButton = styled_1.default.button `
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    color: #7B7A8E;
    border: none;
    cursor: pointer;
`;
const DropDownListUl = styled_1.default.ul `
    position: absolute;
    width: 200px;
    display: block;
    list-style: none;
    background-color: white;
    margin: 0px;
    padding: 4px;
    z-index: 99
`;
const DropDownListLi = styled_1.default.li `
    cursor: pointer;
    padding: 0 16px;
    color: black;
    &.selected {
      background-color: lightgray;
    }
`;
exports.default = react_1.default.memo(CustomAgentSearchAutoComplete);
