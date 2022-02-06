import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";

import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItems = state.items[action.pid];
      const currentQty = state.items[action.pid].quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        updatedCartItems = new CartItem(
          selectedCartItems.quantity - 1,
          selectedCartItems.productPrice,
          selectedCartItems.productTitle,
          selectedCartItems.sum - selectedCartItems.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItems };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItems.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state;
};
