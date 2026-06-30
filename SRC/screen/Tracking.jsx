import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Tracking({ route }) {
  const {
    product,
    qty,
    subtotal,
    total,
    shipping,
    payment,
    alamat,
  } = route.params || {};

  const [status, setStatus] = useState("dipesan");

  useEffect(() => {
    const kemas = setTimeout(() => setStatus("dikemas"), 2000);
    const kirim = setTimeout(() => setStatus("dikirim"), 4000);
    const selesai = setTimeout(() => setStatus("selesai"), 7000);

    return () => {
      clearTimeout(kemas);
      clearTimeout(kirim);
      clearTimeout(selesai);
    };
  }, []);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Data pesanan tidak ditemukan</Text>
      </View>
    );
  }

  const Step = ({ title, active, done }) => (
    <View style={styles.step}>
      <View
        style={[
          styles.circle,
          active || done ? styles.activeCircle : styles.inactiveCircle,
        ]}
      >
        {done && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={[styles.stepText, active && styles.activeText]}>
        {title}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Status Pesanan</Text>

      {/* STATUS */}
      <View style={styles.card}>
        <View style={styles.progress}>
          <Step title="Dipesan" done />
          <Step title="Dikemas" active={status === "dikemas"} done={status !== "dipesan"} />
          <Step title="Dikirim" active={status === "dikirim"} done={status === "selesai"} />
          <Step title="Selesai" active={status === "selesai"} />
        </View>

        <Text style={styles.statusText}>
          Status: <Text style={styles.status}>{status.toUpperCase()}</Text>
        </Text>
      </View>

      {/* DETAIL */}
      <View style={styles.card}>
        <Text style={styles.title}>Detail Pesanan</Text>
        <Row label="Produk" value={product.name} />
        <Row label="Jumlah" value={qty} />
        <Row label="Subtotal" value={`Rp ${subtotal.toLocaleString()}`} />
        <Row label="Ongkir" value={`Rp ${shipping.price.toLocaleString()}`} />
        <Row label="Total" value={`Rp ${total.toLocaleString()}`} bold />
      </View>

      {/* PENGIRIMAN */}
      <View style={styles.card}>
        <Text style={styles.title}>Pengiriman</Text>
        <Text>{shipping.name} ({shipping.est})</Text>
      </View>

      {/* PEMBAYARAN */}
      <View style={styles.card}>
        <Text style={styles.title}>Metode Pembayaran</Text>
        <Text>{payment.name}</Text>
      </View>

      {/* ALAMAT */}
      <View style={styles.card}>
        <Text style={styles.title}>Alamat Pengiriman</Text>
        <Text>{alamat.nama}</Text>
        <Text>{alamat.alamat}</Text>
        <Text>Telp: {alamat.telp}</Text>
      </View>
    </ScrollView>
  );
}

/* ===== COMPONENT ===== */
const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
  </View>
);

/* ===== STYLE ===== */
const PRIMARY = "#FF5722";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },

  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  step: { alignItems: "center", width: 70 },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: { backgroundColor: PRIMARY },
  inactiveCircle: { backgroundColor: "#ccc" },

  check: { color: "#fff", fontWeight: "bold" },

  stepText: { fontSize: 11, marginTop: 5, textAlign: "center" },
  activeText: { fontWeight: "bold" },

  statusText: { textAlign: "center", marginTop: 10 },
  status: { color: PRIMARY, fontWeight: "bold" },

  title: { fontWeight: "bold", marginBottom: 8 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  label: { color: "#666" },
  value: { fontWeight: "600" },
  bold: { color: PRIMARY },
});
