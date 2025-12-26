import React, { useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import {
  fetchCartRequest,
  removeFromCartRequest,
} from "../../redux/actions/cartActions";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalPrice, loading, error } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.userId) {
      console.log("called");
      dispatch(fetchCartRequest(user.userId));
    }
  }, []);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCartRequest(productId, user?.userId));
  };

  // Calculate subtotal from items
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      if (item.product?.price) {
        const price = parseFloat(item.product.price.replace("$", ""));
        return sum + price * item.quantity;
      }
      return sum;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27ae60" />
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Cart</Text>
          {items.length > 0 && (
            <Text style={styles.itemCount}>{items.length} items</Text>
          )}
        </View>

        {/* Cart Items */}
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add some items to get started!
            </Text>
          </View>
        ) : (
          <View style={styles.cartItemsContainer}>
            {items.map((item) => (
              <View key={item.productId} style={styles.cartItem}>
                {/* Product Image */}
                <View style={styles.productImageContainer}>
                  {item.product?.imgUrl ? (
                    <Image
                      source={{ uri: item.product.imgUrl }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.productImagePlaceholder}>📦</Text>
                  )}
                </View>

                {/* Product Details */}
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.product?.name || "Unknown Product"}
                  </Text>
                  <Text style={styles.productPrice}>
                    {item.product?.price || "$0"}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Quantity: {item.quantity}
                  </Text>

                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.productId)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Total Section */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
