import tw from "@/src/lib/tailwind";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { IconBookMark, IconBookMarkFull } from "@/assets/Icon";
import { useUserBookMarkMutation } from "../../redux/homeApi/homeApi";

const BookMark = ({ post, refetch }) => {
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmark || false);
  const [toggleBookmark, { isLoading }] = useUserBookMarkMutation();

  // console.log(post?.id);

  const handleBookmarkToggle = async () => {
    try {
      const type = post?.have_it === "Restaurant" ? 1 : 2;

      // Optimistic update
      setIsBookmarked((prev) => !prev);

      const res = await toggleBookmark({ post_id: post?.id, type }).unwrap();
      console.log(res);

      if (refetch) refetch();
    } catch (error) {
      // Revert bookmark if API call fails
      setIsBookmarked((prev) => !prev);
      console.error("Bookmark toggle failed:", error);
      Alert.alert("Error", "Failed to update bookmark.");
    }
  };

  return (
    <View style={tw`justify-center items-center`}>
      <TouchableOpacity onPress={handleBookmarkToggle} disabled={isLoading}>
        <SvgXml xml={isBookmarked ? IconBookMarkFull : IconBookMark} />
      </TouchableOpacity>
    </View>
  );
};

export default BookMark;
