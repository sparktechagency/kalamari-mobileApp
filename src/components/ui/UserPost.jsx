import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { useLazyDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
import PostViewCard from "./PostViewCard";

const UserPost = ({ isActiveTab, openModal }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [dataLoad, setDataLoad] = useState(false);
  const [postsData, setDataPosts] = useState([]);

  const [getLazyDiscover, disvoverResuls] = useLazyDiscoveryAllPostQuery();

  const hanldeDataLoad = async () => {
    if (
      !dataLoad &&
      !disvoverResuls?.isLoading &&
      !disvoverResuls?.isFetching
    ) {
      // console.log("Actual work");
      setDataLoad(true);

      getLazyDiscover({ page: page })
        .then((res) => {
          // console.log(res);
          if (res?.data?.status) {
            setDataPosts(postsData?.concat(res?.data?.data?.data));
            setPage(res?.data?.data?.current_page + 1);
          }
        })
        .finally(() => {
          console.log("Eding");
          setDataLoad(false);
        });
    }
  };

  useEffect(() => {
    hanldeDataLoad();
  }, []);

  // if (disvoverResuls?.isLoading && page === 1) {
  //   return (
  //     <View style={tw`flex-1 justify-center items-center`}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // console.log("page of current" + page);
  // console.log(page);

  return (
    <View style={tw`flex-1`}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={disvoverResuls?.refetch}
            onRefresh={disvoverResuls?.isFetching}
            colors={["#ED6237"]}
            tintColor="#ED6237"
          />
        }
        // ListEmptyComponent={() => {
        //   return (
        //     <>
        //       <Text style={tw`text-center py-10 text-gray-500`}>
        //         No posts available
        //       </Text>
        //     </>
        //   );
        // }}
        ListFooterComponent={
          disvoverResuls?.isLoading ? (
            <ActivityIndicator color={"#ED6237"} style={tw`my-4`} />
          ) : null
        }
        onEndReached={hanldeDataLoad}
        onEndReachedThreshold={0.5}
        data={postsData}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostViewCard item={item} openModal={openModal} />
        )}
      />
    </View>
  );
};

export default UserPost;

// import { useCallback, useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   Text,
// } from "react-native";

// import { router } from "expo-router";
// import tw from "../../lib/tailwind";
// import { useDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
// import PostViewCard from "./PostViewCard";

// const UserPost = ({ isActiveTab, openModal }) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);

//   const { data, isLoading, isFetching, refetch } = useDiscoveryAllPostQuery(
//     { page },
//     { refetchOnMountOrArgChange: true }
//   );

//   // console.log(data);

//   const posts = useMemo(() => data?.data || [], [data]);
//   const hasMore = useMemo(
//     () => data?.meta?.current_page < data?.meta?.last_page,
//     [data]
//   );

//   const handleNavigate = useCallback(() => {
//     router.push(`/randomuser/${1}`);
//   }, []);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setPage(1);
//     refetch().finally(() => setRefreshing(false));
//   }, [refetch]);

//   const loadMore = useCallback(() => {
//     if (!isFetching && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   }, [isFetching, hasMore]);

//   const renderItem = useCallback(
//     ({ item }) => (
//       <PostViewCard
//         item={item}
//         openModal={openModal}
//         handleNavigate={handleNavigate}
//         refetch={refetch}
//       />
//     ),
//     [handleNavigate, openModal, refetch]
//   );

//   return (
//     <FlatList
//       data={posts?.data}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={["#ff0000"]}
//           tintColor="#ff0000"
//         />
//       }
//       ListFooterComponent={
//         isFetching ? <ActivityIndicator style={tw`my-4`} /> : null
//       }
//       ListEmptyComponent={
//         !isLoading && (
//           <Text style={tw`text-center py-10 text-gray-500`}>
//             No posts available
//           </Text>
//         )
//       }
//       onEndReached={loadMore}
//       onEndReachedThreshold={0.5}
//       initialNumToRender={5}
//       maxToRenderPerBatch={5}
//       windowSize={10}
//       removeClippedSubviews={true}
//       contentContainerStyle={tw`pb-20`}
//     />
//   );
// };

// export default UserPost;

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FlatList,
//   Image,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import {
//   IconHeart,
//   IconLOcation,
//   IconLove,
//   IconRestruernt,
//   IconStar,
//   IconVerify,
// } from "@/assets/Icon";
// import userApi from "../../utils/user.json";

// import { Entypo } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { SvgXml } from "react-native-svg";
// import tw from "../../lib/tailwind";
// import { useDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
// import SimplifyDate from "../../utils/SimplifyDate";
// import BookMark from "./BookMark";
// import ButtomSheet from "./ButtomSheet";
// import ShareButton from "./ShareButton";
// import TacoSlider from "./TacoSlider";

