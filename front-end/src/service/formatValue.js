const formatValue = (value) => {
  let total = value;
  total = Math.round((total * 100)) / 100;
  total = total.toFixed(2).toString().replace('.', ',');
  return total;
};

export default formatValue;
