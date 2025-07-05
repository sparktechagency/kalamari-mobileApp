import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import tw from "../../lib/tailwind";

const Following = () => {
  const [setIsFollowing, setIsFollowingsetIsFollowing] = useState(false);

  const handleFollow = () => setIsFollowingsetIsFollowing(!setIsFollowing);

  return (
    <View>
      {/* when the api changes ScrollView and adds flatList  */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/*  following  user content wrapp   */}
        <View
          style={tw` flex-row justify-between items-center bg-[#D5D5D51A] p-2 rounded-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              style={tw`h-14 w-14 rounded-full`}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
              }}
            />
            <Text style={tw`text-3.2 font-inter-700 `}>Saka</Text>
          </View>
          <View>
            <Pressable
              onPress={handleFollow}
              style={tw`  ${
                setIsFollowing
                  ? " bg-[#E53E3E]  "
                  : " border-2 border-[#E53E3E] "
              }  py-1 px-5  rounded-full `}
            >
              <Text
                style={tw` ${
                  setIsFollowing
                    ? "text-white text-3 font-inter-700"
                    : "text-[#E53E3E] font-inter-700"
                }  `}
              >
                {" "}
                {setIsFollowing ? "Follow" : "Unfollow"}{" "}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Following;
