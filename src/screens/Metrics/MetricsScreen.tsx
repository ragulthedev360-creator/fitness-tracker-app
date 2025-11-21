import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MyStatusBar from '../components/MyStatusBar';
import NavHeader from '../components/navHeader';

const screenWidth = Dimensions.get('window').width;

export default function MetricsScreen() {
  const metrics = [
    { title: 'Steps', value: '8,540' },
    { title: 'Calories', value: '560 kcal' },
    { title: 'Heart Rate', value: '78 bpm' },
    { title: 'Sleep', value: '7 hrs 30 mins' },
  ];
const ACCENT_ORANGE = '#FF8C00';
  return (
     <>
      <MyStatusBar
        backgroundColor={ACCENT_ORANGE}
        barStyle="light-content"
      />
      <NavHeader title="Session"   />
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Metrics</Text>
      <View style={styles.cardsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{metric.title}</Text>
            <Text style={styles.cardValue}>{metric.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    width: (screenWidth - 60) / 2, // two cards per row
    height: 120,
    backgroundColor: 'rgba(246,124,35,0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
