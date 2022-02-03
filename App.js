import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import product from "./store/reducers/product";

import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: product,
});

export default function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
