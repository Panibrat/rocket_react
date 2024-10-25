export const inputToNumberDataTransformer = (v) => {
    return v.replace(/[^0-9]/g, '');
}
