export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      cart: state.cart,
      orders: state.orders,
      user: {
        currentUser: state.user.currentUser,
        token: state.user.token,
      },
    };

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {}
};
