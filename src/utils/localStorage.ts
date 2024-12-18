export const setLocal = (title: string, msg: string) => {
  localStorage.setItem(title, msg);
  
};

export const getLocal = (title: string) => {
  return localStorage.getItem(title);
};
