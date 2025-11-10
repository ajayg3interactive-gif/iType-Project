export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  return currentUser;
};
