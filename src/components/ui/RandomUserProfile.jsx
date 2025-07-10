import { Image, Text, View } from "react-native";

import { Iconsfollower, IconVerifyProfile } from "@/assets/Icon";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import {
  useGetUserRandomuserFolloweQuery,
  useGetUserRandomuserFollowingQuery,
} from "../../redux/randomuserApi/randomuserApi";
import { DEFAULT_AVATAR } from "./CommentItem";

const RandomUserProfile = ({ randomUser, id }) => {
  // console.log("randomUser", randomUser);
  const { data: randomUserFollowe, isLoading: followeLoading } =
    useGetUserRandomuserFolloweQuery({
      user_id: id,
    });
  const { data: randomUserFollowing, isLoading: followingLoading } =
    useGetUserRandomuserFollowingQuery({
      user_id: id,
    });

  // console.log("randomUserFollowe ", randomUser?.data?.avatar);

  return (
    <View style={tw`px-2`}>
      <View style={tw`items-center bg-white rounded-3xl p-4`}>
        <View style={tw`relative`}>
          <Image
            source={{
              uri: makeImage(randomUser?.data?.avatar) || DEFAULT_AVATAR,
            }}
            style={tw`w-20 h-20 rounded-full`}
          />
          <View style={tw`absolute bottom-0 right-0`}>
            <SvgXml xml={IconVerifyProfile} />
          </View>
        </View>
        <View style={tw`items-center mt-4`}>
          <Text style={tw`text-xl font-bold`}>{randomUser?.data?.name} </Text>
          <Text style={tw`text-3 text-textgray`}>
            {randomUser?.data?.user_name}
          </Text>
          <Text style={tw`text-center text-textgray mt-2`}>
            {randomUser?.data?.bio ||
              "Food lover sharing my journey through bites, sips unforgettable meals 🍕🍔🌮"}
          </Text>
          <View style={tw`flex-row justify-center gap-2 mt-4`}>
            {followeLoading ? (
              ""
            ) : (
              <View
                style={tw`flex-row items-center gap-1 bg-[#D5D5D51A] p-2 rounded-2 px-6`}
              >
                <SvgXml xml={Iconsfollower} />
                <Text>Followers:</Text>
                <Text style={tw`text-textPrimary font-bold`}>
                  {randomUserFollowe?.follower_count}
                </Text>
              </View>
            )}
            {followingLoading ? (
              ""
            ) : (
              <View
                style={tw`flex-row items-center gap-1 bg-[#D5D5D51A] p-2 rounded-2 px-6`}
              >
                <SvgXml xml={Iconsfollower} />
                <Text>Following:</Text>
                <Text style={tw`text-textPrimary font-bold`}>
                  {randomUserFollowing?.following_count}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RandomUserProfile;
