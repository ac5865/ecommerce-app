import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import {
  fetchProductsRequest,
  setSelectedCategory,
} from "../../redux/actions/productActions";

const CATEGORIES = ["All", "Clothing", "Accessories", "Shoes"];

export default function ProductListingPage({ navigation }) {
  const dispatch = useDispatch();
  const { products, loading, error, selectedCategory } = useSelector(
    (state) => state.products
  );
  const [sortOrder, setSortOrder] = useState(null); // null, 'lowToHigh', 'highToLow'
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    const action = fetchProductsRequest();
    dispatch(action);
  }, [dispatch]);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const handleCategoryPress = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSortPress = (order) => {
    setSortOrder(order);
    setShowSortModal(false);
  };

  const handleRetry = () => {
    dispatch(fetchProductsRequest());
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Sort products based on sortOrder
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortOrder) return 0;

    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));

    if (sortOrder === "lowToHigh") {
      return priceA - priceB;
    } else if (sortOrder === "highToLow") {
      return priceB - priceA;
    }
    return 0;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27ae60" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setShowSortModal(true)}
            >
              <Text style={styles.sortIcon}>⇅</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {CATEGORIES.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  selectedCategory === category && styles.categoryCardActive,
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <View style={styles.productsGrid}>
            {sortedProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product)}
              >
                <View style={styles.productImage}>
                  <Image
                    source={{ uri: product.imgUrl }}
                    style={styles.productImage}
                  />
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort Items</Text>

            <TouchableOpacity
              style={[
                styles.sortOption,
                sortOrder === "lowToHigh" && styles.sortOptionActive,
              ]}
              onPress={() => handleSortPress("lowToHigh")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortOrder === "lowToHigh" && styles.sortOptionTextActive,
                ]}
              >
                Low to High
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortOption,
                sortOrder === "highToLow" && styles.sortOptionActive,
              ]}
              onPress={() => handleSortPress("highToLow")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortOrder === "highToLow" && styles.sortOptionTextActive,
                ]}
              >
                High to Low
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSortPress(null)}
            >
              <Text style={styles.sortOptionText}>Clear Sort</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
