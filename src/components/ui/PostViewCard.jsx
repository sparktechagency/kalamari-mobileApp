import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
import SimplifyDate from "../../utils/SimplifyDate";

import { router } from "expo-router";
import { makeImage } from "../../redux/api/baseApi";
import { useGetProfileQuery } from "../../redux/apiSlices/authApiSlice";
import BookMark from "./BookMark";
import ButtomSheet from "./ButtomSheet";
import { DEFAULT_AVATAR } from "./CommentItem";
import ReportModal from "./ReportModal";
import ShareButton from "./ShareButton";
import TacoSlider from "./TacoSlider";

const PostViewCard = ({ item, openModal, refetch }) => {
  const [isLiked, setIsLiked] = useState(item?.isHeart ?? false);
  const [loveCount, setLoveCount] = useState(item?.love_reacts ?? 0);
  const { data } = useGetProfileQuery();
  // console.log(item);

  // const imageUrl = ;
  // console.log("imageUrl", imageUrl);

  const [isVisible, setIsVisible] = useState(false);
  // const openModal = () => {
  //   setIsVisible(true);
  // };

  const safeDate = item?.created_at?.split(".")[0] || "";
  const [postLike] = usePostLikeMutation();

  const [userPostInfo, setuserPostInfo] = useState([]);

  // console.log("userPostInfo , ", userPostInfo);

  // love
  const handleHeart = async (postId) => {
    try {
      setIsLiked((prev) => !prev);
      setLoveCount((prev) => (isLiked ? prev - 1 : prev + 1));

      const res = await postLike({ post_id: postId }).unwrap();
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

  return (
    <View style={tw`flex-1 my-3 py-2 flex-col gap-3`}>
      {/* --- User Info Header --- */}
      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity onPress={() => handleNavigate(item?.user_id)}>
          <Image
            source={{
              uri: makeImage(item?.avatar) || DEFAULT_AVATAR,
            }}
            style={tw`w-10 h-10 rounded-full`}
          />
        </TouchableOpacity>

        <View style={tw`flex-1 gap-0.5`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={() => handleNavigate(item?.user_id)}
                style={tw`flex-row items-center gap-2`}
              >
                <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
                  {item?.user_name || "Unknown"}
                </Text>
                <SvgXml xml={IconVerify} />
              </TouchableOpacity>

              <View style={tw`flex-row gap-1 items-center`}>
                {item?.tagged?.map((tag, index) => (
                  <Text
                    key={index}
                    style={tw`text-[12px] font-inter-700 text-[#454545]`}
                  >
                    {tag && `#${tag}`}
                  </Text>
                ))}
              </View>
            </View>

            {/* user report modal  */}
            <TouchableOpacity
              onPress={() => {
                return setIsVisible(!isVisible), setuserPostInfo(item);
              }}
            >
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

      {/* --- Image Carousel --- */}
      <View>
        <TacoSlider images={item?.photo} />

        {/* --- Reactions, Bookmark, Share --- */}
        <View style={tw`flex-row items-center mt-3 `}>
          <View style={tw`flex-row items-center w-[40%] gap-2`}>
            <View style={tw`flex-row items-center gap-1`}>
              <TouchableOpacity onPress={() => handleHeart(item?.id)}>
                <SvgXml xml={isLiked ? IconHeart : IconLove} />
              </TouchableOpacity>
              <Text style={tw`text-[13px] font-inter-600 text-[#454545]`}>
                {loveCount > 0 && loveCount}
              </Text>
            </View>
            <ButtomSheet item={item} />
            <ShareButton />
          </View>

          <View style={tw`ml-auto`}>
            <BookMark post={item} refetch={refetch} />
          </View>
        </View>
      </View>

      {/* --- Title, Rating, Description --- */}
      <View style={tw`mt-2 gap-1.5`}>
        <View style={tw`flex-col gap-1`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
              {item?.meal_name || item?.title || "Untitled"}
            </Text>

            {item?.rating && (
              <View style={tw`flex-row gap-1 items-center`}>
                <SvgXml xml={IconStar} />
                <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
                  {item?.rating || 0}
                </Text>
              </View>
            )}
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-sm font-inter-600 text-[#454545] leading-5`}>
              {item?.have_it || ""}
            </Text>
            <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
              <SimplifyDate date={safeDate} />
            </Text>
          </View>
        </View>

        {item?.description ? (
          <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
            {item?.description}
          </Text>
        ) : null}
      </View>

      <ReportModal
        isVisible={isVisible}
        closeModal={() => setIsVisible(!isVisible)}
        userPostInfo={userPostInfo}
      />
    </View>
  );
};

export default PostViewCard;
