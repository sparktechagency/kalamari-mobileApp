import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import icons from "../../../assets/images/restaurant.png";
import tw from "../../lib/tailwind";
import BookMark from "./BookMark";
import ButtomSheet from "./ButtomSheet";
import ShareButton from "./ShareButton";
import TacoSlider from "./TacoSlider";

const ListButtomSheet = ({ bottomSheetRef }) => {
  const [isHeart, setIsHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleHeart = (id) => {
    setIsHeart((pre) => {
      const newState = !pre;
      setLikeCount((count) => (newState ? count + 1 : count - 1));
      return newState;
    });
  };

  // close buttom sheet
  const handlClose = () => {
    bottomSheetRef.current.close();
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RBSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={600}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 15,
            },
          }}
        >
          <View style={tw`flex-1`}>
            <View style={tw`my-4 flex-col gap-3`}>
              <View style={tw` flex-row items-center gap-2`}>
                <Image
                  style={tw`w-10 h-10 rounded-full `}
                  source={{ uri: "https://i.ibb.co/YTbY9RFH/Ellipse-4.png" }}
                />
                {/* user name and verify icons wrapp */}
                <View style={tw`flex gap-0.5 flex-1 `}>
                  {/* user name and verify icons wrapp */}
                  <View style={tw`flex-row items-center  justify-between`}>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text
                        style={tw` text-3.5 font-inter-700  text-[#121212] `}
                      >
                        Emma Johnson
                      </Text>
                      <MaterialCommunityIcons
                        name="check-decagram"
                        size={16}
                        color="#3b82f6"
                      />
                    </View>
                    <Ionicons
                      name="close"
                      size={24}
                      //   style={tw`mr-2 text-[#00C49A]`}
                      color="#E53E3E"
                      onPress={handlClose}
                    />
                  </View>
                  <View style={tw`flex-row gap-1 items-center `}>
                    <Image style={tw`w-4 h-4`} source={icons} />
                    <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
                      45 Portland, Oregon
                    </Text>
                  </View>
                </View>
              </View>

              {/* redirects  to sing view post page  */}

              <View>
                <TacoSlider />
              </View>

              <View>
                {/* details view wrapp Like comment  */}
                <View
                  style={tw`flex-row gap-4 items-center  justify-between mt-3`}
                >
                  {/*  */}
                  <View style={tw`flex-row gap-4 items-center  `}>
                    {/* heart icon */}
                    <View style={tw`flex-row gap-1 items-center `}>
                      <AntDesign
                        onPress={handleHeart}
                        name="heart"
                        size={20}
                        color={isHeart ? "red" : "black"}
                      />
                      <Text>{likeCount}</Text>
                    </View>
                    {/* message */}
                    <View style={tw`flex-row gap-1 items-center `}>
                      <ButtomSheet />
                      <Text>55</Text>
                    </View>
                    {/* share */}
                    <View>
                      <ShareButton />
                    </View>
                  </View>

                  {/* bookMark */}
                  <View>
                    <BookMark />
                  </View>
                </View>

                {/*  view user info and details  */}
                <View style={tw`flex mt-2 gap-1   `}>
                  <View style={tw`flex-col gap-1   `}>
                    {/* rating */}
                    <View style={tw`flex-row justify-between  items-center  `}>
                      <Text
                        style={tw` text-4 font-inter-700 text-textPrimary `}
                      >
                        Spicy taco
                      </Text>
                      {/* star icons */}
                      <View style={tw`flex-row gap-1 items-center`}>
                        <FontAwesome name="star" size={20} color="#ffde21" />
                        <Text
                          style={tw` text-[16px] text-textPrimary font-inter-600  `}
                        >
                          4.5
                          {/* {item?.rating} */}
                        </Text>
                      </View>
                    </View>
                    {/* past date  */}
                    <View style={tw`flex-row justify-between  items-center  `}>
                      {/* view mail   */}
                      <View style={tw`flex-row gap-1 items-center  `}>
                        {/* {item?.category?.map((ite, index) => (
                        <Text
                          key={index}
                          style={tw` text-[12px] font-semibold text-[#454545]  `}
                        >
                          {ite}
                        </Text>
                      ))} */}
                        <Text
                          style={tw` text-[12px] font-inter-600 text-[#454545]  `}
                        >
                          Meal Restaurant
                        </Text>
                      </View>
                      {/* star icons */}
                      <View style={tw`flex-row gap-1 items-center`}>
                        <Text
                          style={tw` text-[14px] font-inter-400 text-[#454545] `}
                        >
                          {/* {item?.date} */}
                          03/15/2026
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* post details  */}
                  <View>
                    {/*  */}
                    <Text
                      style={tw`items-start text-3.5 text-textPrimary font-inter-400 leading-5`}
                    >
                      {/* {item?.description} */}
                      Indulge in a creamy fettuccine Alfredo, tossed with tender
                      chicken and fresh parsley.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default ListButtomSheet;
