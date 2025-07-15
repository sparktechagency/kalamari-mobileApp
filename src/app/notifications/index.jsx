// import { MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useCallback, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Pressable,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import NotificationView from "../../components/ui/NotificationView";
// import tw from "../../lib/tailwind";
// import {
//   useGetNotificationBySingleUserQuery,
//   useNotificationReadAllMutation,
//   useNotificationReadMutation,
// } from "../../redux/notificationApi/notificationApi";
// import { storage } from "../../utils/storage";

// const Notifications = () => {
//   const userString = storage.getString("user");
//   const { id } = JSON.parse(userString);

//   // API Hooks
//   const {
//     data: allNotification,
//     isLoading: loadingNotification,
//     refetch,
//   } = useGetNotificationBySingleUserQuery({ user_id: id });
//   const [readNotification, { isLoading: isReading }] =
//     useNotificationReadMutation();

//   const [readAll, { isLoading }] = useNotificationReadAllMutation();

//   // State
//   const [readIds, setReadIds] = useState([]);

//   // Handlers
//   const handleNotificationPress = useCallback(
//     async (notification) => {
//       // console.log("notification ", notification);

//       if (notification?.redirect === "user_id") {
//         return router.push(`randomuser/${notification.user_id}`);
//       }

//       try {
//         // Mark as read if not already read
//         if (!notification.read_at && !readIds.includes(notification.id)) {
//           await readNotification({
//             notification_id: [notification.id],
//           }).unwrap();
//           setReadIds((prev) => [...prev, notification.id]);
//         }
//         router.push(`notifications/${notification.post_id}`);
//       } catch (error) {
//         console.error("Error marking notification as read:", error);
//       }
//     },
//     [readNotification, readIds]
//   );

//   const handleReadAll = async () => {
//     try {
//       await readAll().unwrap();
//       // console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Loading States
//   if (loadingNotification) {
//     return (
//       <View style={tw`flex-1 justify-center items-center bg-primaryBg`}>
//         <ActivityIndicator size="large" color="#ED6237" />
//       </View>
//     );
//   }

//   return (
//     <View style={tw`flex-1 bg-primaryBg`}>
//       {/* Header */}
//       <View style={tw`px-[4%] pt-4 mb-3 flex-row items-center justify-between`}>
//         <View style={tw`flex-row items-center gap-2 my-4`}>
//           <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={tw`text-5 text-[#121212] font-inter-700`}>
//             Notifications
//           </Text>
//         </View>

//         {/* Read all button */}
//         {allNotification?.data?.some((n) => !n.read_at) && (
//           <Pressable onPress={handleReadAll} disabled={isReading}>
//             <Text style={tw`text-center text-[#ED6237] underline`}>
//               {isReading ? "Processing..." : "Read all"}
//             </Text>
//           </Pressable>
//         )}
//       </View>

//       {/* Notification List */}
//       <FlatList
//         data={allNotification?.data}
//         keyExtractor={(item) => item?.id?.toString()}
//         renderItem={({ item }) => (
//           <NotificationView
//             item={item}
//             handleNotificationPress={handleNotificationPress}
//             readIds={readIds}
//           />
//         )}
//         contentContainerStyle={tw`px-[4%] pb-4`}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={10}
//         maxToRenderPerBatch={5}
//         windowSize={5}
//         ListEmptyComponent={
//           <Text style={tw`text-center text-gray-500 mt-10`}>
//             No notifications found.
//           </Text>
//         }
//         refreshing={loadingNotification}
//         onRefresh={refetch}
//       />
//     </View>
//   );
// };

// export default Notifications;

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationView from "../../components/ui/NotificationView";
import tw from "../../lib/tailwind";
import {
  useGetNotificationBySingleUserQuery,
  useNotificationReadAllMutation,
  useNotificationReadMutation,
} from "../../redux/notificationApi/notificationApi";
import { storage } from "../../utils/storage";

const Notifications = () => {
  const userString = storage.getString("user");
  const { id } = JSON.parse(userString || "{}");

  // API Hooks
  const {
    data: allNotification,
    isLoading: isFetchingNotification,
    refetch,
  } = useGetNotificationBySingleUserQuery({ user_id: id });

  const [readNotification, { isLoading: isReading }] =
    useNotificationReadMutation();
  const [readAll, { isLoading: isReadingAll }] =
    useNotificationReadAllMutation();

  // Local state
  const [readIds, setReadIds] = useState([]);

  const notifications = useMemo(
    () => allNotification?.data || [],
    [allNotification]
  );

  const handleNotificationPress = useCallback(
    async (notification) => {
      try {
        if (!notification.read_at && !readIds.includes(notification.id)) {
          await readNotification({
            notification_id: [notification.id],
          }).unwrap();
          setReadIds((prev) => [...prev, notification.id]);
        }

        if (notification?.redirect === "user_id") {
          router.push(`randomuser/${notification.user_id}`);
        } else {
          router.push(`notifications/${notification.post_id}`);
        }
      } catch (error) {
        console.error("Notification press error:", error);
      }
    },
    [readNotification, readIds]
  );

  const handleReadAll = async () => {
    try {
      await readAll().unwrap();
      refetch();
    } catch (error) {
      console.error("Read all failed:", error);
    }
  };

  if (isFetchingNotification) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-primaryBg`}>
        <ActivityIndicator size="large" color="#ED6237" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-primaryBg`}>
      {/* Header */}
      <View style={tw`px-[4%] pt-4 mb-3 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-2 my-4`}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#121212" />
          </TouchableOpacity>
          <Text style={tw`text-5 text-[#121212] font-inter-700`}>
            Notifications
          </Text>
        </View>

        {notifications.some((n) => !n.read_at) && (
          <Pressable onPress={handleReadAll} disabled={isReadingAll}>
            <Text style={tw`text-[#ED6237] underline`}>
              {isReadingAll ? "Marking..." : "Read all"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationView
            item={item}
            handleNotificationPress={handleNotificationPress}
            readIds={readIds}
          />
        )}
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
        refreshControl={
          <RefreshControl
            refreshing={isFetchingNotification}
            onRefresh={refetch}
            colors={["#ED6237"]} // Android spinner color
            tintColor="#ED6237" // iOS spinner color
            progressBackgroundColor="#fff" // Android background circle color
          />
        }
      />
    </View>
  );
};

export default Notifications;
