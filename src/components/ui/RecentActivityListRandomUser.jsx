// import { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, View } from "react-native";
// import tw from "../../lib/tailwind";
// import {
//   useDeletedRecentPostMutation,
//   useLazyGetUserAllFollowingQuery,
// } from "../../redux/profileApi/profileApi";

// const RecentActivityListRandomUser = () => {
//   // console.log("RecentActivityListRandomUser ", data?.data?.data[0]?.id);

//   // Tracks whether the FlatList is currently being refreshed via pull-to-refresh
//   const [refreshing, setRefreshing] = useState(false);

//   // Tracks the current page number for pagination
//   const [page, setPage] = useState(1);

//   // Indicates whether a "load more" request is currently in progress (when scrolling to bottom)
//   const [loadingMore, setLoadingMore] = useState(false);

//   // Stores the list of posts fetched from the API
//   const [posts, setPosts] = useState([]);

//   // Initializes the RTK Query lazy fetch hook
//   const [fetchPosts, { isLoading, isFetching, refetch }] =
//     useLazyGetUserAllFollowingQuery();

//   const [deleteRecent, { isLoading: deleteLoading }] =
//     useDeletedRecentPostMutation();

//   const handleDelete = (id) => {
//     Alert.alert(
//       "Delete Resents",
//       "Are you sure you want to delete this Recents?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             // console.log(id);
//             try {
//               await deleteRecent({ post_id: id }).unwrap();
//               // console.log(res);
//             } catch (error) {
//               console.log(error);
//             }
//           },
//         },
//       ]
//     );
//   };

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   console.log(fetchPosts);

//   return isLoading ? (
//     <View style={tw`flex-1 justify-center items-center`}>
//       <ActivityIndicator size="large" color="#F97316" />
//     </View>
//   ) : (
//     <View style={tw`flex-1`}>
//       {/* when the api changes ScrollView and adds flatList  */}
//       <FlatList
//         data={data?.data?.data}
//         keyExtractor={(item) => item?.id?.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={tw`pb-6`}
//         renderItem={({ item }) => (
//           <ProfileRanderItem handleDelete={handleDelete} item={item} />
//         )}
//       />
//     </View>
//   );
// };

// export default RecentActivityListRandomUser;

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import tw from "../../lib/tailwind";

import { useLazyGetRandomuserUserPostQuery } from "../../redux/randomuserApi/randomuserApi";
import RandomProfileRanderItem from "./RandomProfileRanderItem";

const RecentActivityListRandomUser = ({ user_id }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true); // to control if more data is available

  const [fetchPosts, { isLoading }] = useLazyGetRandomuserUserPostQuery();
  // const [deleteRecent, { isLoading: deleteLoading }] =
  //   useDeletedRecentPostMutation();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({
        user_id: user_id,
        page: pageNum,
      }).unwrap();

      const newPosts = res?.data?.data || [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(res?.data?.current_page < res?.data?.last_page);
      setPage(res?.data?.current_page + 1);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // console.log("posts : ", posts);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // console.log("posts", posts);

  return isLoading && posts?.length === 0 ? (
    <View style={tw`flex-1 justify-center items-center `}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <RandomProfileRanderItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#F97316"]}
            tintColor="#F97316"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#F97316" style={tw`my-4`} />
          ) : null
        }
        ListEmptyComponent={
          !isLoading && posts.length === 0 ? (
            <Text style={tw`text-center mt-10 text-gray-500`}>
              No recent activity found.
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default RecentActivityListRandomUser;
