import { IconRestruernt, IconStar } from "@/assets/Icon";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { cardViewDate } from "../../utils/cardViewDate";

const RandomUserRecentView = ({ item }) => {
  return (
    <View>
      <TouchableOpacity
        key={item?.id}
        onPress={() => router.push(`/notifications/${item?.id}`)}
      >
        <View style={tw`flex-col my-2 justify-between items-center`}>
          <View
            style={tw`flex-row bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
          >
            {/* Image */}

            {/* Content */}
            <View style={tw`flex-1`}>
              <View style={tw`flex-row justify-between items-start`}>
                {/* Title and Rating */}
                <View style={tw`flex-row`}>
                  <Image
                    // source={foodImage}
                    source={{ uri: makeImage(item?.photo[0]) }}
                    style={tw`w-18 h-18 rounded-[8px] mr-4`}
                  />
                  <View
                    style={tw`flex-col  ${
                      item?.location ? " justify-between" : "justify-start"
                    }   `}
                  >
                    <View style={tw`flex-col justify-between`}>
                      <Text
                        style={tw`text-base font-inter-700 text-textPrimary`}
                      >
                        {item?.meal_name}
                      </Text>

                      <View style={tw`flex-row items-center mt-1`}>
                        <SvgXml xml={item?.location && IconRestruernt} />
                        {item?.location && (
                          <Text
                            style={tw`text-[#454545] ml-1 font-inter-400 text-sm`}
                          >
                            {item?.location || "UnKnown"}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Tags */}
                    <View style={tw`flex-row `}>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545] mr-2`}
                      >
                        {item?.food_type}
                      </Text>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545]`}
                      >
                        {item?.have_it}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Location and Date */}
                <View style={tw`flex-col justify-between items-end `}>
                  {item?.rating && (
                    <View style={tw`flex-row items-center`}>
                      {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
                      <SvgXml xml={IconStar} />
                      <Text style={tw`ml-1 text-textPrimary font-inter-600`}>
                        {item?.rating}
                      </Text>
                    </View>
                  )}
                  <Text style={tw`text-[#454545] font-inter-400 text-sm mt-1`}>
                    {cardViewDate(item?.created_at)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RandomUserRecentView;
