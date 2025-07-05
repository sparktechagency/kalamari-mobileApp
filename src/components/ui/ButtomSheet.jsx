import { IconComment, IconsBlue } from "@/assets/Icon";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import {
  useGetUserCommentQuery,
  usePostLinkCountMutation,
  usePostUserCommentMutation,
  useReplyCommentsMutation,
} from "../../redux/commentApi/commentApi";

import CommentSection from "./CommentSection";

const ButtomSheet = ({ item }) => {
  const { data, isLoading, refetch } = useGetUserCommentQuery({ id: item?.id });

  // console.log(data);

  const [postComment, { isLoading: posting }] = usePostUserCommentMutation();
  const [likeComment] = usePostLinkCountMutation();
  const [replyComment] = useReplyCommentsMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    setCountComment(data?.data?.[0]?.comment_count || 0);
  }, [data]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await postComment({ post_id: item?.id, comment }).unwrap();
      setComment("");
      refetch();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      await postComment({
        post_id: item?.id,
        comment: replyText,
        parent_id: parentId,
      }).unwrap();
      setReplyText("");
      setActiveReplyId(null);
      refetch();
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      await likeComment({ id }).unwrap();
      refetch();
    } catch (err) {
      console.error("Like error", err);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <View style={tw`flex-row gap-1 items-center`}>
          <SvgXml xml={IconComment} />
          <Text style={tw`text-base font-inter-400 text-[#454545]`}>
            {countComment > 0 && countComment}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw`flex-1 justify-end bg-black/10`}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={tw`bg-white rounded-t-2xl p-4 max-h-[60%]`}
            >
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-lg font-inter-700`}>Comment</Text>
                <Ionicons
                  name="close"
                  size={24}
                  color="#121212"
                  onPress={closeModal}
                />
              </View>

              {/* Comment Section */}
              <CommentSection data={data} />

              <View
                style={tw`flex-row items-center bg-[#F3F3F3] rounded-full px-3 py-2 mt-2`}
              >
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/1.jpg",
                  }}
                  style={tw`w-7 h-7 rounded-full mr-2`}
                />
                <TextInput
                  style={tw`flex-1 text-sm text-textPrimary`}
                  placeholder="Write a comment..."
                  placeholderTextColor="#888"
                  value={comment}
                  onChangeText={setComment}
                  onSubmitEditing={handleComment}
                />
                <TouchableOpacity onPress={handleComment} disabled={posting}>
                  {posting ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <SvgXml xml={IconsBlue} />
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ButtomSheet;

// import { IconComment, IconDelete, IconHeart, IconsBlue } from "@/assets/Icon";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { SvgXml } from "react-native-svg";
// import tw from "../../lib/tailwind";
// import {
//   useGetUserCommentQuery,
//   usePostLinkCountMutation,
//   usePostUserCommentMutation,
// } from "../../redux/commentApi/commentApi.js";

// const CommentModal = ({ item }) => {
//   console.log(item?.id);
//   // get comment  api
//   const { data, isLoading } = useGetUserCommentQuery({ id: item?.id });
//   console.log(data?.data?.[0]?.comment_count);

//   // post comment
//   const [userComment, { isLoading: newLoading }] = usePostUserCommentMutation();

//   // post like
//   const [postLinkCount, { isLoading: likeLoading }] =
//     usePostLinkCountMutation();

//   // All hooks
//   const [modalVisible, setModalVisible] = useState(false);
//   const [likeId, setLikeId] = useState([]);
//   const [comment, setComment] = useState("");
//   const [countComment, setCountComment] = useState(0);

//   useEffect(() => {
//     if (data?.data?.[0]?.comment_count) {
//       setCountComment(data?.data[0]?.comment_count);
//     }
//   }, [data]); // ✅ data change হলে update হবে

//   console.log("view ", countComment);

//   // console.log("data ", data?.data[0]?.comment_count);
//   // console.log("data 2", countComment);

//   //
//   const [activeReplyId, setActiveReplyId] = useState(null); // Which comment is being replied to
//   const [replyText, setReplyText] = useState("");

//   // const id = useUserId();

//   // console.log("view data", data?.data[0]?.comment_count);

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);
//   // console.log("new Id ", item?.id);

//   // comment post
//   const handleComment = async () => {
//     try {
//       if (comment.trim() === "") return;

//       const payload = {
//         post_id: item?.id, // string or number (depends on API)
//         comment: comment, // string (required)
//       };
//       console.log(payload);

//       const res = await userComment(payload).unwrap();
//       console.log("Posted comment:", res);
//       setComment("");
//       Keyboard.dismiss();
//     } catch (error) {
//       console.log("Error while posting comment:", error);
//     }
//   };

//   const handleDelete = (id) => {
//     // Alert.alert("Delete Comment", "Are you sure?", [
//     //   { text: "Cancel", style: "cancel" },
//     //   {
//     //     text: "Delete",
//     //     style: "destructive",
//     //     onPress: () =>
//     //       setComments((prevComments) => prevComments.filter((c) => c.id !== id)),
//     //   },
//     // ]);
//   };

