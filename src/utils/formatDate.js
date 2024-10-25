export const formatDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11, тому додаємо 1
    const year = String(date.getFullYear()).slice(-2); // Останні дві цифри року
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}-${minutes}`;
}
