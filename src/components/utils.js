export const num2IntArray = (num = 0) => {
  const str = num + '';
  return str.split('');
};