//   const handleLike = async (id) => {
//     console.log("comment_id", id);

//     try {
//       const res = await postLinkCount({ id }).unwrap();
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }

//     // if (likeId.includes(id)) {
//     //   setLikeId((prev) => prev.filter((itemId) => itemId !== id));
//     // } else {
//     //   setLikeId((prev) => [...prev, id]);
//     // }
//   };

//   return (
//     <View>
//       {/* Open Button */}
//       <TouchableOpacity onPress={openModal}>
//         <View style={tw` flex-row gap-1 items-center`}>
//           <SvgXml xml={IconComment} />
//           <Text style={tw`text-base font-inter-400 text-[#454545]`}>
//             {countComment > 0 && countComment}
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {/* Modal */}
//       <Modal
//         visible={modalVisible}
//         animationType="fade"
//         transparent
//         onRequestClose={closeModal}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={tw`flex-1 justify-end  bg-black/10 `}>
//             <KeyboardAvoidingView
//               behavior={Platform.OS === "ios" ? "padding" : null}
//               style={tw`bg-white rounded-t-2xl p-4 max-h-[60%] shadow-xl`}
//             >
//               {/* Header */}
//               <View style={tw`flex-row justify-between items-center mb-2`}>
//                 <Text style={tw`text-lg font-inter-700`}>Comment</Text>
//                 <Ionicons
//                   name="close"
//                   size={24}
//                   color="#121212"
//                   onPress={closeModal}
//                 />
//               </View>

//               {countComment > 0 ? (
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   {data?.data?.map((item) =>
//                     item?.comments?.map((item) => (
//                       <View
//                         key={item.id}
//                         style={tw`flex-row items-center gap-2 justify-between`}
//                       >
//                         <View
//                           style={tw`flex-row items-center gap-2 justify-between   py-3`}
//                         >
//                           {/* Profile Image */}
//                           <View style={tw`mr-3`}>
//                             <Image
//                               source={{
//                                 uri: "https://randomuser.me/api/portraits/men/1.jpg",
//                               }}
//                               style={tw`w-10.5 h-10.5 rounded-full`}
//                             />
//                           </View>

//                           {/* Content */}
//                           <View style={tw`flex-1`}>
//                             <Text
//                               style={tw`text-textPrimary text-sm font-inter-400 mb-2`}
//                             >
//                               {item?.comment}
//                             </Text>

//                             {/* Actions */}
//                             <View style={tw`flex-row items-center`}>
//                               <TouchableOpacity>
//                                 <Text style={tw`text-xs text-[#888888] mr-4`}>
//                                   Reply
//                                 </Text>
//                               </TouchableOpacity>

//                               {/* Like fun */}
//                               <View
//                                 style={tw`flex-row items-center justify-center gap1`}
//                               >
//                                 <TouchableOpacity
//                                   onPress={() => handleLike(item?.id)}
//                                 >
//                                   {item?.like > 0 ? (
//                                     <SvgXml
//                                       xml={IconHeart}
//                                       width={20}
//                                       height={20}
//                                     />
//                                   ) : (
//                                     <Text style={tw`text-xs text-[#888888]`}>
//                                       Like
//                                     </Text>
//                                   )}
//                                 </TouchableOpacity>

//                                 <Text
//                                   style={tw`text-textPrimary text-sm font-inter-400 `}
//                                 >
//                                   {item?.like > 0 && item?.like}
//                                 </Text>
//                               </View>
//                             </View>
//                           </View>

//                           {/* Delete Icon */}
//                           <TouchableOpacity
//                             onPress={() => handleDelete(item.id)}
//                           >
//                             <SvgXml xml={IconDelete} width={20} height={20} />
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     ))
//                   )}
//                 </ScrollView>
//               ) : (
//                 <View>
//                   <Text style={tw`text-gray-500 py-3`}>No comments yet</Text>
//                 </View>
//               )}

//               {/* Comment Input */}
//               <View
//                 style={tw`flex-row items-center bg-[#F3F3F3] rounded-full px-3 py-3 mt-2`}
//               >
//                 <Image
//                   source={{
//                     uri: "https://randomuser.me/api/portraits/men/1.jpg",
//                   }}
//                   style={tw`w-5 h-5 rounded-full mr-2`}
//                 />
//                 <TextInput
//                   style={tw`flex-1 text-textPrimary text-sm py-1`}
//                   placeholder="Write a comment..."
//                   placeholderTextColor="#888"
//                   value={comment}
//                   onChangeText={setComment}
//                   onSubmitEditing={handleComment}
//                   returnKeyType="send"
//                 />
//                 {/* <TouchableOpacity onPress={handleComment}>
//                 </TouchableOpacity> */}

//                 {/* post data  */}
//                 <TouchableOpacity onPress={handleComment} disabled={newLoading}>
//                   {newLoading ? (
//                     <ActivityIndicator size="small" />
//                   ) : (
//                     <SvgXml xml={IconsBlue} />
//                   )}
//                 </TouchableOpacity>

//                 {/*  */}
//               </View>
//             </KeyboardAvoidingView>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// export default CommentModal;
