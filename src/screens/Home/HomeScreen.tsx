// import React from 'react';
// import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import MyStatusBar from '../components/MyStatusBar';
// import NavHeader from '../components/navHeader';

// const screenWidth = Dimensions.get('window').width;

// export default function HomeScreen({ navigation }: any) {
//   const cards = [
//     {
//       title: 'Workouts',
//       screen: 'Workouts',
//       image: require('../../../assets/images/deadlift.jpg')
//     },
//     {
//       title: 'History',
//       screen: 'History',
//       image: require('../../../assets/images/history.jpg')
//     },
//     {
//       title: 'Metrics',
//       screen: 'Metrics',
//       image: require('../../../assets/images/Metrics.jpg')
//     },
//     {
//       title: 'Profile',
//       screen: 'Profile',
//       image: require('../../../assets/images/Profile.jpg')
//     },
//   ];


//   return (
//     <>
//       <MyStatusBar
//         backgroundColor={'rgb(246,124,35)'}
//         barStyle="light-content"
//       />
//       <NavHeader title="Home" showBack={false}/>
//       <LinearGradient
//         colors={['#000', '#000', '#000', 'rgb(246,124,35)']}
//         start={{ x: 1, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.container}
//       >

//         <View >
//           <FlatList
//             data={cards}
//             numColumns={2}
//             columnWrapperStyle={{ justifyContent: "space-between" }}
//             keyExtractor={(item): any => item.title}
//             renderItem={({ item }: any) => (
//               <View style={styles.wrapper}>
//                 <TouchableOpacity
//                   style={styles.card}
//                   onPress={() => navigation.navigate(item.screen)}
//                 >
//                   <Image source={item.image} style={styles.cardImage} />
//                 </TouchableOpacity>

//                 <Text style={styles.cardText}>{item.title}</Text>
//               </View>

//             )}
//           />
//         </View>
//       </LinearGradient>

//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(27, 27, 27, 1)',
//     paddingTop: 70,
//     paddingHorizontal: 10
//   },
//   wrapper: {
//     width: '48%',
//     alignItems: 'center',
//     padding: 10
//   },

//   card: {
//     width: '100%',
//     height: 140,
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 2,
//   },

//   cardImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },

//   cardText: {
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'rgba(244, 108, 11, 1)',
//     textAlign: 'center',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../components/MyStatusBar';
import NavHeader from '../components/navHeader';

const screenWidth = Dimensions.get('window').width;

const PRIMARY_DARK = '#121212';
const ACCENT_ORANGE = '#FF8C00';
const SECONDARY_DARK = '#282828';
const TEXT_MUTED = '#B0B0B0';

const ProgressTracker = ({ navigation }: any) => (
  <View style={progressStyles.progressContainer}>
    <Text style={progressStyles.heading}>Today's Progress </Text>
    <View style={progressStyles.statsRow}>

      <View style={progressStyles.statCard}>
        <Text style={progressStyles.statValue}>550</Text>
        <Text style={progressStyles.statLabel}>Kcal Burned</Text>
        <View style={[progressStyles.progressPill, { width: '80%' }]} />
      </View>

      <View style={progressStyles.statCard}>
        <Text style={progressStyles.statValue}>8,124</Text>
        <Text style={progressStyles.statLabel}>Steps</Text>
        <View style={[progressStyles.progressPill, { width: '60%', backgroundColor: '#00D1FF' }]} />
      </View>

    </View>

    {/* <TouchableOpacity  style={progressStyles.ctaButton}>
      <Text style={progressStyles.ctaText}>Train Hard</Text>
    </TouchableOpacity> */}

  </View>
);



export default function HomeScreen({ navigation }: any) {
  const cards = [
    { title: 'Workouts', screen: 'Workouts', image: require('../../../assets/images/workouts.png') },
    { title: 'History', screen: 'History', image: require('../../../assets/images/history.png') },
    { title: 'Metrics', screen: 'Metrics', image: require('../../../assets/images/Metrics.png') },
    { title: 'Profile', screen: 'Profile', image: require('../../../assets/images/Profile.jpg') },
  ];
  const CardItem = ({ item }: { item: typeof cards[0] }) => (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen)}
      >
        <Image source={item.image} style={styles.cardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.textOverlay}
        >
          <Text style={styles.cardTextOverlay}>{item.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <MyStatusBar
        backgroundColor={ACCENT_ORANGE}
        barStyle="light-content"
      />
        <NavHeader title="Home" showBack={false} />


      <ScrollView style={styles.scrollViewContent}>
        <ProgressTracker />

        <View style={styles.listContainer}>
          <Text style={styles.sectionHeading}>Quick Navigation</Text>
          <FlatList
            data={cards}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyExtractor={(item): any => item.title}
            renderItem={CardItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  progressContainer: {
    padding: 15,
    backgroundColor: PRIMARY_DARK,
  },
  heading: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    width: '48%',
    backgroundColor: SECONDARY_DARK,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  statValue: {
    color: ACCENT_ORANGE,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: TEXT_MUTED,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
  },
  progressPill: {
    height: 6,
    backgroundColor: ACCENT_ORANGE,
    borderRadius: 3,
  },
  ctaButton: {
    backgroundColor: ACCENT_ORANGE,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaText: {
    color: PRIMARY_DARK,
    fontSize: 18,
    fontWeight: '800',
  },
});


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: PRIMARY_DARK,
  },
  scrollViewContent: {
    flex: 1,
  },
  sectionHeading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 5,
  },
  listContainer: {
    padding: 10,
    paddingTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  wrapper: {
    width: '48%',
  },
  card: {
    width: '100%',
    height: screenWidth * 0.45,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  cardTextOverlay: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

