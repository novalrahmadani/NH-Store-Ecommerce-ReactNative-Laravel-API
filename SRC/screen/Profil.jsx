import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Profil() {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route.params?.user || {
    name: "Pengguna",
    email: "user@example.com",
    phone: "0812-xxxx-xxxx",
    avatar: "https://i.ibb.co/4YxGkBz/avatar.png",
  };

  /* ================= PESANAN ITEM ================= */
  const OrderStatus = ({ title, count, color, status }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() =>
        navigation.getParent()?.navigate("Tracking", {
          status,
          product: {
            name: "Sepatu Sneakers Premium",
          },
          qty: 1,
          subtotal: 150000,
          total: 160000,
          shipping: {
            name: "REG",
            price: 10000,
            est: "2–4 hari",
          },
          payment: {
            name: "COD (Bayar di Tempat)",
          },
          alamat: {
            nama: user.name,
            alamat: "Jl. Mawar No. 123, OKU Timur",
            telp: user.phone,
          },
        })
      }
    >
      <Text style={[styles.orderCount, { color }]}>{count}</Text>
      <Text style={styles.orderText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* ================= PROFIL ================= */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
          </View>
        </View>

        {/* ================= EDIT PROFIL ================= */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditProfil", { user })}
        >
          <Text style={styles.editText}>Edit Profil</Text>
        </TouchableOpacity>

        {/* ================= PESANAN SAYA ================= */}
        <View style={styles.orderCard}>
          <Text style={styles.sectionTitle}>Pesanan Saya</Text>

          <View style={styles.orderRow}>
            <OrderStatus
              title="Dikemas"
              count="2"
              color="#FF9800"
              status="dikemas"
            />
            <OrderStatus
              title="Dikirim"
              count="1"
              color="#2196F3"
              status="dikirim"
            />
            <OrderStatus
              title="Selesai"
              count="5"
              color="#4CAF50"
              status="selesai"
            />
          </View>
        </View>

        {/* ================= MENU ================= */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("PetunjukPengguna")}
          >
            <Text style={styles.menuText}>📘 Petunjuk Pengguna</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Bantuan")}
          >
            <Text style={styles.menuText}>💬 Bantuan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logout]}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

/* ======================= STYLE ======================= */

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5F5F5" },

  container: { padding: 20 },

  profileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#EE4D2D",
  },

  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555", marginTop: 2 },
  phone: { fontSize: 14, color: "#555", marginTop: 2 },

  editBtn: {
    backgroundColor: "#EE4D2D",
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 20,
  },

  editText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderItem: {
    width: "30%",
    alignItems: "center",
  },

  orderCount: {
    fontSize: 22,
    fontWeight: "bold",
  },

  orderText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },

  menuCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    elevation: 3,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
  },

  logout: { borderBottomWidth: 0 },

  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
});
