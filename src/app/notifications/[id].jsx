// import {
//   IconHeart,
//   IconLOcation,
//   IconLove,
//   IconRestruernt,
//   IconStar,
//   IconVerify,
// } from "@/assets/Icon";
// import { MaterialIcons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";
// import BookMark from "../../components/ui/BookMark";
// import ButtomSheet from "../../components/ui/ButtomSheet";
// import ShareButton from "../../components/ui/ShareButton";
// import TacoSlider from "../../components/ui/TacoSlider";
// import tw from "../../lib/tailwind";
// import { useGetSinglePostQuery } from "../../redux/listApi/listApi";
// // Example icons as SVG XML
// const IconLocation = `<svg fill="#9ca3af" viewBox="0 0 24 24" height="14" width="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`;

// const TacoPostCard = () => {
//   const [isHeart, setIsHeart] = useState(false);

//   const { id } = useLocalSearchParams();

//   const { data , isLoading  } = useGetSinglePostQuery({ post_id: id });
//   console.log(data?.data);

//   return  (
//     <View style={tw`bg-primaryBg flex-1`}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Top: Profile info */}
//         <View style={tw`flex-col gap-1.2 p-[4%] `}>
//           <View style={tw`flex-row items-center gap-2 my-4`}>
//             <TouchableOpacity
//               onPress={() => {
//                 router?.back();
//               }}
//             >
//               <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//             </TouchableOpacity>
//             <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
//           </View>
//           <View style={tw`flex-row items-center justify-between mb-3`}>
//             <View style={tw`flex-row items-center`}>
//               <Image
//                 source={{
//                   uri: "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png",
//                 }}
//                 style={tw`w-10 h-10 rounded-full`}
//               />
//               <View style={tw`ml-3`}>
//                 <View style={tw`flex-row items-center gap-1`}>
//                   <Text style={tw`text-sm font-bold text-black`}>
//                     Emma Johnson
//                   </Text>
//                   <SvgXml xml={IconVerify} />
//                 </View>
//                 <View style={tw`flex-row gap-2 items-center `}>
//                   <View style={tw`flex-row gap-1 items-center `}>
//                     <SvgXml xml={IconRestruernt} />
//                     <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
//                       Pizzaburg
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row gap-1 items-center `}>
//                     <SvgXml xml={IconLOcation} />
//                     <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
//                       Portland, Oregon
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={tw`flex-col gap-1.2 `}>
//             {/* Post Image */}
//             <TacoSlider />

//             <View style={tw`flex-col gap-1.2 `}>
//               {/* Post actions */}
//               {/* details view wrapp Like comment  */}
//               <View
//                 style={tw`flex-row gap-4 items-center  justify-between mt-3`}
//               >
//                 {/*  */}
//                 <View style={tw`flex-row gap-4 justify-center items-center  `}>
//                   {/* heart icon */}
//                   <View style={tw`flex-row justify-center gap-1 items-center `}>
//                     <TouchableOpacity onPress={() => setIsHeart(!isHeart)}>
//                       {/* <SvgXml xml={IconLove} /> */}
//                       {isHeart ? (
//                         <SvgXml xml={IconHeart} />
//                       ) : (
//                         <SvgXml xml={IconLove} />
//                       )}
//                     </TouchableOpacity>

//                     <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
//                       1111
//                     </Text>
//                   </View>
//                   {/* message */}
//                   <View style={tw`flex-row gap-1 justify-center items-center `}>
//                     <ButtomSheet />
//                     <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
//                       1,253
//                     </Text>
//                   </View>
//                   {/* share */}
//                   <View>
//                     <ShareButton />
//                   </View>
//                 </View>

//                 {/* bookMark */}
//                 <View>
//                   <BookMark />
//                 </View>
//               </View>

//               {/* Post Info */}
//               <View style={tw`flex-col gap-1.2 `}>
//                 <View style={tw`flex-row justify-between items-center `}>
//                   <Text style={tw`text-lg font-semibold text-black`}>
//                     Spicy taco
//                   </Text>
//                   <View style={tw`flex-row items-center`}>
//                     {/* <Text style={tw`text-yellow-500 font-bold`}>★</Text> */}
//                     <SvgXml xml={IconStar} />
//                     <Text style={tw`ml-1 text-black font-semibold`}>4.0</Text>
//                   </View>
//                 </View>

//                 {/* Categories + Date */}
//                 <View style={tw`flex-row justify-between items-center `}>
//                   <View style={tw`flex-row gap-2`}>
//                     <Text style={tw`text-xs text-gray-500 font-semibold`}>
//                       Meal
//                     </Text>
//                     <Text style={tw`text-xs text-gray-500 font-semibold`}>
//                       Restaurant
//                     </Text>
//                   </View>
//                   <Text style={tw`text-xs text-gray-500`}>03/15/2026</Text>
//                 </View>

//                 {/* Description */}
//                 <Text style={tw`mt-1 text-sm text-gray-700 leading-5`}>
//                   Indulge in a creamy fettuccine Alfredo, tossed with tender
//                   chicken and fresh parsley.
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default TacoPostCard;

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

import {
  IconHeart,
  IconLOcation,
  IconLove,
  IconRestruernt,
  IconStar,
  IconVerify,
} from "@/assets/Icon";

import { usePostLikeMutation } from "../../redux/commentApi/commentApi";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import BookMark from "../../components/ui/BookMark";
import ButtomSheet from "../../components/ui/ButtomSheet";
import { DEFAULT_AVATAR } from "../../components/ui/CommentItem";
import ShareButton from "../../components/ui/ShareButton";
import TacoSlider from "../../components/ui/TacoSlider";
import { makeImage } from "../../redux/api/baseApi";
import { useGetSinglePostQuery } from "../../redux/listApi/listApi";
import { cardViewDate } from "../../utils/cardViewDate";

const PostViewCard = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, refetch } = useGetSinglePostQuery({ post_id: id });
  // console.log(data?.data);
  const [isLiked, setIsLiked] = useState(data?.data?.isHeart ?? false);
  const [loveCount, setLoveCount] = useState(data?.data?.love_reacts ?? 0);

  const safeDate = data?.data?.created_at?.split(".")[0] || "";
  const [postLike] = usePostLikeMutation();

  // love
  const handleHeart = async (id) => {
    try {
      setIsLiked((prev) => !prev);
      setLoveCount((prev) => (isLiked ? prev - 1 : prev + 1));

      const res = await postLike({ post_id: id }).unwrap();
      if (refetch) refetch();
    } catch (error) {
      // Revert on error
      setIsLiked((prev) => !prev);
      setLoveCount((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error("Heart toggle failed:", error);
    }
  };

  const handleNavigate = (id) => {
    if (data?.data?.id === id) {
      router.push(`/Profile`);
    } else {
      router.push(`randomuser/${id}`);
    }

    // console.log(id);
    // router.push(`randomuser/${id}`);
  };

  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1 bg-primaryBg px-[4%]`}>
      <View style={tw`flex-1 my-3 py-2 flex-col gap-3`}>
        {/* --- User Info Header --- */}
        <View style={tw`flex-row items-center gap-2`}>
          <TouchableOpacity onPress={() => handleNavigate(data?.data?.user_id)}>
            {/*  -> -------------- user image  */}
            <Image
              source={{
                uri: makeImage(data?.data?.avatar) || DEFAULT_AVATAR,
              }}
              style={tw`w-10 h-10 rounded-full`}
            />
          </TouchableOpacity>

          <View style={tw`flex-1 gap-0.5`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-row gap-3`}>
                <TouchableOpacity
                  onPress={() => handleNavigate(data?.data?.user_id)}
                  style={tw`flex-row items-center gap-2`}
                >
                  <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
                    {data?.data?.user_name || "Unknown"}
                  </Text>
                  <SvgXml xml={IconVerify} />
                </TouchableOpacity>

                <View style={tw`flex-row gap-1 items-center`}>
                  {data?.data?.tagged?.map((tag, index) => (
                    <Text
                      key={index}
                      style={tw`text-[12px] font-inter-700 text-[#454545]`}
                    >
                      {tag && `#${tag}`}
                    </Text>
                  ))}
                </View>
              </View>
              {/* 
              <TouchableOpacity onPress={openModal}>
                <Entypo name="dots-three-vertical" size={16} color="black" />
              </TouchableOpacity> */}
            </View>

            <View style={tw`flex-row gap-2 items-center`}>
              <View style={tw`flex-row gap-1 items-center`}>
                <SvgXml xml={IconRestruernt} />
                <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
                  {data?.data?.restaurant_name || "Unknown"}
                </Text>
              </View>
              <View style={tw`flex-row gap-1 items-center`}>
                <SvgXml xml={IconLOcation} />
                <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
                  {data?.data?.location || "Unknown"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* --- Image Carousel --- */}
        <View style={tw`h-80`}>
          <TacoSlider images={data?.data?.photo} />
        </View>

        {/* --- Reactions, Bookmark, Share --- */}
        <View style={tw`flex-row items-center `}>
          <View style={tw`flex-row items-center w-[40%] gap-2`}>
            <View style={tw`flex-row items-center gap-1`}>
              <TouchableOpacity onPress={() => handleHeart(data?.data?.id)}>
                <SvgXml xml={isLiked ? IconHeart : IconLove} />
              </TouchableOpacity>
              <Text style={tw`text-[13px] font-inter-600 text-[#454545]`}>
                {loveCount > 0 && loveCount}
              </Text>
            </View>
            <ButtomSheet item={data?.data} />
            <ShareButton />
          </View>

          <View style={tw`ml-auto`}>
            <BookMark post={data?.data} refetch={refetch} />
          </View>
        </View>

        {/* --- Title, Rating, Description --- */}
        <View style={tw`mt-2 gap-1.5`}>
          <View style={tw`flex-col gap-1`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
                {data?.data?.meal_name || data?.data?.title || "Untitled"}
              </Text>
              <View style={tw`flex-row gap-1 items-center`}>
                <SvgXml xml={IconStar} />
                <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
                  {data?.data?.rating || 0}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-inter-600 text-[#454545] leading-5`}>
                {data?.data?.have_it || ""}
              </Text>
              <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
                {cardViewDate(data?.data?.created_at)}
              </Text>
            </View>
          </View>

          {data?.data?.description ? (
            <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
              {data?.data?.description}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default PostViewCard;
