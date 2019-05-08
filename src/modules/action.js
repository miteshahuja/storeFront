// types of action
const Types = {
  ADD_ITEM: "ADD_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
};
// actions
const addItem = item => ({
  type: Types.ADD_ITEM,
  payload: item
});

const deleteItem = item => ({
  type: Types.DELETE_ITEM,
  payload: item
});

export default {
  addItem,
  deleteItem,
  Types
};