import { FlatList, Platform, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import { addToCart } from "../../store/actions/cart";
//import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const renderProduct = (productData) => {
    return (
      <ProductItem
        image={productData.item.imageUrl}
        title={productData.item.title}
        price={productData.item.price}
        onSelect={selectItemHandler.bind(
          this,
          productData.item.id,
          productData.item.title
        )}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={selectItemHandler.bind(
            this,
            productData.item.id,
            productData.item.title
          )}
        />
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={() => dispatch(addToCart(productData.item))}
        />
      </ProductItem>
    );
  };

  return <FlatList data={products} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
