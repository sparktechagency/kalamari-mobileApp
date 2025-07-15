import { IconRestruernt, IconsListDeleted } from "@/assets/Icon";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useDeletedBookMarkSinglePostMutation } from "../../redux/listApi/listApi";
import { cardViewDate } from "../../utils/cardViewDate";

// const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MyList = ({ isLoading, data }) => {
  //   const bottomSheetRef = useRef();

  console.log("MyList", data);

  const [deletedPost] = useDeletedBookMarkSinglePostMutation();

  const handleDelete = (id, type) => {
    // console.log(id, ha);

    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Perform delete logic here

            const res = await deletedPost({ post_id: id, type: type }).unwrap();
            console.log(res);

            Alert.alert("Deleted", "Item has been deleted successfully.");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1`}>
      {/* when the api changes ScrollView and adds flatList  */}
      <FlatList
        data={data}
        keyExtractor={(item) => item?.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router?.push("/notifications/1");
            }}
            key={item?.id}
          >
            <View style={tw`flex-col my-2 justify-between items-center`}>
              <View
                style={tw`flex-row gap-4 bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
              >
                {/* Image */}
                <Image
                  source={{ uri: makeImage(item?.photo[0]) }}
                  style={tw`w-18 h-18 rounded-[8px]`}
                />

                {/* Content */}
                <View style={tw`flex-1 `}>
                  {/* Title and Rating */}

                  <View style={tw`flex-row  justify-between gap-1 `}>
                    <View style={tw`flex-col gap-1.2 justify-between `}>
                      <Text
                        style={tw`text-base  font-inter-700 text-textPrimary`}
                      >
                        {item?.meal_name}
                      </Text>
                      <View style={tw`flex-row items-center`}>
                        <SvgXml xml={IconRestruernt} />
                        <Text
                          style={tw`text-[#454545] ml-1 flex items-center justify-center font-inter-400 text-sm`}
                        >
                          {item?.location}
                        </Text>
                      </View>
                    </View>

                    {/* Location and Date */}
                    <View
                      style={tw`flex-col gap-1.2 mt-1 justify-between items-end `}
                    >
                      <View style={tw`flex-row items-center`}>
                        <FontAwesome name="star" size={16} color="#facc15" />
                        <Text style={tw`ml-1 text-textPrimary font-inter-600 `}>
                          {item?.rating}
                        </Text>
                      </View>

                      <Text style={tw`text-[#454545] font-inter-400 text-sm`}>
                        {/* <SimplifyDate data={safeDate} /> */}
                        {cardViewDate(item?.created_at)}
                      </Text>
                    </View>
                  </View>

                  {/* Tags */}
                  <View style={tw`flex-row justify-between items-center mt-2`}>
                    <View style={tw`flex-row gap-2`}>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545]`}
                      >
                        {item?.food_type}
                      </Text>
                      <Text
                        style={tw`text-[12px] font-inter-600 text-[#454545]`}
                      >
                        {item?.have_it}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        handleDelete(
                          item?.id,
                          item?.have_it === "Restaurant" ? 1 : ""
                        )
                      }
                    >
                      <SvgXml xml={IconsListDeleted} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyList;
