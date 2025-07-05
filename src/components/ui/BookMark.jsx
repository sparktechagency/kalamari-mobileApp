// import { IconBookMark, IconBookMarkFull } from "@/assets/Icon";
// import tw from "@/src/lib/tailwind";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useState } from "react";
// import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";
// import { useUserBookMarkMutation } from "../../redux/listApi/listApi";

// import BookMarkCustomRadioButton from "./BookMarkCustomRadioButton";

// const BookMark = () => {
//   const [isBookMark, setIsBookMark] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   const handleBookmark = () => {
//     if (!isBookMark) {
//       // First time (add to bookmark)8
//       setIsBookMark(true);
//       setIsVisible(true); // Show modal
//     } else {
//       // Second time (remove from bookmark)
//       setIsBookMark(false);
//       Alert.alert(
//         "Remove Bookmark",
//         "Are you sure you want to remove this from bookmarks?",
//         [
//           {
//             text: "Cancel",
//             // onPress: () => console.log("Cancel Pressed"),
//             style: "cancel",
//           },
//         ],
//         { cancelable: true }
//       );
//     }
//   };

//   // restaurant, setRestaurant -> this hook
//   const [selectedOption, setSelectedOption] = useState("");

//   const [bookMark, { isLoading }] = useUserBookMarkMutation();

//   // meal, setMeal -> this hoos
//   const [selectedOptionFood, setSelectedOptionFood] = useState("");

//   const handleUserBookMark = () => {
//     console.log("ok");
//   };

//   return (
//     <View>
//       <View style={tw`justify-center items-center`}>
//         <TouchableOpacity onPress={handleBookmark}>
//           {isBookMark ? (
//             <SvgXml xml={IconBookMarkFull} />
//           ) : (
//             <SvgXml xml={IconBookMark} />
//           )}
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={isVisible}
//           onRequestClose={() => setIsVisible(false)}
//         >
//           <View style={tw`flex-1  justify-center items-center`}>
//             <View
//               style={tw`bg-[#FDFFFE] shadow-2xl flex-col gap-6 w-72 rounded-xl  p-6 `}
//             >
//               <View style={tw`bg-white flex-row justify-between  `}>
//                 <Text style={tw`text-textPrimary text-xl font-inter-700`}>
//                   Add to?
//                 </Text>
//                 <MaterialIcons
//                   onPress={() => setIsVisible(false)}
//                   name="close"
//                   size={24}
//                   color="black"
//                 />
//               </View>
//               <View style={tw`flex-col gap-2`}>
//                 <View style={tw`gap-2`}>
//                   <View style={tw`flex-col gap-2`}>
//                     <BookMarkCustomRadioButton
//                       label="Restaurant List"
//                       selected={selectedOption === "1"}
//                       onPress={() => setSelectedOption("1")}
//                     />
//                     <BookMarkCustomRadioButton
//                       label="Recipe List"
//                       selected={selectedOption === "2"}
//                       onPress={() => setSelectedOption("2")}
//                     />
//                   </View>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 onPress={() => {
//                   handleUserBookMark;
//                   setIsVisible(false);
//                 }}
//                 style={tw`bg-orange py-3 rounded-full w-full items-center`}
//               >
//                 <Text style={tw`text-white font-bold`}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };
// export default BookMark;

import { IconBookMark, IconBookMarkFull } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useUserBookMarkMutation } from "../../redux/listApi/listApi";
import BookMarkCustomRadioButton from "./BookMarkCustomRadioButton";

const BookMark = ({ postId }) => {
  // console.log("postId : ", postId);

  const [isBookMark, setIsBookMark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [bookMark, { isLoading }] = useUserBookMarkMutation();

  const handleBookmark = () => {
    if (!isBookMark) {
      setIsVisible(true); // Show modal for first time bookmark
    } else {
      Alert.alert(
        "Remove Bookmark",
        "Are you sure you want to remove this from bookmarks?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            onPress: async () => {
              try {
                await handleUserBookMark();
                setIsBookMark(false);
              } catch (error) {
                console.error("Failed to remove bookmark:", error);
              }
            },
            style: "destructive",
          },
        ]
      );
    }
  };

  const handleUserBookMark = async () => {
    try {
      const result = await bookMark({
        post_id: postId,
        type: selectedOption,
      }).unwrap();

      console.log(result);

      // if (result.success) {
      //   setIsBookMark(!isBookMark);
      // }
    } catch (error) {
      console.error("Bookmark error:", error);
      Alert.alert("Error", "Failed to update bookmark");
      throw error;
    }
  };

  return (
    <View style={tw`justify-center items-center`}>
      <TouchableOpacity onPress={handleBookmark} disabled={isLoading}>
        {isBookMark ? (
          <SvgXml xml={IconBookMarkFull} />
        ) : (
          <SvgXml xml={IconBookMark} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white shadow-lg rounded-xl w-72 p-6`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-inter-700 text-gray-900`}>
                Add to?
              </Text>
              <MaterialIcons
                name="close"
                size={24}
                color="black"
                onPress={() => setIsVisible(false)}
              />
            </View>

            <View style={tw`mb-6 flex-col gap-2`}>
              <BookMarkCustomRadioButton
                label="Restaurant List"
                selected={selectedOption === "1"}
                onPress={() => setSelectedOption("1")}
              />
              <BookMarkCustomRadioButton
                label="Recipe List"
                selected={selectedOption === "2"}
                onPress={() => setSelectedOption("2")}
              />
            </View>

            <TouchableOpacity
              onPress={async () => {
                await handleUserBookMark();
                setIsVisible(false);
              }}
              style={tw`bg-orange py-3 rounded-full w-full items-center ${
                !selectedOption ? "opacity-50" : "opacity-100"
              }`}
              disabled={!selectedOption || isLoading}
            >
              <Text style={tw`text-white font-inter-700`}>
                {isLoading ? "Saving..." : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookMark;
