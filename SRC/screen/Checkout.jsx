import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

export default function Checkout({ route, navigation }) {
  const { product } = route.params;
  console.log("PRODUCT CHECKOUT:", product);
  const [qty, setQty] = useState(1);

  // DATA ALAMAT
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telp, setTelp] = useState("");

  // METODE PENGIRIMAN
  const shippingMethods = [
    { id: 1, name: "REG", price: 10000, est: "2–4 hari" },
    { id: 2, name: "YES", price: 15000, est: "1 hari" },
    { id: 3, name: "Hemat", price: 8000, est: "4–6 hari" },
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);

  // METODE PEMBAYARAN
  const paymentMethods = [
    { id: 1, name: "COD (Bayar di Tempat)" },
    { id: 2, name: "Transfer Bank" },
    { id: 3, name: "E-Wallet" },
    { id: 4, name: "QRIS" },
  ];
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  // QTY
  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  // TOTAL
  const basePrice = parseInt(
  String(product.harga || product.price).replace(/\D/g, "")
);
  const subtotal = qty * basePrice;
  const total = subtotal + selectedShipping.price;

  // BUAT PESANAN ➜ TRACKING
  const buatPesanan = () => {
    if (!nama || !alamat || !telp) {
      Alert.alert("Lengkapi Data", "Alamat pengiriman wajib diisi");
      return;
    }

    navigation.navigate("Tracking", {
      product,
      qty,
      subtotal,
      total,
      shipping: selectedShipping,
      payment: selectedPayment,
      alamat: { nama, alamat, telp },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* PRODUK */}
      <View style={styles.productCard}>
        <Image
          source={
            typeof product.image === "string"
              ? { uri: product.image }
              : product.image
          }
          style={styles.image}
        />
        <View style={styles.infoBox}>
          <Text style={styles.productName}>
  {product.nama || product.name}
</Text>
         <Text style={styles.productPrice}>
  {product.harga || product.price}
</Text>

          <View style={styles.qtyBox}>
            <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ALAMAT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
        <TextInput
          placeholder="Nama Penerima"
          style={styles.input}
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          placeholder="Alamat Lengkap"
          style={styles.input}
          value={alamat}
          onChangeText={setAlamat}
        />
        <TextInput
          placeholder="No. Telepon"
          style={styles.input}
          value={telp}
          onChangeText={setTelp}
          keyboardType="numeric"
        />
      </View>

      {/* PENGIRIMAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metode Pengiriman</Text>
        {shippingMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.option,
              selectedShipping.id === item.id && styles.optionActive,
            ]}
            onPress={() => setSelectedShipping(item)}
          >
            <Text>
              {item.name} - Rp {item.price.toLocaleString()} ({item.est})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PEMBAYARAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
        {paymentMethods.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.option,
              selectedPayment.id === item.id && styles.optionActive,
            ]}
            onPress={() => setSelectedPayment(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RINGKASAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>

        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>Rp {subtotal.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <Text>Ongkir</Text>
          <Text>Rp {selectedShipping.price.toLocaleString()}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>
            Rp {total.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.orderBtn} onPress={buatPesanan}>
        <Text style={styles.orderText}>Buat Pesanan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 15 },

  header: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },

  image: { width: 90, height: 90, borderRadius: 10 },

  infoBox: { flex: 1, marginLeft: 12 },

  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { color: "#FF5722", marginVertical: 5 },

  qtyBox: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  qtyText: { fontSize: 18 },
  qtyNumber: { marginHorizontal: 15, fontSize: 16 },

  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  sectionTitle: { fontWeight: "bold", marginBottom: 10 },

  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  option: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
  },
  optionActive: {
    backgroundColor: "#FFD6C9",
    borderWidth: 1,
    borderColor: "#FF5722",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
    marginTop: 10,
  },

  totalText: { fontSize: 16, fontWeight: "bold" },

  orderBtn: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 30,
  },

  orderText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
