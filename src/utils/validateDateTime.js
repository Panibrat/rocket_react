export const validateDateTime = (input) => {
  const regex = /^(\d{2})\.(\d{2})\.(\d{2})\s(\d{2})-(\d{2})$/;

  if (!regex.test(input)) {
    return false;
  }

  const [, day, month, year, hours, minutes] = input.match(regex);

  // Перевірка, чи дата та час реальні
  const isValidDay = day >= 1 && day <= 31;
  const isValidMonth = month >= 1 && month <= 12;
  const isValidYear = year >= 0 && year <= 99; // Обмеження на двозначний рік
  const isValidHour = hours >= 0 && hours < 24;
  const isValidMinute = minutes >= 0 && minutes < 60;

  return isValidDay && isValidMonth && isValidYear && isValidHour && isValidMinute;
};
