import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  items: []
};

const storeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_ITEM: {
      console.log(action);

      let item = action.payload;
      let newItem = { id: item.title, itemDetails: item };
      let newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }
    case ACTIONS.Types.DELETE_ITEM: {
      console.log(action);

      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.items, { id: action.payload });
      newState.items.splice(index, 1);
      return newState;
    }

   

    default:
      return state;
  }
};

export default storeReducer;