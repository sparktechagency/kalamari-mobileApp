import { Image, Text, View } from "react-native";

import { Iconsfollower, IconVerifyProfile } from "@/assets/Icon";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const RandomUserProfile = () => {
  return (
    <View style={tw`px-2`}>
      <View style={tw`items-center bg-white rounded-3xl p-4`}>
        <View style={tw`relative`}>
          <Image
            source={{ uri: "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png" }}
            style={tw`w-20 h-20 rounded-full`}
          />
          <View style={tw`absolute bottom-0 right-0`}>
            <SvgXml xml={IconVerifyProfile} />
          </View>
        </View>
        <View style={tw`items-center mt-4`}>
          <Text style={tw`text-xl font-bold`}>Mark Phillips</Text>
          <Text style={tw`text-3 text-textgray`}>@marke_7</Text>
          <Text style={tw`text-center text-textgray mt-2`}>
            Food lover sharing my journey through bites, sips unforgettable
            meals 🍕🍔🌮
          </Text>
          <View style={tw`flex-row justify-center gap-2 mt-4`}>
            <View
              style={tw`flex-row items-center gap-1 bg-[#D5D5D51A] p-2 rounded-2 px-6`}
            >
              <SvgXml xml={Iconsfollower} />
              <Text>Followers:</Text>
              <Text style={tw`text-textPrimary font-bold`}>5.1k</Text>
            </View>
            <View
              style={tw`flex-row items-center gap-1 bg-[#D5D5D51A] p-2 rounded-2 px-6`}
            >
              <SvgXml xml={Iconsfollower} />
              <Text>Following:</Text>
              <Text style={tw`text-textPrimary font-bold`}>1.1k</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RandomUserProfile;
