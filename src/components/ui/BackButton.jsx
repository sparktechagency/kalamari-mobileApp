import { IconBackButton } from "@/assets/Icon";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const BackButton = ({ title, onPress }) => {
  return (
    <View style={tw`px-[4%] pt-4  mb-6`}>
      <View style={tw`flex-row items-center gap-2 my-4`}>
        <TouchableOpacity onPress={onPress}>
          <SvgXml xml={IconBackButton} />
        </TouchableOpacity>
        <Text style={tw`text-5 text-[#121212] font-inter-700`}>{title}</Text>
      </View>
    </View>
  );
};

export default BackButton;
