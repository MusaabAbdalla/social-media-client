// export default {
//     setItem: jest.fn((key, value) => (localStorage[key] = value)),
//     getItem: jest.fn((key) => localStorage[key] || null),
//     removeItem: jest.fn((key) => delete localStorage[key]),
//     clear: jest.fn(() => Object.keys(this).forEach((key) => delete this[key])),
//   };

export const localStorageMock = () => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      console.log("key", key);
      console.log("value", value);
      store[key] = value.toString();
    }),
    removeItem: jest.fun((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
};
