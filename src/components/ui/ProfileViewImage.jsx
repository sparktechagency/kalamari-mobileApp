import { IconUserProfile } from "@/assets/Icon";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const ProfileViewImage = () => {
  return (
    <View style={tw`items-center `}>
      {/* <Image
              source={require("@/assets/images/image.png")} // Replace with your image
              style={tw`w-20 h-20 rounded-full`}
            />
            <Link
              style={tw`absolute bottom-0 right-32 bg-blue-500 p-2 rounded-full`}
              href={"/provers/1"}
            >
              <View>
              </View>
            </Link>
          </View> */}

      <View style={tw`relative`}>
        <Image
          source={require("@/assets/images/image.png")} // Replace with your image
          style={tw`w-20 h-20 rounded-full`}
        />
        {/* Verified Badge */}

        <Link
          style={tw`absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full`}
          href={"/provers/1"}
        >
          <SvgXml xml={IconUserProfile} />
        </Link>
      </View>
    </View>
  );
};

export default ProfileViewImage;
