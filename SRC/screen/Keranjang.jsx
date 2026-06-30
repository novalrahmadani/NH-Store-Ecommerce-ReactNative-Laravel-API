import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Header from "../screen/components/Header";   // <-- PERBAIKAN

export default function Keranjang({ route, navigation }) {
  const [cartItems, setCartItems] = useState([]);

  // Ambil data cart dari Home
  useEffect(() => {
    if (route.params?.cart) {
      setCartItems(route.params.cart);
    }
  }, [route.params?.cart]);

  // Hapus item
  const removeItem = (index) => {
    Alert.alert(
      "Hapus Item",
      "Apakah Anda yakin ingin menghapus produk ini dari keranjang?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          onPress: () => {
            const newCart = [...cartItems];
            newCart.splice(index, 1);
            setCartItems(newCart);
          } 
        }
      ]
    );
  };

  // Total harga
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace(/\D/g, ''));
  }, 0);

  // Pindah ke Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Keranjang kosong", "Tambahkan produk terlebih dahulu!");
      return;
    }

    navigation.navigate('Checkout', { product: cartItems[0] });
  };

  return (
    <View style={styles.container}>

      {/* HEADER DI ATAS */}
      <Header />

      <Text style={styles.header}>Keranjang Belanja</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Keranjang masih kosong...</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Image
                  source={ typeof item.image === "string" ? { uri: item.image } : item.image }
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>

                  <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeBtn}>
                    <Text style={styles.removeText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* TOTAL & CHECKOUT */}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total: Rp {totalPrice.toLocaleString()}</Text>

            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: { marginTop: 20, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },

  emptyText: { textAlign: 'center', fontSize: 16, color: '#777', marginTop: 40 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  image: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#eee' },

  info: { flex: 1, marginLeft: 10 },

  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 16, fontWeight: '700', color: '#FF5722', marginTop: 4 },

  removeBtn: {
    marginTop: 10,
    backgroundColor: '#FF5252',
    paddingVertical: 6,
    borderRadius: 6,
    width: 70,
    alignItems: 'center',
  },

  removeText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  totalBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3
  },

  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  checkoutBtn: { backgroundColor: '#FF5722', paddingVertical: 12, borderRadius: 10 },
  checkoutText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});
