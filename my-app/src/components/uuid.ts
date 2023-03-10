export const makeUUID = () => {
    return window.self.crypto.randomUUID();
}