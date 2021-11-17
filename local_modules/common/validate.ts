import _ from "lodash";

export const isInput = (val: any) => {
  if (val) return true;
  if (val === 0) return true;
  if (val === false) return true;
  return false;
};

export const isArrayFill = (val: any) => {
  return _.isArray(val) && val.length > 0;
};
