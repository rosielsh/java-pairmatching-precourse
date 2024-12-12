export const deepFreeze = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      obj[key] = deepFreeze(value);
    }
  });

  return Object.freeze(obj);
};
