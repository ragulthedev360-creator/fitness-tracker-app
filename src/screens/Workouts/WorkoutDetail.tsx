import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { getExercisesDetails } from '../../service/api';
import MyStatusBar from '../components/MyStatusBar';
import NavHeader from '../components/navHeader';

export default function WorkoutDetail({ route, navigation }: any) {

  const [workOutList, setWorkOutList] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getExercisesDetails({ id: route?.params?.workOutList?.id });

        if (res.status === 200) {

          setWorkOutList(res?.data?.data);
        }

      } catch (err: any) {
        // console.log("Error:", err?.response?.data || err.message);
      }
    };

    loadData();
  }, []);

  const exercises = (() => {
    if (!workOutList?.exercises) return [];

    try {
      const parsed = JSON.parse(workOutList.exercises);

      return parsed.map((item: any) => ({
        ...item,
        image: exerciseImages[item.image] || null,
      }));
    } catch (e) {
      // console.log("JSON Parse Error:", e);
      return [];
    }
  })();



  const exerciseImages: any = {
    "squat.jpg": require("../../../assets/images/squat.jpg"),
    "bench.jpg": require("../../../assets/images/bench.jpg"),
    "row.jpg": require("../../../assets/images/row.jpg"),
    "deadlift.jpg": require("../../../assets/images/deadlift.jpg"),
    "incline_bench.jpg": require("../../../assets/images/incline_bench.jpg"),
    "lateral_raise.jpg": require("../../../assets/images/lateral_raise.jpg"),
    "plank.jpg": require("../../../assets/images/plank.jpg"),

    "pullup.jpg": require("../../../assets/images/pullup.jpg"),
    "overhead_press.jpg": require("../../../assets/images/overhead_press.jpg"),
    "bicep_curl.jpg": require("../../../assets/images/bicep_curl.jpg"),
  };

  const workoutImages: any = {
    "fullbody_workout.jpg": require("../../../assets/images/fullbody_workout.jpg"),
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={'rgb(246,124,35)'}
        barStyle="light-content"
      />
      <NavHeader title="Workout Details" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

        <Text style={styles.title}>{workOutList?.name}</Text>

        {workOutList?.images && (
          <Image
            source={workoutImages[workOutList.images]}
            style={styles.workoutImage}
          />
        )}


        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Duration: {workOutList?.duration}</Text>
          <Text style={styles.infoText}>Difficulty: {workOutList?.difficulty}</Text>
          <Text style={styles.infoText}>Target: {workOutList?.target}</Text>
          <Text style={styles.infoText}>Equipment: {workOutList?.equipment}</Text>
          <Text style={styles.infoText}>Calories: {workOutList?.calories} kcal</Text>
        </View>

        <Text style={styles.exerciseHeading}>Exercises:</Text>

        {exercises.length > 0 ? (
          exercises.map((ex: any, i: number) => (
            <View key={i} style={styles.exerciseRow}>
              <Image
                source={exerciseImages[ex.image]} // ✅ Use local require map
                style={styles.exerciseImage}
              />
              <Text style={styles.exerciseText}>
                {ex.name} - {ex.sets}x{ex.reps} ({ex.time})
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "white" }}>No exercises available</Text>
        )}


        <View style={styles.buttonContainer}>
          <Button
            title="Start Session"
            color="#f67c23"
            onPress={() => navigation.navigate('SessionTracker', { workOutList })}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 10, textAlign: 'center' },
  workoutImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  infoContainer: { marginBottom: 15 },
  infoText: { color: '#fff', fontSize: 16, marginBottom: 4 },
  exerciseHeading: { fontSize: 20, fontWeight: '600', color: '#fff', marginBottom: 10 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  exerciseImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  exerciseText: { color: '#fff', fontSize: 16 },
  buttonContainer: { marginTop: 20, borderRadius: 8, overflow: 'hidden' },
});

// :any