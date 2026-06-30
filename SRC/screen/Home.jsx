import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../screen/components/Header";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.146:8000/api/products"
      );

      console.log("RESPONSE :", response.data);

      // kalau API Laravel mengembalikan:
      // { data: [...] }
      const apiData = response.data.data || response.data;

      const data = apiData.map((item) => ({
        id: item.id,
        name: item.nama,
        price: Number(item.harga),
        image: item.gambar,
        description: item.deskripsi,
      }));

      console.log("DATA MAPPING :", data);

      setProducts(data);
    } catch (error) {
      console.log("ERROR :", error.message);
    } finally {
      setLoading(false);
    }
  };

  const cartIcon =
    "https://cdn-icons-png.flaticon.com/512/833/833314.png";

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);

    navigation.navigate("Keranjang", {
      cart: newCart,
    });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            product: item,
          })
        }
      >
        <Image
          source={{
            uri:
              item.image ||
              "https://via.placeholder.com/300",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>

      <View style={styles.row}>
        <Text style={styles.price}>
          Rp {item.price.toLocaleString("id-ID")}
        </Text>

        <TouchableOpacity
          onPress={() => addToCart(item)}
        >
          <Image
            source={{ uri: cartIcon }}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <Header />

      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#1E3A8A"
            />
            <Text>Memuat produk...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.header}>
              Semua Produk iPhone
            </Text>

            <FlatList
              data={products}
              keyExtractor={(item) =>
                item.id.toString()
              }
              numColumns={2}
              renderItem={renderProduct}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              ListEmptyComponent={
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 30,
                  }}
                >
                  Produk tidak ditemukan
                </Text>
              }
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  name: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 8,
    color: "#333",
  },

  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5722",
  },

  row: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartIcon: {
    width: 26,
    height: 26,
  },
});