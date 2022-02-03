import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const renderProduct = (productData) => {
  return <Text>{productData.item.title}</Text>;
};

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  return <FlatList data={products} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;
