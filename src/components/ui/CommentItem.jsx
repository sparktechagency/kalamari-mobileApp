import { IconHeart } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import { usePostLinkCountMutation } from "@/src/redux/commentApi/commentApi";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import ReplyInput from "./ReplyInput";
import ReplyList from "./ReplyList";

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const CommentItem = ({
  comment,
  openReplies,
  activeReplyId,
  replyText,
  setReplyText,
  setActiveReplyId,
  handleOpenReplyContent,
}) => {
  const [commentLike] = usePostLinkCountMutation();

  const handleLike = async (commentId) => {
    try {
      await commentLike({ comment_id: commentId }).unwrap();
    } catch (e) {
      console.log("Like error", e);
    }
  };

  return (
    <View style={tw`flex-row gap-3 py-3`}>
      <Image
        source={{ uri: DEFAULT_AVATAR }}
        style={tw`w-10 h-10 rounded-full`}
      />
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={tw`font-inter-600`}>{comment.user_name}</Text>
          <Text style={tw`text-xs text-textgray`}>
            {formatTime(comment.created_at)}
          </Text>
        </View>
        <Text style={tw`text-sm font-inter-400 text-gray-800 mt-1`}>
          {comment.comment}
        </Text>

        {/* Buttons */}
        <View style={tw`flex-row items-center mt-2 gap-4`}>
          <TouchableOpacity onPress={() => handleOpenReplyContent(comment.id)}>
            <Text style={tw`text-xs text-gray-500`}>
              {openReplies[comment.id] ? "Cancel" : "Reply"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => handleLike(comment.id)}
          >
            {comment.like > 0 ? (
              <>
                <SvgXml xml={IconHeart} width={16} height={16} />
                <Text style={tw`text-xs text-gray-500 ml-1`}>
                  {comment.like}
                </Text>
              </>
            ) : (
              <Text style={tw`text-xs text-gray-500`}>Like</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Reply Input */}
        {openReplies[comment.id] && activeReplyId === comment.id && (
          <ReplyInput
            commentId={comment.id}
            replyText={replyText}
            setReplyText={setReplyText}
            setActiveReplyId={setActiveReplyId}
          />
        )}

        {/* Replies */}
        {openReplies[comment.id] && comment?.replies?.length > 0 && (
          <ReplyList replies={comment.replies} />
        )}
      </View>
    </View>
  );
};

export default CommentItem;
