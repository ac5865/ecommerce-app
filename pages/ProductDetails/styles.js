import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7f8c8d",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonError: {
    backgroundColor: "#95a5a6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    paddingVertical: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
  productImageContainer: {
    width: width,
    height: width,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
  },
  productImageFull: {
    width: "100%",
    height: "100%",
  },
  productImageIcon: {
    fontSize: 100,
  },
  productInfoSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 10,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#34495e",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: "#7f8c8d",
  },
  detailValue: {
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  addToCartButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  goToCartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  goToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
