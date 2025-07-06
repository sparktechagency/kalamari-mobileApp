// import { Entypo } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";

// import {
//   IconHeart,
//   IconLOcation,
//   IconLove,
//   IconRestruernt,
//   IconStar,
//   IconVerify,
// } from "@/assets/Icon";

// import tw from "../../lib/tailwind";
// import { usePostLikeMutation } from "../../redux/commentApi/commentApi";
// import SimplifyDate from "../../utils/SimplifyDate";
// import BookMark from "./BookMark";
// import ButtomSheet from "./ButtomSheet";
// import ShareButton from "./ShareButton";
// import TacoSlider from "./TacoSlider";

// const PostViewCard = ({ item, openModal, handleNavigate }) => {
//   const safeDate = item?.created_at?.split(".")[0];

//   console.log("new hj;gdfhgidf", item);

//   const [postLike, { isLoading }] = usePostLikeMutation();

//   const [isHeart, setIsHeart] = useState(false);

//   const handleHeart = async (postId) => {
//     console.log(postId);

//     try {
//       const res = await postLike({ post_id: postId }).unwrap();

//       console.log(" API response:", res);

//       // Toggle UI based on backend status
//       setIsHeart(res?.isHeart === true);
//     } catch (error) {
//       console.error("Heart toggle failed:", error);
//     }
//   };

//   return (
//     <View style={tw` flex-1 my-3 py-2 flex-col gap-3 `}>
//       {/* Header */}
//       <View style={tw`flex-row items-center gap-2`}>
//         <TouchableOpacity onPress={handleNavigate}>
//           <Image
//             style={tw`w-10 h-10 rounded-full`}
//             source={{
//               uri: "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png",
//             }}
//           />
//         </TouchableOpacity>

//         <View style={tw`flex gap-0.5 flex-1`}>
//           <View style={tw`flex-row items-center justify-between`}>
//             <View style={tw`flex-row gap-3`}>
//               <TouchableOpacity
//                 onPress={handleNavigate}
//                 style={tw`flex-row items-center gap-2`}
//               >
//                 <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
//                   {item?.user_name}
//                 </Text>
//                 <SvgXml xml={IconVerify} />
//               </TouchableOpacity>

//               <View style={tw`flex-row gap-1 items-center`}>
//                 {item?.tagged?.map((tag, index) => (
//                   <Text
//                     key={index}
//                     style={tw`text-[12px] font-inter-700 text-[#454545]`}
//                   >
//                     #{tag}
//                   </Text>
//                 ))}
//               </View>
//             </View>

//             <TouchableOpacity onPress={openModal}>
//               <Entypo name="dots-three-vertical" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Location */}
//           <View style={tw`flex-row gap-2 items-center`}>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconRestruernt} />
//               <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                 {item?.restaurant_name || "Unknown"}
//               </Text>
//             </View>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconLOcation} />
//               <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                 {item?.location || "Unknown"}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Image Slider */}
//       <TacoSlider />

//       {/* Actions */}
//       <View style={tw`flex-row  mr-[5%] items-center  mt-3`}>
//         {/* Left Actions: Like, Comment, Share */}
//         <View style={tw`flex-row items-center gap-4`}>
//           {/* Like */}
//           <View style={tw`flex-row items-center gap-1`}>
//             <TouchableOpacity onPress={() => handleHeart(item?.id)}>
//               <SvgXml xml={isHeart ? IconHeart : IconLove} />
//             </TouchableOpacity>
//             <Text style={tw`text-[13px] font-inter-600 text-[#454545]`}>
//               {item?.love_reacts}
//             </Text>
//           </View>

//           {/* Comment */}
//           <ButtomSheet item={item} />

//           {/* Share */}
//           <ShareButton />
//         </View>

//         {/* Bookmark (Right Side) */}
//         <View style={tw``}>
//           <BookMark />
//         </View>
//       </View>

//       {/* Content */}
//       <View style={tw`flex mt-2 gap-1.5`}>
//         <View style={tw`flex-col gap-2`}>
//           <View style={tw`flex-row justify-between items-center`}>
//             <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
//               {item?.meal_name || item?.title || "Untitled"}
//             </Text>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconStar} />
//               <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
//                 {item?.rating || 0}
//               </Text>
//             </View>
//           </View>
//           <View style={tw`flex-row justify-between items-center`}>
//             <Text style={tw`text-sm font-inter-700 text-[#454545] leading-5`}>
//               {item?.have_it}
//             </Text>
//             <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
//               <SimplifyDate date={safeDate} />
//             </Text>
//           </View>
//         </View>
//         <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
//           {item?.description}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default React.memo(PostViewCard);

