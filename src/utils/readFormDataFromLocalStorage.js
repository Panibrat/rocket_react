export const readFormDataFromLocalStorage = (formId) => {
    const storedData = localStorage.getItem(formId)
    if (storedData) {
        return JSON.parse(storedData);
    }
    return {};
}
