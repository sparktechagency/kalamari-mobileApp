// ProfileCard.tsx
import { IconRecents, Iconsfollower } from "@/assets/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import ProfileViewImage from "../../../components/ui/ProfileViewImage";
import RecentActivityList from "../../../components/ui/RecentActivityListRandomUser";
import tw from "../../../lib/tailwind";
import { useGetProfileQuery } from "../../../redux/apiSlices/authApiSlice";
import {
  useGetUserFolloweQuery,
  useGetUserFollowingQuery,
} from "../../../redux/profileApi/profileApi";

// tabs name and icons

const Profile = () => {
  const { data: useData, isLoading, refetch } = useGetProfileQuery();
  // console.log("useData", useData);

  // useGetUserFollowingQuery
  const {
    data: getUserFollowing,
    isLoading: followingLoading,
    refetch: followingRefetch,
    isFetching,
  } = useGetUserFollowingQuery({
    user_id: useData?.data?.id,
  });

  // useGetUserFolloweQuery
  const { data: getUserFollow, isLoading: followLoading } =
    useGetUserFolloweQuery({
      user_id: useData?.data?.id,
    });

  useEffect(() => {
    followingRefetch();
    refetch();
  }, [followingRefetch, refetch]);

  // console.log("getUserFollow : ", useData);

  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw` flex-1  bg-primaryBg`}>
      <View style={tw` flex-1 px-[4%]`}>
        <View style={tw`flex-row items-center gap-2 my-6`}>
          <TouchableOpacity
            onPress={() => {
              router?.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-4.2 text-[#121212] font-bold`}> My Profile</Text>
        </View>
        {/* <Text style={tw`text-4.2 mt-8 text-[#121212] font-bold mb-5.2`}>
          My Profile
        </Text> */}
        <View style={tw`mb-3`}>
          {/* Profile image and badge */}
          <View style={tw``}>
            <ProfileViewImage user={useData?.data} />
          </View>

          {/* Name and handle */}
          <View style={tw`mt-4 items-center`}>
            <Text style={tw`text-xl font-inter-700`}>
              {useData?.data?.name}
            </Text>
            <Text style={tw`text-3 text-textgray font-inter-500`}>
              {useData?.data?.user_name}
            </Text>
          </View>

          {/* Bio */}
          <Text style={tw`text-center text-textgray mt-4 leading-6`}>
            {useData?.data?.bio ||
              "Food lover sharing my journey through bites, sips unforgettable meals 🍕🍔🌮"}
          </Text>

          {/* Follower stats */}
          <View style={tw`flex-row mt-4  justify-center  gap-2`}>
            <TouchableOpacity>
              <Link href={"/userfollowing"}>
                <View
                  style={tw`items-center bg-[#D5D5D51A] justify-center flex-row gap-1.3  p-2 rounded-2 px-6 `}
                >
                  <SvgXml xml={Iconsfollower} />
                  <Text style={tw` font-inter-400 `}>Followers:</Text>
                  {followLoading ? (
                    ""
                  ) : (
                    <Text style={tw`text-textPrimary font-inter-700`}>
                      {getUserFollow?.follower_count}
                    </Text>
                  )}
                </View>
              </Link>
            </TouchableOpacity>
            {/* Following stats */}
            <TouchableOpacity>
              <Link href={"/userfollowing/following"}>
                <View
                  style={tw`items-center bg-[#D5D5D51A] justify-center flex-row gap-1.3  p-2 rounded-2 px-6 `}
                >
                  <SvgXml xml={Iconsfollower} />
                  <Text style={tw` font-inter-400 `}>Following:</Text>
                  {followingLoading ? (
                    ""
                  ) : (
                    <Text style={tw`text-textPrimary font-inter-700`}>
                      {getUserFollowing?.following_count}
                    </Text>
                  )}
                </View>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* */}
        <View style={tw`flex-1`}>
          <View style={tw` `}>
            <View style={tw`flex-row items-center gap-2 my-2`}>
              <SvgXml xml={IconRecents} />
              <Text style={tw`text-4 text-[#121212] font-inter-700`}>
                Recents
              </Text>
            </View>
          </View>

          <RecentActivityList />
        </View>
      </View>
    </View>
  );
};

export default Profile;
