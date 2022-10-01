

 let timer: NodeJS.Timeout;
 
/**
 * 
 * @param callback 이벤트 완료 후 실행할 함수
 */
export function debounce(callback: () => void, timeout: number): void {
    clearTimeout(timer);

    timer = setTimeout(() => {
        if(typeof callback === 'function'){
            callback();
        }
    }, timeout);

}