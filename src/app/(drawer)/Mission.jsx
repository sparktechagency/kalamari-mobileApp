import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
const Mission = () => {
  return (
    <View style={tw`p-[4%] bg-primaryBg flex-1 `}>
      <View style={tw`flex-row items-center gap-2 my-4`}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-4.2 text-[#121212] font-bold`}>Our Mission</Text>
      </View>

      <View style={tw` flex-col gap-4 mt-6 `}>
        <Text style={tw` leading-6 text-4 font-inter-500  text-[#454545]`}>
          Great food can be found everywhere from fine dining rooms to
          late-night takeout, home-cooked meals to street food gems. But what
          truly makes a meal memorable isn’t just the taste, it’s the people you
          share it with.
        </Text>
        <Text
          style={tw`  text-4 font-inter-500  text-[#454545] leading-6 my-2`}
        >
          At our core, we believe food is a way to connect. A way to tell
          stories, pass down traditions, and bring people closer.
        </Text>
        <Text style={tw` leading-6 text-4 font-inter-500  text-[#454545]`}>
          That’s why we built this app to help you share your taste and capture
          the stories that come with every bite.
        </Text>
      </View>
    </View>
  );
};

export default Mission;
