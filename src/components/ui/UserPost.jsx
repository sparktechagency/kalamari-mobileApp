import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { useLazyFollowingAllPostQuery } from "../../redux/homeApi/homeApi";
import PostViewCard from "./PostViewCard";

const UserPost = ({ openModal }) => {
  // Tracks whether the FlatList is currently being refreshed via pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  // Tracks the current page number for pagination
  const [page, setPage] = useState(1);

  // Indicates whether a "load more" request is currently in progress (when scrolling to bottom)
  const [loadingMore, setLoadingMore] = useState(false);

  // Stores the list of posts fetched from the API
  const [posts, setPosts] = useState([]);

  // Initializes the RTK Query lazy fetch hook
  const [fetchPosts, { isLoading, isFetching, refetch }] =
    useLazyFollowingAllPostQuery();

  // Loads more posts (pagination) when user scrolls to bottom
  const loadPosts = useCallback(async () => {
    // Prevent duplicate requests if already loading
    if (loadingMore || isLoading || isFetching) return;

    setLoadingMore(true); // Set loading state

    try {
      const response = await fetchPosts({ page }).unwrap(); // Fetch posts for the current page
      if (response?.status && response?.data?.data?.length) {
        // Append new posts to existing list
        setPosts((prevPosts) => [...prevPosts, ...response?.data?.data]);

        // Move to the next page
        setPage(response?.data?.current_page + 1);
      }
    } catch (error) {
      console.error("Failed to load posts:", error); // Handle errors gracefully
    } finally {
      setLoadingMore(false); // Reset loading state
    }
  }, [page, loadingMore, isLoading, isFetching, fetchPosts]);

  // Refreshes the post list (pull-to-refresh)
  const onRefresh = async () => {
    setRefreshing(true); // Show refresh spinner
    try {
      const response = await fetchPosts({ page: 1 }).unwrap(); // Fetch first page again
      if (response?.status) {
        setPosts(response.data.data); // Replace existing posts with fresh data
        setPage(2); // Reset page to 2 for future pagination
      }
    } catch (error) {
      console.error("Refresh failed:", error); // Handle error
    } finally {
      setRefreshing(false); // Hide refresh spinner
    }
  };

  // Load posts when the component first mounts
  useEffect(() => {
    loadPosts();
  }, []);

  // console.log("following post : ", posts);

  return posts?.length < 0 ? (
    "not post"
  ) : (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts?.filter((item) => item?.status === "Following")}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <PostViewCard item={item} openModal={openModal} refetch={refetch} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ED6237"]}
            tintColor="#ED6237"
          />
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color="#ED6237" style={tw`my-4`} />
          ) : null
        }
        onEndReached={loadPosts}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserPost;

// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   View,
// } from "react-native";
// import tw from "../../lib/tailwind";
// import { useLazyDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
// import PostViewCard from "./PostViewCard";

// const UserPost = ({ isActiveTab, openModal }) => {
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [dataLoad, setDataLoad] = useState(false);
//   const [postsData, setDataPosts] = useState([]);

//   const [getLazyDiscover, disvoverResuls] = useLazyDiscoveryAllPostQuery();

//   console.log(postsData);

//   const hanldeDataLoad = async () => {
//     if (
//       !dataLoad &&
//       !disvoverResuls?.isLoading &&
//       !disvoverResuls?.isFetching
//     ) {
//       // console.log("Actual work");
//       setDataLoad(true);

//       getLazyDiscover({ page: page })
//         .then((res) => {
//           // console.log(res);
//           if (res?.data?.status) {
//             setDataPosts(postsData?.concat(res?.data?.data?.data));
//             setPage(res?.data?.data?.current_page + 1);
//           }
//         })
//         .finally(() => {
//           console.log("Eding");
//           setDataLoad(false);
//         });
//     }
//   };

//   useEffect(() => {
//     hanldeDataLoad();
//   }, []);

//   // if (disvoverResuls?.isLoading && page === 1) {
//   //   return (
//   //     <View style={tw`flex-1 justify-center items-center`}>
//   //       <ActivityIndicator size="large" />
//   //     </View>
//   //   );
//   // }

//   // console.log("page of current" + page);
//   // console.log(page);

//   return (
//     <View style={tw`flex-1`}>
//       <FlatList
//         refreshControl={
//           <RefreshControl
//             refreshing={disvoverResuls?.refetch}
//             onRefresh={disvoverResuls?.isFetching}
//             colors={["#ED6237"]}
//             tintColor="#ED6237"
//           />
//         }
//         // ListEmptyComponent={() => {
//         //   return (
//         //     <>
//         //       <Text style={tw`text-center py-10 text-gray-500`}>
//         //         No posts available
//         //       </Text>
//         //     </>
//         //   );
//         // }}
//         ListFooterComponent={
//           disvoverResuls?.isLoading ? (
//             <ActivityIndicator color={"#ED6237"} style={tw`my-4`} />
//           ) : null
//         }
//         onEndReached={hanldeDataLoad}
//         onEndReachedThreshold={0.5}
//         data={postsData}
//         keyExtractor={(item) => item?.id}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <PostViewCard item={item} openModal={openModal} />
//         )}
//       />
//     </View>
//   );
// };

// export default UserPost;
