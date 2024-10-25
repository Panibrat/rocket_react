export  const getLineTypeByState = (state) => {
    if (state === '0') {
        return 'red';
    }
    if (state === 'S') {
        return 'dottedGrey';
    }
    return 'black';
};
