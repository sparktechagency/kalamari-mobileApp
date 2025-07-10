import { IconHeart, IconsListDeleted } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import { makeImage } from "@/src/redux/api/baseApi";
import {
  usePostCommentDeletedMutation,
  usePostLinkCountMutation,
} from "@/src/redux/commentApi/commentApi";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import ReplyInput from "./ReplyInput";
import ReplyList from "./ReplyList";

export const DEFAULT_AVATAR =
  "https://i.ibb.co/4wdkdW62/403017-avatar-default-head-person-unknown-icon.png";

const CommentItem = ({
  comment,
  openReplies,
  activeReplyId,
  replyText,
  setReplyText,
  setActiveReplyId,
  handleOpenReplyContent,
  isLoading,
}) => {
  console.log("comment ---------", comment);

  const [commentLike] = usePostLinkCountMutation();
  const [deletedComment, { isLoading: deletedItem }] =
    usePostCommentDeletedMutation();

  const handleLike = async (commentId) => {
    try {
      await commentLike({ comment_id: commentId }).unwrap();
    } catch (e) {
      console.log("Like error", e);
    }
  };

  const handleDelete = (id) => {
    // console.log(id);

    Alert.alert(
      "Delete",
      "Are you sure you want to delete this comments?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await deletedComment({ comment_id: id }).unwrap();
              // console.log(res);
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // console.log("new comment ", comment);

  return comment ? (
    <View style={tw`flex-row gap-3 py-3`}>
      <Image
        source={{ uri: makeImage(comment?.avatar) || DEFAULT_AVATAR }}
        style={tw`w-10 h-10 rounded-full`}
      />

      <View style={tw`flex-1`}>
        {/* Username and Delete */}
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={tw`font-inter-600`}>{comment?.user_name}</Text>
          <TouchableOpacity
            onPress={() => handleDelete(comment?.id)}
            activeOpacity={0.7}
          >
            <SvgXml xml={IconsListDeleted} />
          </TouchableOpacity>
        </View>

        {/* Comment Text */}
        <Text style={tw`text-sm font-inter-400 text-gray-800 mt-1`}>
          {comment?.comment}
        </Text>

        {/* Actions */}
        <View style={tw`flex-row items-center mt-2 gap-4`}>
          <TouchableOpacity onPress={() => handleOpenReplyContent(comment?.id)}>
            {/* <Text style={tw`text-xs text-gray-500`}>
              {openReplies[comment.id] ? "Cancel" : `Reply `}
            </Text> */}
            <Text style={tw`text-xs text-gray-500`}>
              {openReplies[comment.id]
                ? "Cancel"
                : `Reply ${
                    comment?.replies?.length > 0 ? comment?.replies?.length : ""
                  }`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => handleLike(comment?.id)}
          >
            {comment?.like > 0 ? (
              <>
                <SvgXml xml={IconHeart} width={16} height={16} />
                <Text style={tw`text-xs text-gray-500 ml-1`}>
                  {comment?.like}
                </Text>
              </>
            ) : (
              <Text style={tw`text-xs text-gray-500`}>Like</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Reply Input */}
        {openReplies[comment?.id] && (
          <ReplyInput
            commentId={comment?.id}
            replyText={replyText}
            setReplyText={setReplyText}
            setActiveReplyId={setActiveReplyId}
          />
        )}

        {/* Replies List */}
        {openReplies[comment?.id] && comment?.replies?.length > 0 && (
          <ReplyList replies={comment?.replies} />
        )}
      </View>
    </View>
  ) : (
    <Text style={tw`text-center text-gray-400 py-4`}>No comment available</Text>
  );
};

export default CommentItem;
