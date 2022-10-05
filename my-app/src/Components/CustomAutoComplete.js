"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const CustomAutoComplete = ({ options = [{ label: '' }], id = '', onChange = () => { }, onInputChange = () => { }, style = { width: 200 } }) => {
    var _a;
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [hasInputValue, SetHasInputValue] = (0, react_1.useState)(false);
    const [dropDownLiKey, setDropDownLiKey] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        onInputChange(inputValue);
        if (inputValue === '') {
            SetHasInputValue(false);
            setDropDownLiKey(0);
        }
        else {
            SetHasInputValue(true);
        }
    }, [inputValue]);
    (0, react_1.useEffect)(() => {
        if (dropDownLiKey === -1) {
            setDropDownLiKey(0);
        }
        if (dropDownLiKey > options.length - 1) {
            setDropDownLiKey(options.length - 1);
        }
    }, [dropDownLiKey]);
    const filterDropDownList = () => {
        if (inputValue === '') {
        }
        else {
            SetHasInputValue(true);
            // const filteredDropDownList = options.filter(item => item.label.includes(inputValue));
            // setDropDownList(filteredDropDownList);
        }
    };
    const handleChange = (e) => {
        var _a;
        setInputValue((_a = e.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    const selectDropDown = (e, selected = '') => {
        var _a;
        onChange(((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.innerText) || selected);
        deleteInputValue();
    };
    const deleteInputValue = () => {
        setInputValue('');
    };
    const handleKeyPress = (e) => {
        var _a;
        if (inputValue) {
            const focusedItemLabel = (_a = Object.values(options)[dropDownLiKey]) === null || _a === void 0 ? void 0 : _a.label;
            switch (e.key) {
                case 'ArrowUp':
                    setDropDownLiKey((prev) => --prev);
                    break;
                case 'ArrowDown':
                    setDropDownLiKey((prev) => ++prev);
                    break;
                case 'Enter':
                    selectDropDown(null, focusedItemLabel);
                    break;
                default:
                    break;
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(CustomInputContainer, Object.assign({ id: id, hasInputValue: hasInputValue }, { children: [(0, jsx_runtime_1.jsx)(CustomInput, { value: inputValue, onChange: handleChange, onKeyDown: handleKeyPress, style: style }), (0, jsx_runtime_1.jsx)(DeleteButton, Object.assign({ onClick: deleteInputValue }, { children: "x" }))] })), hasInputValue && ((0, jsx_runtime_1.jsxs)(DropDownListUl, Object.assign({ style: style }, { children: [options.length === 1 && ((_a = options[0]) === null || _a === void 0 ? void 0 : _a.label) === '' && (0, jsx_runtime_1.jsx)(DropDownListLi, { children: "\uAC80\uC0C9 \uC911 . . ." }, 0), options.map((item, index) => ((0, jsx_runtime_1.jsx)(DropDownListLi, Object.assign({ className: dropDownLiKey === index ? 'selected' : '', id: index + "id", onClick: selectDropDown }, { children: item.label }), index)))] })))] }) }));
};
const Container = styled_1.default.div `
    padding: 10px;
`;
const actvBorderRadius = '10px 10px 0 0';
const inactvBorderRadius = '10px 10px 10px 10px';
const CustomInputContainer = styled_1.default.div `
    position: relative;
    display: flex;
    // flex-direction: row;
    padding: 16px;
    border: 1px solid lightgray;
    border-radius: ${props => props.hasInputValue ? actvBorderRadius : inactvBorderRadius};
    background-color: white;
    z-index: 99;
    &:focus-within {
        box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
    }
`;
const CustomInput = styled_1.default.input `
    flex-grow: 1;
    width: ${props => props.style.width};
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
`;
const DeleteButton = styled_1.default.button `
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;
const DropDownListUl = styled_1.default.ul `
    position: absolute;
    width: ${props => props.style.width};
    display: block;
    list-style: none;
    background-color: white;
    margin: 0px;
    padding: 16px;
    z-index: 99
`;
const DropDownListLi = styled_1.default.li `
    cursor: pointer;
    padding: 0 16px;

    &.selected {
      background-color: lightgray;
    }
`;
exports.default = react_1.default.memo(CustomAutoComplete);
