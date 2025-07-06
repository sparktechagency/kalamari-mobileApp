import tw from "@/src/lib/tailwind";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import CommentItem from "./CommentItem";

const CommentSection = ({ data, isLoading }) => {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openReplies, setOpenReplies] = useState({});

  const handleOpenReplyContent = useCallback((commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setActiveReplyId((prev) => (prev === commentId ? null : commentId));
    setReplyText("");
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`pb-4`}
    >
      {data?.data?.[0]?.comments?.map((comment) => (
        <View key={comment.id} style={tw`relative`}>
          <CommentItem
            comment={comment}
            openReplies={openReplies}
            activeReplyId={activeReplyId}
            replyText={replyText}
            setReplyText={setReplyText}
            setActiveReplyId={setActiveReplyId}
            handleOpenReplyContent={handleOpenReplyContent}
            isLoading={isLoading}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CommentSection;

// import { IconHeart, IconsBlue } from "@/assets/Icon";
// import tw from "@/src/lib/tailwind";
// import {
//   usePostLinkCountMutation,
//   useReplyCommentsMutation,
// } from "@/src/redux/commentApi/commentApi";
// import { useCallback, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SvgXml } from "react-native-svg";

// const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

// const CommentSection = ({ data }) => {
//   const [activeReplyId, setActiveReplyId] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [openReplies, setOpenReplies] = useState({});

//   const [replyComment, { isLoading: replyLoading }] =
//     useReplyCommentsMutation();
//   const [commentLike, { isLoading }] = usePostLinkCountMutation();

//   const handleLike = useCallback(async (commentId) => {
//     try {
//       const res = await commentLike({ comment_id: commentId }).unwrap();
//       console.log("comment like res: ", res);
//     } catch (error) {
//       console.log("Like failed:", error);
//     }
//   }, []);

//   const handleReply = useCallback(
//     async (commentId) => {
//       if (!replyText.trim()) return;

//       const payload = {
//         comment_id: Number(commentId),
//         replay: replyText,
//       };

//       try {
//         const res = await replyComment(payload).unwrap();
//         console.log("Reply successful:", res);
//         setActiveReplyId(null);
//         setReplyText("");
//       } catch (error) {
//         console.error("Reply failed:", error);
//       }
//     },
//     [replyText, replyComment]
//   );

//   const handleOpenReplyContent = useCallback((commentId) => {
//     setOpenReplies((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }));

//     setActiveReplyId((prev) => (prev === commentId ? null : commentId));
//     setReplyText("");
//   }, []);

//   const formatTime = (isoString) => {
//     return new Date(isoString).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={tw`pb-4`}
//     >
//       {data?.data?.[0]?.comments?.map((comment) => (
//         <View style={tw`relative`} key={comment?.id}>
//           {/*  Main Comment */}
//           <View style={tw`flex-row gap-3 py-3`}>
//             <Image
//               source={{ uri: DEFAULT_AVATAR }}
//               style={tw`w-10 h-10 rounded-full`}
//             />
//             <View style={tw`flex-1`}>
//               <View style={tw`flex-row justify-between items-start`}>
//                 <Text style={tw`font-inter-600`}>{comment?.user_name}</Text>
//                 <Text style={tw`text-xs text-textgray`}>
//                   {formatTime(comment?.created_at)}
//                 </Text>
//               </View>

//               <Text style={tw`text-sm font-inter-400 text-gray-800 mt-1`}>
//                 {comment?.comment}
//               </Text>

//               {/* 🔵 Reply + Like Buttons */}
//               <View style={tw`flex-row items-center mt-2 gap-4`}>
//                 <TouchableOpacity
//                   onPress={() => handleOpenReplyContent(comment?.id)}
//                 >
//                   <Text style={tw`text-xs text-gray-500`}>
//                     {openReplies[comment?.id] ? "Cancel" : "Reply"}
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={tw`flex-row items-center`}
//                   onPress={() => handleLike(comment?.id)}
//                 >
//                   {comment?.like > 0 ? (
//                     <SvgXml xml={IconHeart} width={16} height={16} />
//                   ) : (
//                     <Text style={tw`text-xs text-gray-500`}>Like</Text>
//                   )}
//                   {comment?.like > 0 && (
//                     <Text style={tw`text-xs text-gray-500 ml-1`}>
//                       {comment?.like}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </View>

//               {/* 🔵 Reply Input Box */}
//               {openReplies[comment?.id] && activeReplyId === comment?.id && (
//                 <View style={tw`mt-3 flex-row items-center`}>
//                   <Image
//                     source={{ uri: DEFAULT_AVATAR }}
//                     style={tw`w-6 h-6 rounded-full mr-2`}
//                   />
//                   <TextInput
//                     style={tw`flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm font-inter-400`}
//                     placeholder="Write a reply..."
//                     value={replyText}
//                     onChangeText={setReplyText}
//                     autoFocus
//                   />
//                   <TouchableOpacity
//                     onPress={() => handleReply(comment?.id)}
//                     style={tw`ml-2`}
//                   >
//                     <SvgXml xml={IconsBlue} />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           </View>

//           {/* 🟡 Replies */}
//           {openReplies[comment?.id] && comment?.replies?.length > 0 && (
//             <View style={tw`ml-12`}>
//               <View
//                 style={tw`absolute -left-8 top-0 bottom-0 w-0.6 rounded-b-lg bg-primary`}
//               />
//               {comment?.replies?.map((reply) => (
//                 <View key={reply?.id} style={tw`flex-row gap-3 py-2 pl-3`}>
//                   <View
//                     style={tw`absolute -left-8 h-0.6 w-16 bg-primary top-6`}
//                   />
//                   <Image
//                     source={{ uri: DEFAULT_AVATAR }}
//                     style={tw`w-8 h-8 rounded-full mt-1 z-10`}
//                   />
//                   <View style={tw`flex-1 bg-gray-50 rounded-lg p-3`}>
//                     <View style={tw`flex-row justify-between items-start`}>
//                       <Text style={tw`font-inter-600 text-sm`}>
//                         {reply?.user_name}
//                       </Text>
//                       <Text style={tw`text-xs text-textgray`}>
//                         {formatTime(reply?.created_at)}
//                       </Text>
//                     </View>
//                     <Text style={tw`text-sm font-inter-400 text-gray-800 mt-1`}>
//                       {reply?.replay}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default CommentSection;
