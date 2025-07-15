import { IconTagUser } from "@/assets/Icon";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useTagFollowingQuery } from "../../redux/profileApi/profileApi";

const TagPeopleView = ({ isVisible, setIsVisible, setuserName, newTag }) => {
  const [searchPeople, setSearchPeople] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const { data, isLoading } = useTagFollowingQuery();

  // Memoized filtered users from API data
  const filteredUsers = useMemo(() => {
    if (!data?.data?.data) return [];
    return data?.data?.data?.filter((user) =>
      user?.name.toLowerCase().includes(searchPeople.toLowerCase())
    );
  }, [data, searchPeople]);

  // Optimized toggle function
  const handleToggle = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev?.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleAdd = useCallback(() => {
    if (!data?.data?.data) return;

    const selectedUsers = data?.data?.data?.filter((u) =>
      selectedIds.includes(u?.id)
    );
    const names = newTag
      ? selectedUsers.map((u) => u?.name)
      : selectedUsers.map((u) => u?.name).join(", ");

    setuserName(names);
    setIsVisible(false);
    setSelectedIds([]); // Reset selections after adding
  }, [selectedIds, newTag, data, setIsVisible, setuserName]);

  // Render item for FlatList
  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedIds.includes(item?.id);
      return (
        <TouchableOpacity
          onPress={() => handleToggle(item?.id)}
          style={tw`flex-row items-center justify-between py-2`}
          activeOpacity={0.7}
        >
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: makeImage(item?.avatar) }}
              style={tw`w-10 h-10 rounded-full mr-3`}
            />
            <Text style={tw`font-bold text-textPrimary`}>{item?.name}</Text>
          </View>
          <View
            style={tw`w-5 h-5 rounded-full items-center justify-center border-2 ${
              isSelected ? "border-[#E53E3E]" : "border-[#ED6237]"
            }`}
          >
            {isSelected && (
              <View style={tw`w-3 h-3 rounded-full bg-[#E53E3E]`} />
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [selectedIds, handleToggle]
  );

  return (
    <View>
      {/* Button to open modal */}
      <TouchableOpacity
        style={tw`flex-row items-center px-4 justify-center gap-2 border border-[#B0B0B0] rounded-md py-1.5`}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.8}
      >
        <SvgXml xml={IconTagUser} />
        <Text style={tw`text-base font-inter-600 text-[#121212]`}>
          Tag people
        </Text>
      </TouchableOpacity>

      {/* Tag Modal */}
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setIsVisible(false);
          setSelectedIds([]); // Reset selections when closing
        }}
      >
        <View style={tw`flex-1 justify-center items-center `}>
          <View
            style={tw`p-4 w-11/12 bg-[#FDFFFE] shadow-2xl shadow-black/40 rounded-3xl max-h-[80%]`}
          >
            {/* Header */}
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-2xl py-4 font-inter-700 text-[#121212]`}>
                Tag People
              </Text>
              <AntDesign
                name="close"
                size={24}
                color="#121212"
                onPress={() => {
                  setIsVisible(false);
                  setSelectedIds([]);
                }}
              />
            </View>

            {/* Search Input */}
            <View
              style={tw`flex-row items-center bg-[#F3F3F3] rounded-[16px] px-4 py-1 mb-3`}
            >
              <Fontisto
                name="search"
                size={18}
                color="#888888"
                style={tw`mr-2`}
              />
              <TextInput
                placeholder="Search people..."
                placeholderTextColor="#888"
                style={tw`flex-1 text-base text-textPrimary`}
                onChangeText={setSearchPeople}
                value={searchPeople}
                clearButtonMode="while-editing"
              />
            </View>

            {/* User list */}
            <Text style={tw`text-xl font-inter-600 text-[#121212] mb-1`}>
              Your Followers
            </Text>

            {isLoading ? (
              <View style={tw`h-[200px] justify-center items-center`}>
                <ActivityIndicator size="large" color="#ED6237" />
              </View>
            ) : (
              <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
                style={tw`max-h-[250px]`}
                contentContainerStyle={tw`pb-2`}
                ListEmptyComponent={
                  <Text style={tw`text-center py-10 text-gray-500`}>
                    {searchPeople
                      ? "No matching users found"
                      : "No followers available"}
                  </Text>
                }
              />
            )}

            {/* Add Button - Only show if there are selections */}
            {selectedIds?.length > 0 && (
              <Pressable
                onPress={handleAdd}
                style={tw`bg-[#ED6237] items-center p-3 rounded-full mt-4`}
                android_ripple={{ color: "#C53D2B" }}
              >
                <Text style={tw`text-white text-xl`}>
                  Add{" "}
                  {selectedIds?.length > 1 ? `(${selectedIds?.length})` : ""}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TagPeopleView;

// import { IconTagUser } from "@/assets/Icon";
// import { AntDesign, Fontisto } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//   Image,
//   Modal,
//   Pressable,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SvgXml } from "react-native-svg";
// import tw from "../../lib/tailwind";
// import { useTagFollowingQuery } from "../../redux/profileApi/profileApi";

// const sampleUsers = [
//   {
//     id: 1,
//     name: "Casey",
//     avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
//   },
//   {
//     id: 2,
//     name: "Alex",
//     avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
//   },
//   {
//     id: 3,
//     name: "Mia",
//     avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
//   },
//   {
//     id: 5,
//     name: "Mia",
//     avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
//   },
//   {
//     id: 6,
//     name: "Mia",
//     avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
//   },
// ];

// const TagPeopleView = ({ isVisible, setIsVisible, setuserName, newTag }) => {
//   const [searchPeople, setSearchPeople] = useState("");
//   const [selectedIds, setSelectedIds] = useState([]);

//   const handleToggle = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const { data } = useTagFollowingQuery();
//   console.log(data?.data?.data);

//   const handleAdd = () => {
//     const selectedUsers = sampleUsers.filter((u) => selectedIds.includes(u.id));

//     // For single tag selection (if newTag is true)
//     if (newTag) {
//       const names = selectedUsers.map((u) => u.name);
//       setuserName(names); // This will be an array of names
//     }
//     // For multiple tags comma-separated
//     else {
//       const names = selectedUsers.map((u) => u.name).join(", ");
//       setuserName(names); // This will be a string
//     }

//     setIsVisible(false);
//   };

//   const filteredUsers = sampleUsers.filter((user) =>
//     user.name.toLowerCase().includes(searchPeople.toLowerCase())
//   );

//   return (
//     <View>
//       {/* Button to open modal */}
//       <TouchableOpacity
//         style={tw`flex-row items-center px-4 justify-center gap-2 border border-[#B0B0B0] rounded-md py-1.5`}
//         onPress={() => setIsVisible(true)}
//       >
//         <SvgXml xml={IconTagUser} />
//         <Text style={tw`text-base font-inter-600 text-[#121212]`}>
//           Tag people
//         </Text>
//       </TouchableOpacity>

//       {/* Tag Modal */}
//       <Modal
//         visible={isVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setIsVisible(false)}
//       >
//         <View style={tw`flex-1  justify-center items-center`}>
//           <View
//             style={tw`p-4 w-11/12 shadow-2xl shadow-black/40 bg-[#FDFFFE] rounded-3xl`}
//           >
//             {/* Header */}
//             <View style={tw`flex-row justify-between items-center`}>
//               <Text style={tw`text-2xl py-4 font-inter-700 text-[#121212]`}>
//                 Tag People
//               </Text>
//               <AntDesign
//                 name="close"
//                 size={24}
//                 color="#121212"
//                 onPress={() => setIsVisible(false)}
//               />
//             </View>

//             {/* Search Input */}
//             <View
//               style={tw`flex-row items-center bg-[#F3F3F3] rounded-[16px] px-4 py-2 mb-3`}
//             >
//               <Fontisto
//                 name="search"
//                 size={18}
//                 color="#888888"
//                 style={tw`mr-2`}
//               />
//               <TextInput
//                 placeholder="Search people..."
//                 placeholderTextColor="#888"
//                 style={tw`flex-1 text-base text-textPrimary`}
//                 onChangeText={setSearchPeople}
//                 value={searchPeople}
//               />
//             </View>

//             {/* User list */}
//             <Text style={tw`text-xl font-inter-600 text-[#121212] mb-1`}>
//               Your Followers
//             </Text>
//             <ScrollView
//               style={{ maxHeight: 250 }}
//               showsVerticalScrollIndicator={false}
//             >
//               {filteredUsers.map((user) => {
//                 const isSelected = selectedIds.includes(user.id);
//                 return (
//                   <TouchableOpacity
//                     key={user.id}
//                     onPress={() => handleToggle(user.id)}
//                     style={tw`flex-row items-center justify-between py-2`}
//                   >
//                     <View style={tw`flex-row items-center`}>
//                       <Image
//                         source={{ uri: user.avatar }}
//                         style={tw`w-10 h-10 rounded-full mr-3`}
//                       />
//                       <Text style={tw`font-bold text-textPrimary`}>
//                         {user.name}
//                       </Text>
//                     </View>
//                     <View
//                       style={tw`w-5 h-5 rounded-full items-center justify-center border-2 border-[#ED6237] `}
//                     >
//                       {isSelected ? (
//                         <View style={tw`w-3 h-3 rounded-full bg-[#E53E3E]`} />
//                       ) : (
//                         ""
//                       )}
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             {/* Add Button */}
//             <Pressable
//               onPress={handleAdd}
//               style={tw`bg-[#ED6237] items-center p-3 rounded-full mt-4`}
//             >
//               <Text style={tw`text-white text-xl`}>Add</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TagPeopleView;
