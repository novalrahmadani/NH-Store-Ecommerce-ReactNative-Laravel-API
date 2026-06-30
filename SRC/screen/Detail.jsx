import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function Detail({ route, navigation }) {
  const { product } = route.params;

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.146:8000/api/products/${product.id}`
      );

      console.log("DETAIL :", response.data);

      setDetail(response.data);
    } catch (error) {
      console.log("ERROR :", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text>Memuat Detail Produk...</Text>
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.loading}>
        <Text>Data produk tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: detail.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {detail.name}
        </Text>

        <Text style={styles.price}>
          {detail.price}
        </Text>

        <Text style={styles.title}>
          Deskripsi Produk
        </Text>

        <Text style={styles.description}>
          {detail.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Checkout", {
              product: detail,
            })
          }
        >
          <Text style={styles.buttonText}>
            Beli Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 350,
    backgroundColor: "#eee",
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },

  price: {
    fontSize: 22,
    color: "#FF5722",
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "bold",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});