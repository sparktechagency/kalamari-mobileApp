// import tw from "@/src/lib/tailwind";
// import { makeImage } from "@/src/redux/api/baseApi";
// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useRef, useState } from "react";

// import {
//   Dimensions,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const TacoSlider = ({ images }) => {

//   const imageUrls = images.map((img) => makeImage(img));

//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollToIndex = (newIndex) => {
//     if (newIndex >= 0 && newIndex < imageUrls.length) {
//       flatListRef.current?.scrollToIndex({ animated: true, index: newIndex });
//       setCurrentIndex(newIndex);
//     }
//   };

//   const onScroll = (event) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / width);
//     setCurrentIndex(index);
//   };

//   return (
//     <View style={tw`relative items-center justify-center flex-1`}>
//       {/* Image Slider */}
//       <FlatList
//         ref={flatListRef}
//         horizontal
//         pagingEnabled
//         onScroll={onScroll}
//         scrollEventThrottle={10}
//         showsHorizontalScrollIndicator={false}
//         snapToAlignment="center"
//         keyExtractor={(_, index) => index.toString()}
//         data={imageUrls}
//         renderItem={({ item }) => (
//           <Image
//             source={{ uri: item.uri }}
//             resizeMode="cover"
//             style={{
//               width: width - 33,
//               height: 300,
//               marginRight: 6,
//               borderRadius: 8,
//             }}
//           />
//         )}
//       />

//       {/* Left Arrow */}
//       <TouchableOpacity
//         onPress={() => scrollToIndex(currentIndex - 1)}
//         disabled={currentIndex === 0}
//         style={[
//           tw`absolute left-2 top-1/2 -mt-4 bg-[#E2E2E2]  rounded-full`,
//           { opacity: currentIndex === 0 ? 0.5 : 1 },
//         ]}
//       >
//         <MaterialIcons name="keyboard-arrow-left" size={26} color="black" />
//       </TouchableOpacity>

//       {/* Right Arrow */}
//       <TouchableOpacity
//         onPress={() => scrollToIndex(currentIndex + 1)}
//         disabled={currentIndex === imageUrls.length - 1}
//         style={[
//           tw`absolute right-2 top-1/2 -mt-4 bg-[#E2E2E2]  rounded-full`,
//           { opacity: currentIndex === imageUrls.length - 1 ? 0.5 : 1 },
//         ]}
//       >
//         <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TacoSlider;

import tw from "@/src/lib/tailwind";
import { makeImage } from "@/src/redux/api/baseApi";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const TacoSlider = ({ images = [] }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image URLs (assumes makeImage returns a valid string)
  const imageUrls = images.map((img) => {
    const uri = typeof img === "string" ? makeImage(img) : img?.uri || "";
    return { uri };
  });

  // console.log(imageUrls);

  const scrollToIndex = (newIndex) => {
    if (newIndex >= 0 && newIndex < imageUrls.length) {
      flatListRef.current?.scrollToIndex({ animated: true, index: newIndex });
      setCurrentIndex(newIndex);
    }
  };

  if (!imageUrls?.length) return null;

  return (
    <View style={tw`relative items-center justify-center flex-1`}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        // onScroll={onScroll}
        scrollEventThrottle={10}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        keyExtractor={(_, index) => index.toString()}
        data={imageUrls}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.uri }}
            resizeMode="cover"
            style={{
              width: width - 33,
              height: 300,
              marginRight: 6,
              borderRadius: 8,
            }}
          />
        )}
      />

      {/* Left Arrow */}
      <TouchableOpacity
        onPress={() => scrollToIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
        style={[
          tw`absolute left-2 top-1/2 -mt-4 bg-[#E2E2E2] p-2 rounded-full`,
          { opacity: currentIndex === 0 ? 0.4 : 1 },
        ]}
      >
        <MaterialIcons name="keyboard-arrow-left" size={26} color="black" />
      </TouchableOpacity>

      {/* Right Arrow */}
      <TouchableOpacity
        onPress={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === imageUrls?.length - 1}
        style={[
          tw`absolute right-2 top-1/2 -mt-4 bg-[#E2E2E2] p-2 rounded-full`,
          { opacity: currentIndex === imageUrls?.length - 1 ? 0.4 : 1 },
        ]}
      >
        <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TacoSlider;
