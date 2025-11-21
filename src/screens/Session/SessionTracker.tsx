import React, { useState } from "react";
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Buttons from "../components/button";
import MyStatusBar from "../components/MyStatusBar";
import NavHeader from "../components/navHeader";

const ACCENT_ORANGE = '#FF8C00';
const PRIMARY_DARK = '#121212';
const CARD_BACKGROUND = '#1E1E1E';
const INPUT_BACKGROUND = '#2A2A2A';
const TEXT_COLOR = '#FFFFFF';
const TEXT_MUTED = '#B0B0B0';

export default function SessionTracker({ route, navigation }: any) {
  const { workOutList } = route.params;

  const exercisesArray = (() => {
    const ex = workOutList?.exercises;
    if (!ex) return [];
    if (typeof ex === "string") {
      try {
        return JSON.parse(ex);
      } catch {
        return [];
      }
    }
    if (Array.isArray(ex)) return ex;
    return [];
  })();

  const [exercises, setExercises] = useState(
    exercisesArray.map((e: any) => ({ name: e.name || e, sets: [{ reps: "", weight: "", notes: "", completed: false }] })) // Start with one set
  );

  const addSet = (exerciseIdx: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIdx].sets.push({ reps: "", weight: "", notes: "", completed: false });
    setExercises(newExercises);
  };

  const updateSet = (exerciseIdx: number, setIdx: number, field: string, value: any) => {
    const newExercises = [...exercises];
    newExercises[exerciseIdx].sets[setIdx][field] = value;
    setExercises(newExercises);
  };

  const toggleComplete = (exerciseIdx: number, setIdx: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIdx].sets[setIdx].completed = !newExercises[exerciseIdx].sets[setIdx].completed;
    setExercises(newExercises);
  };



  const formatSessionPayloadWithId = (workoutId: number, exercisesArray: any[]) => {
    const results: any = {};

    exercisesArray.forEach((ex) => {
      results[ex.name] = ex.sets.map((set: any) => ({
        reps: Number(set.reps),
        notes: set.notes,
        duration: workOutList.duration
      }));
    });

    return {
      workout_id: workoutId,
      duration: workOutList.duration,
      results,
    };
  };

  const renderSetHeader = () => (
    <View style={styles.setHeaderRow}>
      <Text style={styles.setHeaderText}>Set</Text>
      <Text style={styles.setHeaderText}>Reps</Text>
      <Text style={[styles.setHeaderText, { flex: 1 }]}>Notes</Text>
    </View>
  );

  return (
    <>
      <MyStatusBar
        backgroundColor={ACCENT_ORANGE}
        barStyle="light-content"
      />
      <NavHeader title="Session"   />
      <ScrollView style={styles.container}>
        {exercises.map((ex: any, exIdx: any) => (
          <View key={exIdx} style={styles.exerciseCard}>

            {renderSetHeader()}

            {ex.sets.map((set: any, setIdx: any) => (
              <View
                key={setIdx}
                style={[styles.setRow, set.completed && styles.setRowCompleted]}
              >

                <Text style={styles.setNumber}>{setIdx + 1}</Text>

                <TextInput
                  placeholder="Reps"
                  placeholderTextColor={TEXT_MUTED}
                  value={set.reps}
                    maxLength={2}
                  onChangeText={(val) => updateSet(exIdx, setIdx, "reps", val)}
                  style={styles.inputSmall}
                  keyboardType="numeric"
                />

                {/* <TextInput
                placeholder="Wt"
                placeholderTextColor={TEXT_MUTED}
                value={set.weight}
                onChangeText={(val) => updateSet(exIdx, setIdx, "weight", val)}
                style={styles.inputSmall}
                keyboardType="numeric"
              /> */}

                <TextInput
                  placeholder="Notes"
                    maxLength={152}
                  placeholderTextColor={TEXT_MUTED}
                  value={set.notes}
                  onChangeText={(val) => updateSet(exIdx, setIdx, "notes", val)}
                  style={styles.inputLarge}
                />


              </View>
            ))}

            {/* Modern 'Add Set' Button */}
            <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(exIdx)}>
              <Text style={styles.addSetText}>+ Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Buttons
          navigation={navigation}
          apiFunction="addSession"
          name="End Session & Save"
          reqBody={formatSessionPayloadWithId(workOutList.id, exercises)}
          buttonStyle={styles.endSessionButton}
          textStyle={styles.endSessionText}
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: PRIMARY_DARK },
  title: { fontSize: 26, fontWeight: "800", color: TEXT_COLOR, marginBottom: 20, textAlign: "center" },

  exerciseCard: { marginBottom: 25, padding: 15, backgroundColor: CARD_BACKGROUND, borderRadius: 12, elevation: 5 },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: ACCENT_ORANGE,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5
  },

  setHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  setHeaderText: {
    color: TEXT_MUTED,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    width: 50,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  setRowCompleted: {
    backgroundColor: '#282828',
    opacity: 0.8,
  },
  setNumber: {
    color: TEXT_MUTED,
    fontSize: 16,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'center',
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: INPUT_BACKGROUND,
    backgroundColor: INPUT_BACKGROUND,
    padding: 8,
    borderRadius: 6,
    color: TEXT_COLOR,
    width: 50,
    textAlign: 'center',
    fontSize: 14,
    height: 40,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: INPUT_BACKGROUND,
    backgroundColor: INPUT_BACKGROUND,
    padding: 8,
    borderRadius: 6,
    color: TEXT_COLOR,
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    height: 40,
  },
  completeBtn: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  },

  addSetButton: {
    backgroundColor: '#3A3A3A',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ACCENT_ORANGE,
  },
  addSetText: {
    color: ACCENT_ORANGE,
    fontWeight: '700',
    fontSize: 16,
  },
  endSessionButton: {
    backgroundColor: ACCENT_ORANGE,
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 5,
  },
  endSessionText: {
    color: PRIMARY_DARK,
    fontWeight: '800',
    fontSize: 18,
  },
});