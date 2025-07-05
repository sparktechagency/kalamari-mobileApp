import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const BlockModal = ({ setModalVisible, modalVisible, modalName }) => {
  const getModalContent = (type) => {
    switch (type) {
      case "Block":
        return {
          title: "Block this user?",
          message:
            "Are you sure you want to block this user? They won't be able to view your profile or interact with you.",
          confirmText: "Block",
          confirmColor: "text-orange",
        };
      case "Report":
        return {
          title: "Report this user?",
          message:
            "Do you want to report this user for inappropriate behavior? Our team will review their activity.",
          confirmText: "Report",
          confirmColor: "text-orange",
        };
      case "Restrict":
        return {
          title: "Restrict this user?",
          message:
            "This user will be restricted. They won’t know when you’re online or if you’ve read their messages.",
          confirmText: "Restrict",
          confirmColor: "text-yellow-500",
        };
      default:
        return {
          title: "Action",
          message: "Are you sure you want to perform this action?",
          confirmText: "Confirm",
          confirmColor: "text-blue-500",
        };
    }
  };

  const content = getModalContent(modalName);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={tw`flex-1  items-center justify-center`}>
          <View
            style={tw`bg-white shadow-2xl shadow-gray-600 p-6 rounded-2xl w-80`}
          >
            <Text style={tw`text-lg font-inter-600 mb-4 text-textgray`}>
              {content.title}
            </Text>
            <Text style={tw`text-sm text-textgray mb-6`}>
              {content.message}
            </Text>

            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`mr-4`}
              >
                <Text style={tw`text-sm text-textgray`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Optional: Add logic like onConfirm callback
                  setModalVisible(false);
                }}
              >
                <Text
                  style={tw`text-sm font-inter-700 ${content.confirmColor}`}
                >
                  {content.confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BlockModal;
