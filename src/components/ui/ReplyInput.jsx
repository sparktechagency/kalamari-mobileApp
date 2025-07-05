import { IconsBlue } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import { useReplyCommentsMutation } from "@/src/redux/commentApi/commentApi";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

const ReplyInput = ({
  commentId,
  replyText,
  setReplyText,
  setActiveReplyId,
}) => {
  const [replyComment, { isLoading }] = useReplyCommentsMutation();

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      await replyComment({ comment_id: commentId, replay: replyText }).unwrap();
      setReplyText("");
      setActiveReplyId(null);
    } catch (e) {
      console.log("Reply failed", e);
    }
  };

  return (
    <View style={tw`mt-3 flex-row items-center`}>
      <Image
        source={{ uri: DEFAULT_AVATAR }}
        style={tw`w-6 h-6 rounded-full mr-2`}
      />
      <TextInput
        style={tw`flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm font-inter-400`}
        placeholder="Write a reply..."
        value={replyText}
        onChangeText={setReplyText}
        autoFocus
      />
      <TouchableOpacity onPress={handleReply} style={tw`ml-2`}>
        <SvgXml xml={IconsBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default ReplyInput;
