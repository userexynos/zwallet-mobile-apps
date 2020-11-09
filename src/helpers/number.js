const currency = (val) => {
  if (typeof val === 'number') val = val.toString();
  else if (val === undefined) val = '0';

  return val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

export {currency};