// import { Entypo } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";

// import {
//   IconHeart,
//   IconLOcation,
//   IconLove,
//   IconRestruernt,
//   IconStar,
//   IconVerify,
// } from "@/assets/Icon";

// import tw from "../../lib/tailwind";
// import { usePostLikeMutation } from "../../redux/commentApi/commentApi";
// import SimplifyDate from "../../utils/SimplifyDate";
// import BookMark from "./BookMark";
// import ButtomSheet from "./ButtomSheet";
// import ShareButton from "./ShareButton";
// import TacoSlider from "./TacoSlider";

// const DEFAULT_AVATAR = "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png";

// const PostViewCard = ({ item, openModal, handleNavigate }) => {
//   const [postLike, { isLoading }] = usePostLikeMutation();

//   const [isHeart, setIsHeart] = useState(item?.isHeart || false); //initial like state
//   const [loveCount, setLoveCount] = useState(item?.love_reacts || 0); //  count state

//   const safeDate = item?.created_at?.split(".")[0];

//   const handleHeart = async (postId) => {
//     try {
//       const res = await postLike({ post_id: postId }).unwrap();
//       console.log(" API Response:", res);

//       if (res?.status === true) {
//         setIsHeart(res?.isHeart);

//         // update love count accordingly
//         setLoveCount((prev) => (res?.isHeart ? prev + 1 : prev - 1));
//       }
//     } catch (error) {
//       console.error("Heart toggle failed:", error);
//     }
//   };

//   return (
//     <View style={tw`flex-1 my-3 py-2 flex-col gap-3`}>
//       {/* Header */}
//       <View style={tw`flex-row items-center gap-2`}>
//         <TouchableOpacity onPress={handleNavigate}>
//           <Image
//             style={tw`w-10 h-10 rounded-full`}
//             source={{ uri: DEFAULT_AVATAR }}
//           />
//         </TouchableOpacity>

//         <View style={tw`flex gap-0.5 flex-1`}>
//           <View style={tw`flex-row items-center justify-between`}>
//             <View style={tw`flex-row gap-3`}>
//               <TouchableOpacity
//                 onPress={handleNavigate}
//                 style={tw`flex-row items-center gap-2`}
//               >
//                 <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
//                   {item?.user_name}
//                 </Text>
//                 <SvgXml xml={IconVerify} />
//               </TouchableOpacity>

//               <View style={tw`flex-row gap-1 items-center`}>
//                 {item?.tagged?.map((tag, index) => (
//                   <Text
//                     key={index}
//                     style={tw`text-[12px] font-inter-700 text-[#454545]`}
//                   >
//                     #{tag}
//                   </Text>
//                 ))}
//               </View>
//             </View>

//             <TouchableOpacity onPress={openModal}>
//               <Entypo name="dots-three-vertical" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Location */}
//           <View style={tw`flex-row gap-2 items-center`}>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconRestruernt} />
//               <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                 {item?.restaurant_name || "Unknown"}
//               </Text>
//             </View>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconLOcation} />
//               <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                 {item?.location || "Unknown"}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Image Slider */}
//       <TacoSlider images={item?.images} />

//       {/* Actions */}
//       <View style={tw`flex-row mr-[5%] items-center mt-3`}>
//         <View style={tw`flex-row items-center gap-4`}>
//           {/* Like */}
//           <View style={tw`flex-row items-center gap-1`}>
//             <TouchableOpacity onPress={() => handleHeart(item?.id)}>
//               <SvgXml xml={isHeart ? IconHeart : IconLove} />
//             </TouchableOpacity>
//             <Text style={tw`text-[13px] font-inter-600 text-[#454545]`}>
//               {loveCount}
//             </Text>
//           </View>

//           {/* Comment */}
//           <ButtomSheet item={item} />

//           {/* Share */}
//           <ShareButton />
//         </View>

//         {/* Bookmark */}
//         <View style={tw`ml-auto`}>
//           <BookMark />
//         </View>
//       </View>

