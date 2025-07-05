import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const SuccessAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {/* Trigger button to open modal (for demo) */}
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={tw`bg-black px-4 py-2 rounded-full`}
      >
        <Text style={tw`text-white font-bold`}>Show Success Modal</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={tw`flex-1 bg-black/40 justify-center items-center`}>
          <View style={tw`bg-white w-80 rounded-2xl p-6 items-center`}>
            {/* Icon */}
            <View style={tw`bg-gray-200 p-4 rounded-full mb-4`}>
              <AntDesign name="checkcircle" size={32} color="black" />
            </View>

            {/* Title & Message */}
            <Text style={tw`text-xl font-bold mb-1`}>Successful!</Text>
            <Text style={tw`text-gray-500 text-center mb-5`}>
              Your post was successful
            </Text>

            {/* Done Button */}
            <Pressable
              onPress={() => setIsVisible(false)}
              style={tw`bg-black px-6 py-3 rounded-full w-full`}
            >
              <Text style={tw`text-white text-center font-bold`}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessAlert;
