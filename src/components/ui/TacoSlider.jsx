import tw from "@/src/lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy image data
const images = [
  { uri: "https://i.ibb.co/vvqhJ5qD/Rectangle-5040-1.png" },
  { uri: "https://i.ibb.co/vvqhJ5qD/Rectangle-5040-1.png" },
  { uri: "https://i.ibb.co/vvqhJ5qD/Rectangle-5040-1.png" },
  { uri: "https://i.ibb.co/vvqhJ5qD/Rectangle-5040-1.png" },
  { uri: "https://i.ibb.co/vvqhJ5qD/Rectangle-5040-1.png" },
];

const { width } = Dimensions.get("window");

const TacoSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (newIndex) => {
    if (newIndex >= 0 && newIndex < images.length) {
      flatListRef.current?.scrollToIndex({ animated: true, index: newIndex });
      setCurrentIndex(newIndex);
    }
  };

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={tw`relative items-center justify-center flex-1`}>
      {/* Image Slider */}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={10}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        keyExtractor={(_, index) => index.toString()}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
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
          tw`absolute left-2 top-1/2 -mt-4 bg-[#E2E2E2]  rounded-full`,
          { opacity: currentIndex === 0 ? 0.5 : 1 },
        ]}
      >
        <MaterialIcons name="keyboard-arrow-left" size={26} color="black" />
      </TouchableOpacity>

      {/* Right Arrow */}
      <TouchableOpacity
        onPress={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === images.length - 1}
        style={[
          tw`absolute right-2 top-1/2 -mt-4 bg-[#E2E2E2]  rounded-full`,
          { opacity: currentIndex === images.length - 1 ? 0.5 : 1 },
        ]}
      >
        <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TacoSlider;
