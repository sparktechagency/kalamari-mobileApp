import { IconUserProfile } from "@/assets/Icon";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { DEFAULT_AVATAR } from "./CommentItem";

const ProfileViewImage = ({ user }) => {
  // console.log("profile data", user);

  // console.log("profile data", ImageUrl + user?.avatar);

  // const images = makeImage(user?.avatar);

  // console.log("profile data", images);

  return (
    <View style={tw`items-center `}>
      <View style={tw`relative`}>
        <Image
          source={{
            // uri: "http://10.10.10.65:8000/storage/avatars/1751888039_865ca0da-c03f-4e15-b1a6-2f9eba2e5df5.jpeg",
            // uri: "http://10.10.10.65:8000/storage/avatars/1752042327_7c542c19-a77f-4b53-98c0-db30f369db4d.jpeg",
            uri: makeImage(user?.avatar) || DEFAULT_AVATAR,
          }}
          style={tw`w-20 h-20 rounded-full`}
        />

        {/* Verified Badge */}
        <Link
          style={tw`absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full`}
          href={`/provers/${user?.id}`}
        >
          <SvgXml xml={IconUserProfile} />
        </Link>
      </View>
    </View>
  );
};

export default ProfileViewImage;
