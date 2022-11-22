export const validateEmail = string => {
  const reg = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  return reg.test(string);
};
export const valdiatePass = string => {
  const reg = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*].{7,19}$',
  );
  return reg.test(string);
};
