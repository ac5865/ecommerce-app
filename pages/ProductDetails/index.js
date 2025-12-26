import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { fetchProductDetailsRequest } from "../../redux/actions/productActions";
import { addToCartRequest } from "../../redux/actions/cartActions";

const { width } = Dimensions.get("window");

export default function ProductDetailsPage({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const { productDetails, productDetailsLoading, productDetailsError } =
    useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { addingToCart } = useSelector((state) => state.cart);

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetailsRequest(product.id));
  }, [dispatch, product.id]);

  useEffect(() => {
    console.log("📊 Product Details State:", {
      productDetails,
      loading: productDetailsLoading,
      error: productDetailsError,
    });
  }, [productDetails, productDetailsLoading, productDetailsError]);

  useEffect(() => {
    if (!addingToCart && isInCart === false) {
      // Check if cart was updated successfully
      const checkCartUpdate = () => {
        setIsInCart(true);
      };
      if (addingToCart === false && isInCart === true) {
        checkCartUpdate();
      }
    }
  }, [addingToCart]);

  const handleAddToCart = () => {
    dispatch(addToCartRequest(product.id, 1, user?.userId));
    setIsInCart(true);
  };

  const handleGoToCart = () => {
    navigation.navigate("Cart");
  };

  if (productDetailsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27ae60" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (productDetailsError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {productDetailsError}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchProductDetailsRequest(product.id))}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonError}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Use productDetails from API if available, otherwise fallback to route params
  const displayProduct = productDetails || product;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.productImageContainer}>
          {displayProduct.imgUrl ? (
            <Image
              source={{ uri: displayProduct.imgUrl }}
              style={styles.productImageFull}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.productImageIcon}>📦</Text>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfoSection}>
          <Text style={styles.productName}>{displayProduct.name}</Text>
          <Text style={styles.productCategory}>{displayProduct.category}</Text>
          <Text style={styles.productPrice}>{displayProduct.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>
            {displayProduct.description ||
              "No description available for this product."}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Condition:</Text>
            <Text style={styles.detailValue}>
              {displayProduct.condition || "Excellent"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{displayProduct.category}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        {isInCart ? (
          <TouchableOpacity
            style={styles.goToCartButton}
            onPress={handleGoToCart}
          >
            <Text style={styles.goToCartButtonText}>Go to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
