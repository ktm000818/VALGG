"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
let timer;
/**
 *
 * @param callback 이벤트 완료 후 실행할 함수
 */
function debounce(callback, timeout) {
    clearTimeout(timer);
    setTimeout(() => {
        if (typeof callback === 'function') {
            callback();
        }
    }, timeout);
}
exports.debounce = debounce;
