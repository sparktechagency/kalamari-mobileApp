import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import foodImage from "../../../assets/images/food-image.png";
import Icon from "../../../assets/images/restaurant.png";
import tw from "../../lib/tailwind";
import BookMark from "./BookMark";
import ListButtomSheet from "./ListButtomSheet";

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Recent = () => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };
  return (
    <View style={tw``}>
      {/* when the api changes ScrollView and adds flatList  */}
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              router?.push("/notifications/1");
            }}
          >
            <View style={tw`flex-col my-2 justify-between items-center`}>
              <View
                style={tw`flex-row gap-4 bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
              >
                {/* Image */}
                <Image source={foodImage} style={tw`w-18 h-18 rounded-[8px]`} />

                {/* Content */}
                <View style={tw`flex-1 px-2`}>
                  {/* Title and Rating */}
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text
                      style={tw`text-base  font-inter-700 text-textPrimary`}
                    >
                      Spaghetti Carbonara
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <FontAwesome name="star" size={16} color="#facc15" />
                      <Text style={tw`ml-1 text-textPrimary font-inter-600 `}>
                        2.8
                      </Text>
                    </View>
                  </View>

                  {/* Location and Date */}
                  <View style={tw`flex-row justify-between items-center mt-1`}>
                    <View style={tw`flex-row items-center`}>
                      <Image style={tw`w-4 h-4`} source={Icon} />
                      <Text
                        style={tw`text-[#454545] ml-1 font-inter-400 text-sm`}
                      >
                        78 Tampa, Florida
                      </Text>
                    </View>
                    <Text style={tw`text-[#454545] font-inter-400 text-sm`}>
                      07/04/2027
                    </Text>
                  </View>

                  {/* Tags */}
                  <View style={tw`flex-row justify-between items-center mt-2`}>
                    <View style={tw`flex-row gap-2`}>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545]`}
                      >
                        Meal
                      </Text>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545]`}
                      >
                        Restaurant
                      </Text>
                    </View>
                    {/* <Fontisto name="favorite" size={22} color="#0063E5" /> */}
                    <BookMark />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <ListButtomSheet
        bottomSheetRef={bottomSheetRef}
        openBottomSheet={openBottomSheet}
      />
    </View>
  );
};

export default Recent;
