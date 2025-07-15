import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";

const NotificationView = ({ item, handleNotificationPress, readIds }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        style={tw`mb-4`}
        activeOpacity={0.7}
      >
        <View
          style={tw`flex-row justify-between items-center ${
            item.read_at || readIds.includes(item.id) ? "" : "bg-[#D5D5D51A]"
          } p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{ uri: makeImage(item?.avatar) }}
              resizeMode="cover"
            />
            <View style={tw`flex-col gap-1`}>
              <View style={tw`flex-row items-center flex-wrap gap-1`}>
                <Text style={tw`text-3.2 font-inter-700`}>
                  {item?.user_name}
                </Text>
                <Text style={tw`text-3 text-textPrimary`}>
                  {item?.message || "just followed you."}
                </Text>
              </View>
              <Text style={tw`text-textgray`}>{item?.created_at}</Text>
            </View>
          </View>

          {item.read_at === null && !readIds.includes(item.id) && (
            <View style={tw`w-2 h-2 rounded-full bg-[#E53E3E]`} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationView;
