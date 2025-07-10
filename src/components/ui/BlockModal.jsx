import { Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import { useUserBlockMutation } from "../../redux/userReportApi/userReportApi";

const BlockModal = ({ setModalVisible, modalVisible, onConfirm, id }) => {
  // console.log(id);

  const [userBlock] = useUserBlockMutation();

  const handleBlock = async (user_id) => {
    try {
      const res = await userBlock({ blocked_id: user_id }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={tw`flex-1 items-center justify-center bg-black/30`}>
        <View style={tw`bg-white shadow-2xl p-6 rounded-2xl w-80`}>
          <Text style={tw`text-lg font-inter-600 mb-4 text-textgray`}>
            Block this user?
          </Text>
          <Text style={tw`text-sm text-textgray mb-6`}>
            Are you sure you want to block this user? They won't be able to view
            your profile or interact with you.
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
                setModalVisible(false);
                handleBlock(id);
              }}
            >
              <Text style={tw`text-sm font-inter-700 text-orange`}>Block</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BlockModal;
