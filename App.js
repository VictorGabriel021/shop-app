import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import productReducer from "./store/reducers/product";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

import ShopNavigator from "./navigation/ShopNavigator";

import { useState } from "react";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import NavigationContainer from "./navigation/NavigationContainer";

//import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
