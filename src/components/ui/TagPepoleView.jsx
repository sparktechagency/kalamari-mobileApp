import { IconTagUser } from "@/assets/Icon";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const sampleUsers = [
  {
    id: 1,
    name: "Casey",
    avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
  },
  {
    id: 2,
    name: "Alex",
    avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
  },
  {
    id: 3,
    name: "Mia",
    avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
  },
  {
    id: 5,
    name: "Mia",
    avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
  },
  {
    id: 6,
    name: "Mia",
    avatar: "https://i.ibb.co/v6P6TF1q/Ellipse-5.png",
  },
];

const TagPeopleView = ({ isVisible, setIsVisible, setuserName, newTag }) => {
  const [searchPeople, setSearchPeople] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const selectedUsers = sampleUsers.filter((u) => selectedIds.includes(u.id));
    const names = selectedUsers.map((u) => u.name).join(", ");

    // console.log(names, newTag);

    setuserName(names);
    setIsVisible(false);
  };

  const filteredUsers = sampleUsers.filter((user) =>
    user.name.toLowerCase().includes(searchPeople.toLowerCase())
  );

  return (
    <View>
      {/* Button to open modal */}
      <View
        style={tw`flex-row items-center px-4 justify-center gap-2 border border-[#B0B0B0] rounded-md py-1.5`}
      >
        <TouchableOpacity
          style={tw`flex-row items-center gap-1.5`}
          onPress={() => setIsVisible(true)}
        >
          <SvgXml xml={IconTagUser} />
          <Text style={tw`text-base font-bold text-[#121212]`}>Tag people</Text>
        </TouchableOpacity>
      </View>

      {/* Tag Modal */}
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={tw`flex-1  justify-center items-center`}>
          <View
            style={tw`p-4 w-11/12 shadow-2xl shadow-black/40 bg-[#FDFFFE] rounded-3xl`}
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
                onPress={() => setIsVisible(false)}
              />
            </View>

            {/* Search Input */}
            <View
              style={tw`flex-row items-center bg-[#F3F3F3] rounded-[16px] px-4 py-2 mb-3`}
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
              />
            </View>

            {/* User list */}
            <Text style={tw`text-xl font-inter-600 text-[#121212] mb-1`}>
              Your Followers
            </Text>
            <ScrollView
              style={{ maxHeight: 250 }}
              showsVerticalScrollIndicator={false}
            >
              {filteredUsers.map((user) => {
                const isSelected = selectedIds.includes(user.id);
                return (
                  <TouchableOpacity
                    key={user.id}
                    onPress={() => handleToggle(user.id)}
                    style={tw`flex-row items-center justify-between py-2`}
                  >
                    <View style={tw`flex-row items-center`}>
                      <Image
                        source={{ uri: user.avatar }}
                        style={tw`w-10 h-10 rounded-full mr-3`}
                      />
                      <Text style={tw`font-bold text-textPrimary`}>
                        {user.name}
                      </Text>
                    </View>
                    <View
                      style={tw`w-5 h-5 rounded-full items-center justify-center border-2 border-[#ED6237] `}
                    >
                      {isSelected ? (
                        <View style={tw`w-3 h-3 rounded-full bg-[#E53E3E]`} />
                      ) : (
                        ""
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Add Button */}
            <Pressable
              onPress={handleAdd}
              style={tw`bg-[#ED6237] items-center p-3 rounded-full mt-4`}
            >
              <Text style={tw`text-white text-xl`}>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TagPeopleView;
