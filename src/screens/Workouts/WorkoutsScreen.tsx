import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { userexerciseList } from '../../service/api';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../components/MyStatusBar';
import NavHeader from '../components/navHeader';

const screenWidth = Dimensions.get('window').width;



export default function WorkoutsScreen({ navigation }: any) {
  const [workOutList, setWorkOutList] = useState()

  useEffect(() => {
    const loadProfile = async () => {
      try {

        const res = await userexerciseList()


        if (res.status == 200) {
          setWorkOutList(res?.data?.data)
        }
      } catch (err: any) {

        if (err.response) {
          // console.error("API Error:", err.response.data);
          // console.error("Status:", err.response.status);
        } else {
          // console.error("Network Error:", err.message);
        }

      }
    };

    loadProfile();
  }, []);

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
      <NavHeader title="Workouts" />
      <LinearGradient
        colors={['#000', '#000', '#000', 'rgb(246,124,35)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View>
          <FlatList
            data={workOutList}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {

              // Parse exercises JSON string → array
              const exercises =
                typeof item.exercises === "string"
                  ? JSON.parse(item.exercises)
                  : item.exercises;

              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("WorkoutDetail", { workOutList: item })
                  }
                >
                  <Image
                    source={workoutImages[item.images]}
                    style={styles.workoutImage}
                  />

                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardInfo}>Duration: {item.duration}</Text>
                  <Text style={styles.cardInfo}>Difficulty: {item.difficulty}</Text>
                  <Text style={styles.cardInfo}>Target: {item.target}</Text>
                  <Text style={styles.cardInfo}>Equipment: {item.equipment}</Text>
                  <Text style={styles.cardInfo}>Calories: {item.calories} kcal</Text>

                  <Text style={styles.exerciseHeading}>Exercises:</Text>

                  {Array.isArray(exercises) && exercises.length > 0 ? (
                    exercises.map((ex: any, i: number) => (
                      <View key={i} style={styles.exerciseRow}>
                        <Image
                          source={exerciseImages[ex.image]}
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
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  heading: { fontSize: 26, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 20 },
  card: {
    width: screenWidth - 40,
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  workoutImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 8 },
  cardInfo: { color: '#fff', fontSize: 14, marginBottom: 4 },
  exerciseHeading: { color: '#fff', fontSize: 16, fontWeight: '600', marginTop: 8, marginBottom: 4 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  exerciseImage: { width: 40, height: 40, borderRadius: 8, marginRight: 8 },
  exerciseText: { color: '#fff', fontSize: 14, flexShrink: 1 },
});


