import * as actionType from "../actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      // action.setLocalStorageUser?.(
      //   JSON.stringify({
      //     token: action?.data.token,
      //     result: {
      //       name: action?.data.result.name,
      //       _id: action?.data.result._id,
      //       // avatarUrl: action?.data.result.avatarUrl,
      //     },
      //   })
      // );
      // action.setToken?.(action?.data.token);
      // action.setToken?.(JSON.parse(localStorage.getItem("user")));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      action.setLocalStorageUser?.(null);
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