//       {/* Content */}
//       <View style={tw`mt-2 gap-1.5`}>
//         <View style={tw`flex-col gap-2`}>
//           <View style={tw`flex-row justify-between items-center`}>
//             <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
//               {item?.meal_name || item?.title || "Untitled"}
//             </Text>
//             <View style={tw`flex-row gap-1 items-center`}>
//               <SvgXml xml={IconStar} />
//               <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
//                 {item?.rating || 0}
//               </Text>
//             </View>
//           </View>
//           <View style={tw`flex-row justify-between items-center`}>
//             <Text style={tw`text-sm font-inter-700 text-[#454545] leading-5`}>
//               {item?.have_it}
//             </Text>
//             <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
//               <SimplifyDate date={safeDate} />
//             </Text>
//           </View>
//         </View>
//         <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
//           {item?.description}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default React.memo(PostViewCard);

import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

import {
  IconHeart,
  IconLOcation,
  IconLove,
  IconRestruernt,
  IconStar,
  IconVerify,
} from "@/assets/Icon";

import tw from "../../lib/tailwind";
import { usePostLikeMutation } from "../../redux/commentApi/commentApi";
import SimplifyDate from "../../utils/SimplifyDate";
import BookMark from "./BookMark";
import ButtomSheet from "./ButtomSheet";
import ShareButton from "./ShareButton";
import TacoSlider from "./TacoSlider";

const DEFAULT_AVATAR = "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png";

const PostViewCard = ({ item, openModal, handleNavigate, refetch }) => {
  const [isHeart, setIsHeart] = useState(false);
  const [loveCount, setLoveCount] = useState(item?.love_reacts || 0);

  const safeDate = item?.created_at?.split(".")[0];
  const [postLike, { isLoading }] = usePostLikeMutation();

  // const { data } = useUserDiscoveryAllPostQuery();
  // console.log("----------------------------------------------------------");
  // console.log("new data", data?.data?.data);

  const handleHeart = async (postId) => {
    try {
      const res = await postLike({ post_id: postId }).unwrap();

      console.log("text heart", res);
    } catch (error) {
      console.error("Heart toggle failed:", error);
    }
  };

  return (
    <View style={tw`flex-1 my-3 py-2 flex-col gap-3`}>
      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image
            style={tw`w-10 h-10 rounded-full`}
            source={{ uri: DEFAULT_AVATAR }}
          />
        </TouchableOpacity>

        <View style={tw`flex gap-0.5 flex-1`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={handleNavigate}
                style={tw`flex-row items-center gap-2`}
              >
                <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
                  {item?.user_name} id {item?.id}
                </Text>
                <SvgXml xml={IconVerify} />
              </TouchableOpacity>

              <View style={tw`flex-row gap-1 items-center`}>
                {item?.tagged?.map((tag, index) => (
                  <Text
                    key={index}
                    style={tw`text-[12px] font-inter-700 text-[#454545]`}
                  >
                    #{tag}
                  </Text>
                ))}
              </View>
            </View>

            <TouchableOpacity onPress={openModal}>
              <Entypo name="dots-three-vertical" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row gap-2 items-center`}>
            <View style={tw`flex-row gap-1 items-center`}>
              <SvgXml xml={IconRestruernt} />
              <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
                {item?.restaurant_name || "Unknown"}
              </Text>
            </View>
            <View style={tw`flex-row gap-1 items-center`}>
              <SvgXml xml={IconLOcation} />
              <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
                {item?.location || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TacoSlider images={item?.images} />

      <View style={tw`flex-row mr-[5%] items-center mt-3`}>
        <View style={tw`flex-row items-center gap-4`}>
          <View style={tw`flex-row items-center gap-1`}>
            <TouchableOpacity onPress={() => handleHeart(item?.id)}>
              <SvgXml xml={item?.isHeart ? IconHeart : IconLove} />
            </TouchableOpacity>

            <Text style={tw`text-[13px] font-inter-600 text-[#454545]`}>
              {/* {data?.data?.data.love_reacts} */}d33
            </Text>
          </View>

          <ButtomSheet item={item} />
          <ShareButton />
        </View>

        <View style={tw`ml-auto`}>
          <BookMark post={item} />
        </View>
      </View>

      <View style={tw`mt-2 gap-1.5`}>
        <View style={tw`flex-col gap-1`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
              {item?.meal_name || item?.title || "Untitled"}
            </Text>
            <View style={tw`flex-row gap-1 items-center`}>
              <SvgXml xml={IconStar} />
              <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
                {item?.rating || 0}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-sm font-inter-600 text-[#454545] leading-5`}>
              {item?.have_it}
            </Text>
            <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
              <SimplifyDate date={safeDate} />
            </Text>
          </View>
        </View>

        <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

export default PostViewCard;
