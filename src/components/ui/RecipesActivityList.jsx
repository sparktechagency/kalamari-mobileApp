import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useGetRandomAllBookMarkQuery } from "../../redux/randomuserApi/randomuserApi";
import { cardViewDate } from "../../utils/cardViewDate";

// const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const RecipesActivityList = ({ id }) => {
  const { data, refetch, isLoading } = useGetRandomAllBookMarkQuery({
    type: 1,
    user_id: id,
  });

  // console.log(data?.data?.data);

  // const handleNavigate = () => {
  //   // console.log("asdfg");
  //   ;
  // };

  // ---------------------------------------------------------
  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1`}>
      {/* when the api changes ScrollView and adds flatList  */}
      <FlatList
        data={data?.data?.data}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item?.id}
            onPress={() => router.push(`/notifications/${item?.id}`)}
          >
            <View style={tw`flex-col my-2 justify-between items-center`}>
              <View
                style={tw`flex-row gap-4 bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
              >
                {/* Image */}
                <Image
                  source={{
                    uri: makeImage(item?.photo[0]),
                  }}
                  style={tw`w-18 h-18 rounded-[8px]`}
                />

                {/* Content */}
                <View style={tw`flex-1 `}>
                  {/* Title and Rating */}

                  <View style={tw`flex-row   justify-between items-center`}>
                    <View style={tw`flex-col gap-1.2 justify-between `}>
                      <Text
                        style={tw`text-base  font-inter-700 text-textPrimary`}
                      >
                        {item?.meal_name}
                      </Text>
                    </View>

                    {/* Location and Date */}
                    <View
                      style={tw`flex-col gap-1.2 mt-1 justify-between items-end`}
                    >
                      {/* <View style={tw`flex-row items-center`}>
                        <FontAwesome name="star" size={16} color="#facc15" />
                        <Text style={tw`ml-1 text-textPrimary font-inter-600 `}>
                          2.8
                        </Text>
                      </View> */}

                      <Text style={tw`text-[#454545] font-inter-400 text-sm`}>
                        {cardViewDate(item?.created_at)}
                      </Text>
                    </View>
                    {/* <FontAwesome name="star" size={16} color="#facc15" />
                    <SvgXml xml={IconsListDeleted} /> */}
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
                    {/* <TouchableOpacity onPress={handleDelete}>
                      <SvgXml xml={IconsListDeleted} />
                    </TouchableOpacity> */}
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

export default RecipesActivityList;
