import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { useGetAllNotificationQuery } from "../../redux/notificationApi/notificationApi";

const Notifications = () => {
  const { data: allNotification, isLoading: loadingNotification } =
    useGetAllNotificationQuery();
  console.log("allNotification", allNotification);

  const [clickedIds, setClickedIds] = useState([]);

  const handlePress = (id) => {
    if (!clickedIds.includes(id)) {
      setClickedIds((prev) => [...prev, id]); // mark as clicked
    }

    router.push(`notifications/${id}`); // navigate to detail
  };

  const renderItem = ({ item }) => {
    const isClicked = clickedIds.includes(item?.id);

    return (
      <TouchableOpacity onPress={() => handlePress(item?.id)} style={tw`mb-4`}>
        <View
          style={tw`flex-row justify-between items-center ${
            isClicked ? "" : "bg-[#D5D5D51A]"
          } p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{
                uri:
                  item.avatar || // fallback to sample avatar
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
              }}
            />
            <View style={tw`flex-col gap-1`}>
              <View style={tw`flex-row justify-center gap-1 flex-wrap`}>
                <Text style={tw`text-3.2 font-inter-700`}>{item?.name}</Text>
                <Text style={tw`text-3 text-textPrimary`}>
                  {item?.message || " just followed you."}
                </Text>
              </View>
              <Text style={tw`text-textgray`}>{item?.time || "09:31 PM"}</Text>
            </View>
          </View>

          {!isClicked && <View style={tw`w-2 h-2 rounded-full bg-[#E53E3E]`} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-primaryBg`}>
      {/* Header */}
      <View style={tw`px-[4%] pt-4 mb-6 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-2 my-4`}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-5 text-[#121212] font-inter-700`}>
            Notifications
          </Text>
        </View>

        {/* Read all */}
        <Pressable
          onPress={() => setClickedIds(allNotification?.data?.map((n) => n.id))}
        >
          <Text style={tw`text-center text-[#ED6237] underline`}>Read all</Text>
        </Pressable>
      </View>

      {/* Notification List */}
      <FlatList
        data={allNotification?.data?.data}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        contentContainerStyle={tw`px-[4%] pb-4`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-10`}>
            No notifications found.
          </Text>
        }
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
