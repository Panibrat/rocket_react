export const  inputToAsciiDataTransformer = (input) => {
    return input.replace(/[^a-zA-Z0-9_-]/g, '_');
}