// const UserPost = ({ isActiveTab, openModal }) => {
//   const [isHeart, setIsHeart] = useState(false);
//   // const [likeCount, setLikeCount] = useState(0);

//   const [user, setUser] = useState(userApi);

//   useEffect(() => {
//     setUser(userApi);
//   }, []);

//   const [refreshing, setRefreshing] = useState(false);

//   // Refresh logic
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     refetch(); // Trigger actual API call
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1000);
//   }, [refetch]);

//   // user follow or not follow
//   const [isFollowing, setIsFollowing] = useState(false); // toggle state

//   const [visible, setVisible] = useState(false);

//   const togglePopup = () => {
//     setVisible(!visible);
//   };

//   const closePopup = () => {
//     setVisible(false);
//   };

//   const handleFollowToggle = () => {
//     setIsFollowing((prev) => !prev); // toggle follow/unfollow
//     closePopup();
//     // console.log(isFollowing ? "Unfollowed" : "Followed");
//   };
//   // profile navigate
//   const handleNavigate = () => {
//     // console.log("asdfg");
//     router.push(`/randomuser/${1}`);
//   };

//   // Memoize query parameters
//   const queryParams = useMemo(() => ({ page }), [page]);

//   // API Data with memoized selector
//   const { data, isLoading, isFetching, refetch } = useDiscoveryAllPostQuery(
//     queryParams,
//     {
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   // Memoize derived data
//   const { posts, pagination } = useMemo(() => {
//     return {
//       posts: data?.data || [],
//       pagination: data?.meta || null
//     };
//   }, [data]);

//   // console.log("view Post : ", posts);

//   const renderItem = ({ item }) => {
//     const {
//       meal_name,
//       restaurant_name,
//       location,
//       rating,
//       description,
//       user_name,
//       photo = [],
//     } = item;
//     return (
//       <View style={tw` my-3 py-2 flex-col gap-3`}>
//         <View style={tw` flex-row items-center  gap-2`}>
//           {/* navigate profile */}
//           <TouchableOpacity onPress={handleNavigate}>
//             <Image
//               style={tw`w-10 h-10 rounded-full `}
//               source={{ uri: item?.user?.avatar }}
//             />
//           </TouchableOpacity>
//           {/* user name and verify icons wrapp */}
//           <View style={tw`flex gap-0.5 flex-1  `}>
//             {/* user name and verify icons wrapp */}
//             <View style={tw`flex-row  items-center justify-between`}>
//               {/* name  */}
//               <TouchableOpacity
//                 onPress={handleNavigate}
//                 style={tw`flex-row items-center gap-2`}
//               >
//                 <Text style={tw` text-3.5 font-inter-700  text-[#121212] `}>
//                   {meal_name}
//                 </Text>
//                 <SvgXml xml={IconVerify} />
//               </TouchableOpacity>

//               {/* following /  */}
//               <TouchableOpacity>
//                 <View style={tw``}>
//                   {/* 3-dot icon */}
//                   <TouchableOpacity onPress={openModal}>
//                     <Entypo
//                       name="dots-three-vertical"
//                       size={16}
//                       color="black"
//                     />
//                   </TouchableOpacity>
//                   {/*  */}

//                   {/* <ProfileBlockBottomSheet /> */}
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <View style={tw`flex-row gap-2 items-center `}>
//               <View style={tw`flex-row gap-1 items-center `}>
//                 <SvgXml xml={IconRestruernt} />
//                 <Text style={tw` text-3 font-inter-500 text-[#454545] `}>
//                   Pizzaburg
//                 </Text>
//               </View>
//               <View style={tw`flex-row gap-1 items-center `}>
//                 <SvgXml xml={IconLOcation} />
//                 <Text style={tw` text-3 font-inter-500 text-[#454545] `}>
//                   {item?.user?.location}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* redirects  to sing view post page  */}

//         <View>
//           <TacoSlider />
//         </View>

//         <View>
//           {/* details view wrapp Like comment  */}
//           <View style={tw`flex-row gap-4 items-center  justify-between mt-3`}>
//             {/*  */}
//             <View style={tw`flex-row gap-4 justify-center items-center  `}>
//               {/* heart icon */}
//               <View style={tw`flex-row justify-center gap-1 items-center `}>
//                 <TouchableOpacity onPress={() => setIsHeart(!isHeart)}>
//                   {/* <SvgXml xml={IconLove} /> */}
//                   {isHeart ? (
//                     <SvgXml xml={IconHeart} />
//                   ) : (
//                     <SvgXml xml={IconLove} />
//                   )}
//                 </TouchableOpacity>

