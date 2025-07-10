// app/(drawer)/userfollowing/index.jsx
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   Pressable,
//   Text,
//   View,
// } from "react-native";
// import BackButton from "../../components/ui/BackButton";
// import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
// import tw from "../../lib/tailwind";
// import { makeImage } from "../../redux/api/baseApi";
// import { useGetUserAllFolloweQuery } from "../../redux/profileApi/profileApi";
// import { useGeRandomuserUserDiscoveryToggleFollowMutation } from "../../redux/randomuserApi/randomuserApi";

// export default function UserFollowing() {
//   const [isFollower, setIsFollower] = useState(false);
//   const [isFollowerId, setIsFollowerId] = useState(false);

//   const {
//     data: followerData,
//     isLoading,
//     refetch,
//   } = useGetUserAllFolloweQuery();
//   // console.log("followerData", followerData?.data?.data);
//   // const imageUrl = makeImage();

//   // console.log(followerData);

//   const [toggleFollow, { isLoading: toggleLoading }] =
//     useGeRandomuserUserDiscoveryToggleFollowMutation();

//   const handleFollow = async (id) => {
//     // console.log(id);

//     setIsFollower(!isFollower);

//     try {
//       const res = await toggleFollow({ user_id: id }).unwrap();

//       console.log("toggleFollow", res);

//       if (res?.status) {
//         // Toggle follow state
//         setIsFollower((prev) => !prev);

//         // Refetch to sync UI with backend
//         refetch();
//       }
//     } catch (error) {
//       console.error("Failed to toggle follow:", error);
//     }
//   };

//   const Data = ({ item }) => (
//     // log
//     <View style={tw`flex-col gap-4 p-[4%] `}>
//       {/* tah;a */}
//       <View
//         style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
//       >
//         <View style={tw`flex-row items-center gap-2`}>
//           <Image
//             style={tw`h-14 w-14 rounded-full`}
//             source={{
//               uri: makeImage(item?.item?.avatar) || DEFAULT_AVATAR,
//             }}
//           />
//           <Text style={tw`text-3.2 font-inter-700`}>{item?.item?.name}</Text>
//         </View>
//         <View>
//           <Pressable
//             onPress={() => handleFollow(item?.item?.id)}
//             style={tw`  ${
//               isFollower
//                 ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
//                 : "bg-orange"
//             }  py-1 px-5  rounded-full `}
//           >
//             <Text
//               style={tw` ${
//                 isFollower
//                   ? "text-[#B0B0B0] font-inter-700"
//                   : "text-white font-inter-700"
//               }  `}
//             >
//               {" "}
//               {isFollower ? "Following" : "Follow"}{" "}
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );

//   return isLoading ? (
//     <View style={tw`flex-1 justify-center items-center`}>
//       <ActivityIndicator size="large" color="#F97316" />
//     </View>
//   ) : (
//     <View style={tw`  flex-1 bg-primaryBg `}>
//       {/* when the api changes ScrollView and adds flatList  */}
//       <BackButton
//         onPress={() => {
//           router?.back();
//         }}
//         title={"Followers"}
//       />
//       {/*  */}
//       {/* <ScrollView showsVerticalScrollIndicator={false}>

//       </ScrollView> */}
//       <FlatList
//         data={followerData?.data?.data}
//         renderItem={(item) => <Data item={item} />}
//         keyExtractor={(item) => item?.id?.toString}
//       />
//     </View>
//   );
// }

import { router } from "expo-router"; // assumed navigation
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import BackButton from "../../components/ui/BackButton"; // assumed
import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useGetUserAllFolloweQuery } from "../../redux/profileApi/profileApi";
import { useGeRandomuserUserDiscoveryToggleFollowMutation } from "../../redux/randomuserApi/randomuserApi";

export default function UserFollowing() {
  const {
    data: followerData,
    isLoading,
    refetch,
    isFetching,
  } = useGetUserAllFolloweQuery();
  const [toggleFollow] = useGeRandomuserUserDiscoveryToggleFollowMutation();

  const [localFollowState, setLocalFollowState] = useState({});

  const handleFollow = async (id) => {
    try {
      // Optimistic UI update
      setLocalFollowState((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      const res = await toggleFollow({ user_id: id }).unwrap();

      if (!res?.status) {
        // Revert if API call fails
        setLocalFollowState((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      }

      refetch(); // Refetch to keep synced with server
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      // Revert on error
      // setLocalFollowState((prev) => ({
      //   ...prev,
      //   [id]: !prev[id],
      // }));
    }
  };

  const renderItem = ({ item }) => {
    const isFollowing =
      localFollowState[item.id] ?? item.status === "Following";

    return (
      <View style={tw`flex-col mb-3 px-[4%] `}>
        <View
          style={tw`bg-[#D5D5D51A] flex-row justify-between items-center p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{
                uri: makeImage(item.avatar) || DEFAULT_AVATAR,
              }}
            />
            <Text style={tw`text-3.2 font-inter-700`}>{item?.name}</Text>
          </View>

          <Pressable
            onPress={() => handleFollow(item.id)}
            disabled={isFollowing}
            style={tw`py-1 px-5 rounded-full ${
              isFollowing
                ? "border-2 border-[#B0B0B0] bg-[#B0B0B0]/20"
                : "bg-orange"
            }`}
          >
            <Text
              style={tw`font-inter-700 ${
                isFollowing ? "text-[#B0B0B0]" : "text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1 bg-primaryBg  `}>
      <BackButton onPress={() => router?.back()} title="Followers" />
      <FlatList
        data={followerData?.data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={["#F97316"]}
            tintColor="#F97316"
          />
        }
      />
    </View>
  );
}
