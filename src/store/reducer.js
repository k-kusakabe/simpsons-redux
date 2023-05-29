import { initialState } from "./initialState";
import {
  NEW_API_DATA,
  SET_SEARCH_INPUT,
  SET_NAME_INPUT,
  RESET_INPUT,
} from "./types";

//create the logic that manipulates the state
export function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_API_DATA:
      return { ...state, simpsons: action.payload };

    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };

    case SET_NAME_INPUT:
      return { ...state, nameInput: action.payload };

    case RESET_INPUT:
      return {
        ...state,
        searchInput: action.payload,
        nameInput: action.payload,
      };

    default:
      console.log("Reducer started or INVALID reducer type, probably a typo");
      return state;
  }
}
