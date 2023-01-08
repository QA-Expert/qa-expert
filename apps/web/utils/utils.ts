export const convertNumberToString = (num: number, minimumIntegerDigits = 2) =>
  num.toLocaleString('en-US', {
    minimumIntegerDigits,
    useGrouping: false,
  });
