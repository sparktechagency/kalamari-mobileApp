import { IconDelete, IconRestruernt, IconStar } from "@/assets/Icon";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import SimplifyDate from "../../utils/SimplifyDate";

const ProfileRanderItem = ({ item, handleDelete }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push(`/notifications/${item?.id}`)}
        key={item?.id}
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
                    source={item?.photo[0]}
                    style={tw`w-18 h-18 rounded-[8px] mr-4`}
                  />
                  <View style={tw`flex-col justify-between`}>
                    <View style={tw`flex-col justify-between`}>
                      <Text
                        style={tw`text-base font-inter-700 text-textPrimary`}
                      >
                        {item?.meal_name}
                      </Text>

                      <View style={tw`flex-row items-center mt-1`}>
                        <SvgXml xml={IconRestruernt} />
                        <Text
                          style={tw`text-[#454545] ml-1 font-inter-400 text-sm`}
                        >
                          {item?.location || "Home-Made"}
                        </Text>
                      </View>
                    </View>

                    {/* Tags */}
                    <View style={tw`flex-row `}>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545] mr-2`}
                      >
                        {item?.food_type}
                      </Text>
                      {item?.restaurant_name && (
                        <Text
                          style={tw`text-[12px] font-inter-600 text-[#454545]`}
                        >
                          {item?.restaurant_name}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                {/* Location and Date */}
                <View style={tw`flex-col justify-between items-end gap-1 `}>
                  <View style={tw`flex-row items-center`}>
                    {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
                    <SvgXml xml={IconStar} />
                    <Text style={tw`ml-1 text-textPrimary font-inter-600`}>
                      {item?.rating}
                    </Text>
                  </View>
                  {/*  */}
                  <View>
                    <Text style={tw`text-[#454545] font-inter-400 text-3 mt-1`}>
                      <SimplifyDate date={item?.created_at} />
                    </Text>
                  </View>
                  {/*  */}
                  <View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <SvgXml xml={IconDelete} width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileRanderItem;
