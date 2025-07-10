// import { router } from "expo-router";
// import { useEffect, useState } from "react";
// import { FlatList, Image, Pressable, Text, View } from "react-native";
// import BackButton from "../../components/ui/BackButton";
// import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
// import tw from "../../lib/tailwind";
// import { makeImage } from "../../redux/api/baseApi";
// import { useGetUserAllFollowingQuery } from "../../redux/profileApi/profileApi";

// const Following = () => {
//   const [setIsFollowing, setIsFollowingsetIsFollowing] = useState(false);

//   const handleFollow = () => setIsFollowingsetIsFollowing(!setIsFollowing);

//   const { data: following, refatch } = useGetUserAllFollowingQuery();
//   // console.log();

//   useEffect(() => {
//     refatch();
//   }, [refatch]);

//   const Data = ({ item }) => (
//     <View style={tw`p-[4%] flex-col gap-4`}>
//       {/*  following  user content wrapp   */}
//       <View
//         style={tw` flex-row justify-between items-center bg-[#D5D5D51A] p-2 rounded-2 `}
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
//             onPress={handleFollow}
//             style={tw`  ${
//               setIsFollowing ? " bg-[#E53E3E]  " : " border-2 border-[#E53E3E] "
//             }  py-1 px-5  rounded-full `}
//           >
//             <Text
//               style={tw` ${
//                 setIsFollowing
//                   ? "text-white text-3 font-inter-700"
//                   : "text-[#E53E3E] font-inter-700"
//               }  `}
//             >
//               {" "}
//               {setIsFollowing ? "Follow" : "Unfollow"}{" "}
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//       {/*  following  user content wrapp   */}
//     </View>
//   );

//   // const data = [1, 2, 3, 4, 5, 6];

//   return (
//     <View style={tw`flex-1 bg-primaryBg`}>
//       {/* when the api changes ScrollView and adds flatList  */}

//       <BackButton
//         onPress={() => {
//           router?.back();
//         }}
//         title={"Following"}
//       />

//       {/*  */}
//       <FlatList
//         data={following?.data?.data}
//         renderItem={(item) => <Data item={item} />}
//         keyExtractor={(item) => item?.id?.toString}
//       />
//     </View>
//   );
// };

// export default Following;

import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import BackButton from "../../components/ui/BackButton";
import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useGetUserAllFollowingQuery } from "../../redux/profileApi/profileApi";

const Following = () => {
  const {
    data: following,
    refetch,
    isLoading,
    isFetching,
  } = useGetUserAllFollowingQuery();

  // console.log("following", following);

  // local follow state map: { [userId]: true/false }
  const [localFollowState, setLocalFollowState] = useState({});

  useEffect(() => {
    refetch();
  }, []);

  const handleFollowToggle = (userId) => {
    setLocalFollowState((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const renderItem = ({ item }) => {
    const isFollowing = localFollowState[item?.id] ?? true;

    return (
      <View style={tw`p-[4%] flex-col gap-4`}>
        <View
          style={tw`flex-row justify-between items-center bg-[#D5D5D51A] p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{
                uri: makeImage(item?.avatar) || DEFAULT_AVATAR,
              }}
            />
            <Text style={tw`text-3.2 font-inter-700`}>{item?.name}</Text>
          </View>

          <Pressable
            onPress={() => handleFollowToggle(item?.id)}
            style={tw`py-1 px-5 rounded-full ${
              isFollowing ? "border-2 border-[#E53E3E]" : "bg-[#E53E3E]"
            }`}
          >
            <Text
              style={tw`font-inter-700 text-3 ${
                isFollowing ? "text-[#E53E3E]" : "text-white"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-primaryBg`}>
      <BackButton onPress={() => router?.back()} title="Following" />
      <FlatList
        data={following?.data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isFetching}
            colors={["#F97316"]}
            tintColor="#F97316"
          />
        }
      />
    </View>
  );
};

export default Following;

// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   Pressable,
//   RefreshControl,
//   Text,
//   View,
// } from "react-native";
// import BackButton from "../../components/ui/BackButton";
// import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
// import tw from "../../lib/tailwind";
// import { makeImage } from "../../redux/api/baseApi";
// import { useGetUserAllFollowingQuery } from "../../redux/profileApi/profileApi";

// const Following = () => {
//   const {
//     data: following,
//     refetch,
//     isFetching,
//     isLoading,
//   } = useGetUserAllFollowingQuery();

//   const [localFollowState, setLocalFollowState] = useState({});

//   const handleFollowToggle = (userId) => {
//     setLocalFollowState((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   const renderItem = ({ item }) => {
//     const isFollowing = localFollowState[item.id] ?? true;

//     return (
//       <View style={tw`p-[4%] flex-col gap-4`}>
//         <View
//           style={tw`flex-row justify-between items-center bg-[#D5D5D51A] p-2 rounded-2`}
//         >
//           <View style={tw`flex-row items-center gap-2`}>
//             <Image
//               style={tw`h-14 w-14 rounded-full`}
//               source={{
//                 uri: makeImage(item.avatar) || DEFAULT_AVATAR,
//               }}
//             />
//             <Text style={tw`text-3.2 font-inter-700`}>{item.name}</Text>
//           </View>

//           <Pressable
//             onPress={() => handleFollowToggle(item.id)}
//             style={tw`py-1 px-5 rounded-full ${
//               isFollowing ? "border-2 border-[#E53E3E]" : "bg-[#E53E3E]"
//             }`}
//           >
//             <Text
//               style={tw`font-inter-700 text-3 ${
//                 isFollowing ? "text-[#E53E3E]" : "text-white"
//               }`}
//             >
//               {isFollowing ? "Unfollow" : "Follow"}
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   if (isLoading) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#F97316" />
//       </View>
//     );
//   }

//   return (
//     <View style={tw`flex-1 bg-primaryBg`}>
//       <BackButton onPress={() => router?.back()} title="Following" />

//       <FlatList
//         data={following?.data?.data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item?.id?.toString()}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={isFetching}
//             onRefresh={refetch}
//             colors={["#F97316"]}
//             tintColor="#F97316"
//           />
//         }
//       />
//     </View>
//   );
// };

// export default Following;
