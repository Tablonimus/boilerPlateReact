import * as action from "../actions/actionTypes";
import axios from "axios";
// import { setAuthToken } from "../../components/BrowserHistory/setAuthToken";

const urldeploy = "https://krugerback.up.railway.app/";


//------------GET ALL------------
export function getAllEmployees() {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${urldeploy}user/employees`);
      dispatch({
        type: action.GET_ALL_EMPLOYEES,
        payload: json.data,
      });

      return "Success";
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}
//-----------Create User---------
