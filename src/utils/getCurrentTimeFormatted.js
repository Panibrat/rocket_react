export const getCurrentTimeFormatted = () => {
  const now = new Date();

  const minutes = String(now.getMinutes()).padStart(2, '0'); // Хвилини з двома цифрами
  const seconds = String(now.getSeconds()).padStart(2, '0'); // Секунди з двома цифрами
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Мілісекунди з трьома цифрами

  return `${minutes}:${seconds}:${milliseconds}`;
};
