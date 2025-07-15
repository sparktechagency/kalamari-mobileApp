import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import {
  useGetNotificationBySingleUserQuery,
  useNotificationReadAllMutation,
  useNotificationReadMutation,
} from "../../redux/notificationApi/notificationApi";
import { storage } from "../../utils/storage";

const Notifications = () => {
  const userString = storage.getString("user");
  const { id } = JSON.parse(userString);

  // API Hooks
  const {
    data: allNotification,
    isLoading: loadingNotification,
    refetch,
  } = useGetNotificationBySingleUserQuery({ user_id: id });
  const [readNotification, { isLoading: isReading }] =
    useNotificationReadMutation();

  const [readAll, { isLoading }] = useNotificationReadAllMutation();

  // State
  const [readIds, setReadIds] = useState([]);

  // Handlers
  const handleNotificationPress = useCallback(
    async (notification) => {
      // console.log("notification ", notification);

      if (notification?.redirect === "user_id") {
        return router.push(`randomuser/${notification.user_id}`);
      }

      try {
        // Mark as read if not already read
        if (!notification.read_at && !readIds.includes(notification.id)) {
          await readNotification({
            notification_id: [notification.id],
          }).unwrap();
          setReadIds((prev) => [...prev, notification.id]);
        }
        router.push(`notifications/${notification.post_id}`);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [readNotification, readIds]
  );

  const handleReadAll = async () => {
    try {
      await readAll().unwrap();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Render Items
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        style={tw`mb-4`}
        activeOpacity={0.7}
      >
        <View
          style={tw`flex-row justify-between items-center ${
            item.read_at || readIds.includes(item.id) ? "" : "bg-[#D5D5D51A]"
          } p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{ uri: makeImage(item?.avatar) }}
              resizeMode="cover"
            />
            <View style={tw`flex-col gap-1`}>
              <View style={tw`flex-row items-center flex-wrap gap-1`}>
                <Text style={tw`text-3.2 font-inter-700`}>
                  {item?.user_name}
                </Text>
                <Text style={tw`text-3 text-textPrimary`}>
                  {item?.message || "just followed you."}
                </Text>
              </View>
              <Text style={tw`text-textgray`}>{item?.created_at}</Text>
            </View>
          </View>

          {item.read_at === null && !readIds.includes(item.id) && (
            <View style={tw`w-2 h-2 rounded-full bg-[#E53E3E]`} />
          )}
        </View>
      </TouchableOpacity>
    ),
    []
  );

  // Loading States
  if (loadingNotification) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-primaryBg`}>
        <ActivityIndicator size="large" color="#ED6237" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-primaryBg`}>
      {/* Header */}
      <View style={tw`px-[4%] pt-4 mb-6 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-2 my-4`}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-5 text-[#121212] font-inter-700`}>
            Notifications
          </Text>
        </View>

        {/* Read all button */}
        {allNotification?.data?.some((n) => !n.read_at) && (
          <Pressable onPress={handleReadAll} disabled={isReading}>
            <Text style={tw`text-center text-[#ED6237] underline`}>
              {isReading ? "Processing..." : "Read all"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Notification List */}
      <FlatList
        data={allNotification?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={tw`px-[4%] pb-4`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-10`}>
            No notifications found.
          </Text>
        }
        refreshing={loadingNotification}
        onRefresh={refetch}
      />
    </View>
  );
};

export default Notifications;

// import { MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   Image,
//   Pressable,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "../../lib/tailwind";
// import { useGetAllNotificationQuery } from "../../redux/notificationApi/notificationApi";

// const Notifications = () => {
//   const [setIsFollowing, setIsFollowingsetIsFollowing] = useState(false);

//   const { data: allNotification, isLoading: loadingNotification } =
//     useGetAllNotificationQuery();
//   console.log(allNotification?.data?.total);

//   const [clicked, setClicked] = useState(false);

//   const handlePress = () => {
//     if (!clicked) {
//       // console.log(clicked);

//       setClicked(true); // only once
//     }

//     router.push("notifications/1");
//   };

//   return (
//     <View style={tw`flex-1 bg-primaryBg`}>
//       <View
//         style={tw`px-[4%] pt-4  mb-6 flex-row items-center justify-between`}
//       >
//         <View style={tw`flex-row items-center gap-2 my-4`}>
//           <TouchableOpacity
//             onPress={() => {
//               router?.back();
//             }}
//           >
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={tw`text-5 text-[#121212] font-inter-700`}>
//             Notifications
//           </Text>
//         </View>
//         {/*  */}
//         {/* Submit Button */}
//         <Pressable
//           // onPress={handleSubmit}
//           style={tw``}
//         >
//           <Text style={tw`text-center text-[#ED6237] underline`}>Read all</Text>
//         </Pressable>
//       </View>

//       {/* when the api changes ScrollView and adds flatList  */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={tw`p-[4%] flex-col gap-4 `}>
//           {/*  Notifications  */}
//           <TouchableOpacity onPress={handlePress} style={tw` `}>
//             <View
//               style={tw` flex-row justify-between items-center ${
//                 clicked ? "" : "bg-[#D5D5D51A]"
//               }  p-2 rounded-2 `}
//             >
//               <View style={tw`flex-row items-center gap-2`}>
//                 <Image
//                   style={tw`h-14 w-14 rounded-full`}
//                   source={{
//                     uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
//                   }}
//                 />
//                 <View style={tw`flex-col gap-1`}>
//                   <View style={tw`flex-row justify-center gap-1`}>
//                     <Text style={tw`text-3.2 font-inter-700 `}>Saka</Text>
//                     <Text style={tw`text-3 text-textPrimary`}>
//                       {" "}
//                       just followed you.
//                     </Text>
//                   </View>
//                   <View>
//                     <Text style={tw`  text-textgray `}> 09:31 PM</Text>
//                   </View>
//                 </View>
//               </View>
//               {clicked ? (
//                 ""
//               ) : (
//                 <View>
//                   <View style={tw`w-2 h-2 rounded-full bg-[#E53E3E]`} />
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Notifications;
