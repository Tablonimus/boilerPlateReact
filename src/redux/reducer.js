import * as action from "../redux/actions/actionTypes";
// import moment from "moment";

const initialState = {
  loggedUser: {},
  
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case action.LOGIN: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
