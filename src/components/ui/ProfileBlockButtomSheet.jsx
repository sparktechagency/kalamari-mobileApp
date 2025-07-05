// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import { Button } from "@react-navigation/elements";
// import { useCallback, useMemo, useRef } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const ProfileBlockButtomSheet = () => {
//   const bottomSheetRef = useRef(null);

//   // Snap points (height of the sheet)
//   const snapPoints = useMemo(() => ["25%", "50%"], []);

//   // Sheet change handler
//   const handleSheetChanges = useCallback((index) => {
//     // console.log("Sheet position changed to:", index);
//   }, []);

//   // Open bottom sheet manually
//   const openSheet = () => {
//     bottomSheetRef.current?.snapToIndex(0); // Open at 25%
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.content}>
//         {/* <TouchableOpacity onPress={openSheet}>
//           <SvgXml xml={IconsTopDropDown} />
//         </TouchableOpacity> */}
//         <Button title="Open Bottom Sheet" onPress={openSheet} />
//       </View>

//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1} // initially closed
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <BottomSheetView style={styles.sheetContent}>
//           <Text style={styles.sheetText}>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// export default ProfileBlockButtomSheet;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sheetContent: {
//     flex: 1,
//     alignItems: "center",
//     padding: 20,
//   },
//   sheetText: {
//     fontSize: 18,
//   },
// });
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProfileBlockBottomSheet = () => {
  const bottomSheetRef = useRef(null);

  // Snap points (height of the sheet)
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Sheet change handler
  const handleSheetChanges = useCallback((index) => {
    console.log("Sheet position changed to:", index);
  }, []);

  // Open bottom sheet manually
  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // Open at 25%
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.content}>
        {/* <Button title=". . ." onPress={openSheet} /> */}
        <TouchableOpacity onPress={openSheet}>
          <Text>jfdlk</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // initially closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // optional: allows swiping down to close
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetText}>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default ProfileBlockBottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  sheetText: {
    fontSize: 18,
  },
});