//                 <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
//                   1111
//                 </Text>
//               </View>
//               {/* message */}
//               <View style={tw`flex-row gap-1 justify-center items-center `}>
//                 <ButtomSheet />
//                 <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
//                   {item?.comments}
//                 </Text>
//               </View>
//               {/* share */}
//               <View>
//                 <ShareButton />
//               </View>
//             </View>

//             {/* bookMark */}
//             <View>
//               <BookMark />
//             </View>
//           </View>

//           {/*  view user info and details  */}
//           <View style={tw`flex mt-2  gap-1.5   `}>
//             <View style={tw`flex-col gap-2   `}>
//               {/* rating */}
//               <View style={tw`flex-row justify-between  items-center  `}>
//                 <Text style={tw` text-4 font-inter-700 text-textPrimary `}>
//                   {item?.title}
//                 </Text>
//                 {/* star icons */}
//                 <View style={tw`flex-row gap-1 items-center`}>
//                   <SvgXml xml={IconStar} />
//                   <Text
//                     style={tw` text-[16px]  text-textPrimary font-inter-700 `}
//                   >
//                     {item?.rating}
//                   </Text>
//                 </View>
//               </View>
//               {/* past date  */}
//               <View style={tw`flex-row justify-between  items-center  `}>
//                 {/* view mail   */}
//                 <View style={tw`flex-row gap-1 items-center  `}>
//                   {item?.category?.map((ite, index) => (
//                     <Text
//                       key={index}
//                       style={tw` text-[12px] font-inter-700 text-[#454545]  `}
//                     >
//                       {ite}
//                     </Text>
//                   ))}
//                 </View>
//                 {/* star icons */}
//                 <View style={tw`flex-row gap-1 items-center`}>
//                   <Text style={tw` text-[12px] font-inter-500 text-[#454545] `}>
//                     {/* {new Date(item?.date).toDateString()} */}
//                     {/* {item?.date}  */}
//                     <SimplifyDate date={item?.date} />
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             {/* post details  */}
//             <View>
//               {/*  */}
//               <Text
//                 style={tw`items-start text-sm font-inter-400 text-[#454545] leading-5`}
//               >
//                 {item?.description}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (isLoading) {
//     return <Text>Loading</Text>;
//   }

//   return (
//     <View style={tw`flex-1`}>
//       <FlatList
//         data={posts?.data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         scrollEnabled={true}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={tw`pt-2 pb-20`}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={["#FF6600"]}
//             tintColor="#FF6600"
//           />
//         }
//         ListEmptyComponent={
//           <Text style={tw`text-center text-gray-500 mt-10`}>
//             No posts found.
//           </Text>
//         }
//       />
//     </View>
//   );
// };

// export default UserPost;

// import { useCallback, useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import {
//   IconHeart,
//   IconLOcation,
//   IconLove,
//   IconRestruernt,
//   IconStar,
//   IconVerify,
// } from "@/assets/Icon";

// import { Entypo } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { SvgXml } from "react-native-svg";
// import tw from "../../lib/tailwind";
// import { useDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
// import SimplifyDate from "../../utils/SimplifyDate";
// import BookMark from "./BookMark";
// import ButtomSheet from "./ButtomSheet";
// import ShareButton from "./ShareButton";
// import TacoSlider from "./TacoSlider";

// const UserPost = ({ isActiveTab, openModal }) => {
//   const [isHeart, setIsHeart] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);

//   // API call with dynamic pagination
//   const { data, isLoading, isFetching, refetch } = useDiscoveryAllPostQuery(
//     { page },
//     { refetchOnMountOrArgChange: true }
//   );

//   // Memoized data
//   const posts = useMemo(() => data?.data || [], [data]);
//   const hasMore = useMemo(
//     () => data?.meta?.current_page < data?.meta?.last_page,
//     [data]
//   );

//   const handleNavigate = useCallback(() => {
//     router.push(`/randomuser/${1}`);
//   }, []);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setPage(1);
//     refetch().finally(() => setRefreshing(false));
//   }, [refetch]);

//   const loadMore = useCallback(() => {
//     if (!isFetching && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   }, [isFetching, hasMore]);

//   const renderItem = useCallback(({ item }) => {
//     const safeDate = item?.created_at?.split(".")[0];

//     return (
//       <View style={tw`my-3 py-2 flex-col gap-3`}>
//         {/* Header */}
//         <View style={tw`flex-row items-center gap-2`}>
//           <TouchableOpacity onPress={handleNavigate}>
//             <Image
//               style={tw`w-10 h-10 rounded-full`}
//               source={{
//                 uri: "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png",
//               }}
//             />
//           </TouchableOpacity>

