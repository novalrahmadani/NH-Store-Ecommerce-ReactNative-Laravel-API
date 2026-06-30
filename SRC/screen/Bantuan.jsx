// SRC/screen/Bantuan.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Bantuan() {
  const faqs = [
    { id: 1, question: 'Bagaimana cara membeli produk?', answer: 'Pilih produk, tambahkan ke keranjang, lalu lakukan checkout.' },
    { id: 2, question: 'Bagaimana cara melakukan pembayaran?', answer: 'Pilih metode pembayaran yang tersedia saat checkout.' },
    { id: 3, question: 'Apakah bisa membatalkan pesanan?', answer: 'Ya, Anda bisa membatalkan pesanan sebelum pesanan dikirim.' },
    { id: 4, question: 'Bagaimana melacak pesanan saya?', answer: 'Masuk ke menu Profil > Pesanan untuk melihat status pesanan.' },
    { id: 5, question: 'Bagaimana menghubungi customer service?', answer: 'Klik menu Bantuan lalu pilih opsi kontak yang tersedia.' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bantuan & FAQ</Text>

      {faqs.map((faq) => (
        <View key={faq.id} style={styles.card}>
          <View style={styles.questionRow}>
            <Ionicons name="help-circle-outline" size={20} color="#007AFF" style={{ marginRight: 8 }} />
            <Text style={styles.question}>{faq.question}</Text>
          </View>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5'
  },
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20
  }
});
