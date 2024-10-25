export const formatNumberToString = (number, precision) => {
    const formattedString = number.toFixed(precision || 0);
     return formattedString;
};