//           <View style={tw`flex gap-0.5 flex-1`}>
//             <View style={tw`flex-row items-center justify-between`}>
//               <View style={tw`flex-row gap-3`}>
//                 <TouchableOpacity
//                   onPress={handleNavigate}
//                   style={tw`flex-row items-center gap-2`}
//                 >
//                   <Text style={tw`text-3.5 font-inter-700 text-[#121212]`}>
//                     John Doe {item?.id}
//                   </Text>
//                   <SvgXml xml={IconVerify} />
//                 </TouchableOpacity>

//                 <View style={tw`flex-row gap-1 items-center`}>
//                   {item?.tagged?.map((tag, index) => (
//                     <Text
//                       key={index}
//                       style={tw`text-[12px] font-inter-700 text-[#454545]`}
//                     >
//                       #{tag}
//                     </Text>
//                   ))}
//                 </View>
//               </View>

//               <TouchableOpacity onPress={openModal}>
//                 <Entypo name="dots-three-vertical" size={16} color="black" />
//               </TouchableOpacity>
//             </View>

//             {/* Location */}
//             <View style={tw`flex-row gap-2 items-center`}>
//               <View style={tw`flex-row gap-1 items-center`}>
//                 <SvgXml xml={IconRestruernt} />
//                 <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                   {item?.restaurant_name || "Unknown"}
//                 </Text>
//               </View>
//               <View style={tw`flex-row gap-1 items-center`}>
//                 <SvgXml xml={IconLOcation} />
//                 <Text style={tw`text-3 font-inter-500 text-[#454545]`}>
//                   {item?.location || "Unknown"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Image slider */}
//         <TacoSlider />

//         {/* Reactions */}
//         <View style={tw`flex-row gap-4 items-center justify-between mt-3`}>
//           <View style={tw`flex-row gap-4 justify-center items-center`}>
//             <View style={tw`flex-row justify-center gap-1 items-center`}>
//               <TouchableOpacity onPress={() => setIsHeart(!isHeart)}>
//                 <SvgXml xml={isHeart ? IconHeart : IconLove} />
//               </TouchableOpacity>
//               <Text style={tw`text-3 font-inter-600 text-[#454545]`}>1111</Text>
//             </View>
//             <View style={tw`flex-row gap-1 justify-center items-center`}>
//               <ButtomSheet />
//               <Text style={tw`text-3 font-inter-600 text-[#454545]`}>
//                 {item?.comments || 0}
//               </Text>
//             </View>
//             <ShareButton />
//           </View>
//           <BookMark />
//         </View>

//         {/* Meal Info */}
//         <View style={tw`flex mt-2 gap-1.5`}>
//           <View style={tw`flex-col gap-2`}>
//             <View style={tw`flex-row justify-between items-center`}>
//               <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
//                 {item?.meal_name || item?.title || "Untitled"}
//               </Text>
//               <View style={tw`flex-row gap-1 items-center`}>
//                 <SvgXml xml={IconStar} />
//                 <Text style={tw`text-[16px] text-textPrimary font-inter-700`}>
//                   {item?.rating || 0}
//                 </Text>
//               </View>
//             </View>
//             <View style={tw`flex-row justify-between items-center`}>
//               <Text style={tw`text-sm font-inter-700 text-[#454545] leading-5`}>
//                 {item?.have_it}
//               </Text>
//               <Text style={tw`text-[12px] font-inter-500 text-[#454545]`}>
//                 <SimplifyDate date={safeDate} />
//               </Text>
//             </View>
//           </View>
//           <Text style={tw`text-sm font-inter-400 text-[#454545] leading-5`}>
//             {item?.description}
//           </Text>
//         </View>
//       </View>
//     );
//   }, []);

//   return (
//     <FlatList
//       data={posts?.data}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id?.toString()}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={["#ff0000"]}
//           tintColor="#ff0000"
//         />
//       }
//       ListFooterComponent={
//         isFetching ? <ActivityIndicator style={tw`my-4`} /> : null
//       }
//       ListEmptyComponent={
//         !isLoading && (
//           <Text style={tw`text-center py-10 text-gray-500`}>
//             No posts available
//           </Text>
//         )
//       }
//       onEndReached={loadMore}
//       onEndReachedThreshold={0.5}
//       initialNumToRender={5}
//       maxToRenderPerBatch={5}
//       windowSize={10}
//       removeClippedSubviews={true}
//       contentContainerStyle={tw`pb-20`}
//     />
//   );
// };

// export default UserPost;
