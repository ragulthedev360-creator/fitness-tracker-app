import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import NavHeader from '../components/navHeader';
import MyStatusBar from '../components/MyStatusBar';
import { workoutHistory } from '../../service/api';

const screenWidth = Dimensions.get('window').width;

export default function HistoryScreen() {
  // const history = [
  //   { date: '2025-11-18', workout: 'Cardio Blast', duration: '45 min' },
  //   { date: '202         5-11-17', workout: 'Strength Training', duration: '60 min' },
  //   { date: '2025-11-16', workout: 'Yoga Flow', duration: '30 min' },
  //   { date: '2025-11-15', workout: 'HIIT Session', duration: '40 min' },

  // ];

  const [history, setHistory] = useState([''])

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await workoutHistory();
        const raw = res.data?.data;
        const formatted = raw.map((item: any) => ({
          workout: `Workout ${item.exercise_id}`,
          date: new Date(item.created_at).toDateString(),
          duration: "10 MIN",
          exercise_results: item.exercise_results
        }));

        setHistory(formatted);
      } catch (err) {
        // console.log("History Load Error:", err);
      }
    };


    loadHistory();
  }, []);





  return (

    <>
      <MyStatusBar
        backgroundColor={'#FF8C00'} // Using the vibrant orange for the status bar
        barStyle="light-content"
      />
      <NavHeader title="Workout History" />
      <ScrollView style={styles.container}>
        <View style={styles.cardsContainer}>
          {history?.map((item: any, index: any) => (
            <View key={index} style={styles.card}>

              <View style={styles.infoGroup}>
                <Text style={styles.workout}>{item.workout}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              <View style={styles.durationGroup}>
                <Text style={styles.durationValue}>{item?.duration?.split(" ")[0]}</Text>
                <Text style={styles.durationLabel}>MIN</Text>
              </View>

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
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  cardsContainer: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C00',
  },
  infoGroup: {
    flex: 1,
    marginRight: 15,
  },
  workout: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  date: {
    color: '#B0B0B0',
    fontSize: 13,
    fontWeight: '400',
  },
  durationGroup: {
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  durationValue: {
    color: '#FF8C00',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 24,
  },
  durationLabel: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});