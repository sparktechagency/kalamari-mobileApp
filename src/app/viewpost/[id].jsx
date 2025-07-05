import { IconLOcation, IconRestruernt } from "@/assets/Icon";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const ViewSinglePost = () => {
  const { index } = useLocalSearchParams();
  // console.log(index);

  return (
    <View style={tw`p-[4%]`}>
      <TouchableOpacity
        onPress={() => {
          router?.back();
        }}
      >
        <View style={tw`flex-row items-center gap-2 my-4`}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={tw`text-4.2 text-[#121212] font-bold`}>
            Post No {index}
          </Text>
        </View>
      </TouchableOpacity>

      {/* tan */}
      <View style={tw` p-4 mb-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-3`}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
            style={tw`w-10 h-10 rounded-full mr-3`}
          />
          <View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-semibold text-base mr-1`}>Emma Johnson</Text>
              <MaterialCommunityIcons
                name="check-decagram"
                size={16}
                color="#3b82f6"
              />
            </View>
            <View style={tw`flex-row gap-2 items-center `}>
              <View style={tw`flex-row gap-1 items-center `}>
                <SvgXml xml={IconRestruernt} />
                <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
                  Pizzaburg
                </Text>
              </View>
              <View style={tw`flex-row gap-1 items-center `}>
                <SvgXml xml={IconLOcation} />
                <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
                  dhaka,
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
          }}
          style={tw`w-full h-52 rounded-xl mb-3`}
          resizeMode="cover"
        />

        {/* Interaction stats */}
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <View style={tw`flex-row `}>
            <View style={tw`flex-row items-center`}>
              <FontAwesome name="heart" size={18} color="red" />
              <Text style={tw`ml-1 text-sm text-gray-700`}>1,578</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Feather name="message-circle" size={18} color="gray" />
              <Text style={tw`ml-1 text-sm text-gray-700`}>24</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="star" size={16} color="#facc15" />
            <Text style={tw`ml-1 text-sm font-semibold`}>4.0</Text>
          </View>
        </View>

        {/* Title & Info */}
        <Text style={tw`text-lg font-semibold mb-1`}>Spicy taco</Text>
        <Text style={tw`text-sm text-gray-500 mb-1`}>Meal · Restaurant</Text>
        <Text style={tw`text-xs text-gray-400 mb-2`}>03/15/2026</Text>

        {/* Description */}
        <Text style={tw`text-sm text-gray-700`}>
          Indulge in a creamy fettuccine Alfredo, tossed with tender chicken and
          fresh parsley.
        </Text>
      </View>
    </View>
  );
};

export default ViewSinglePost;
