import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = (props) => {
  const renderProduct = (productData) => {
    return (
      <ProductItem
        image={productData.item.imageUrl}
        title={productData.item.title}
        price={productData.item.price}
        onViewDetail={() =>
          props.navigation.navigate("ProductDetail", {
            productId: productData.item.id,
            productTitle: productData.item.title,            
          })
        }
        onAddToCart={() => {}}
      />
    );
  };

  const products = useSelector((state) => state.products.availableProducts);

  return <FlatList data={products} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;
