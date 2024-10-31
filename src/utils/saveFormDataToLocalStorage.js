export const saveFormDataToLocalStorage = (formId, data) => {
  localStorage.setItem(formId, JSON.stringify(data));
};
