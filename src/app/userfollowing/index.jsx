// app/(drawer)/userfollowing/index.jsx
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import BackButton from "../../components/ui/BackButton";
import tw from "../../lib/tailwind";

export default function UserFollowing() {
  const [isFollower, setIsFollower] = useState(false);

  const handleFollow = () => setIsFollower(!isFollower);

  return (
    <View style={tw`  flex-1 bg-primaryBg `}>
      {/* when the api changes ScrollView and adds flatList  */}
      <BackButton
        onPress={() => {
          router?.back();
        }}
        title={"Followers"}
      />
      {/*  */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-col gap-4 p-[4%] `}>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* tah;a */}
          <View
            style={tw` bg-[#D5D5D51A]  flex-row justify-between items-center  p-2 rounded-2 `}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Image
                style={tw`h-14 w-14 rounded-full`}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwg2PWrY_5mkISXy_GqXWUYPbglvpL6FSUgg&s",
                }}
              />
              <Text style={tw`text-3.2 font-inter-700`}>Saka</Text>
            </View>
            <View>
              <Pressable
                onPress={handleFollow}
                style={tw`  ${
                  isFollower
                    ? " border-2 border-[#B0B0B0] bg-[#B0B0B0] bg-opacity-20 "
                    : "bg-orange"
                }  py-1 px-5  rounded-full `}
              >
                <Text
                  style={tw` ${
                    isFollower
                      ? "text-[#B0B0B0] font-inter-700"
                      : "text-white font-inter-700"
                  }  `}
                >
                  {" "}
                  {isFollower ? "Following" : "Follow"}{" "}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
