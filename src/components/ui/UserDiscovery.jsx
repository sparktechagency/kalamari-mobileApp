import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import { useLazyDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi";
import PostViewCard from "./PostViewCard";

const UserDiscovery = ({ openModal }) => {
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
    useLazyDiscoveryAllPostQuery();

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

  console.log("posts ,", posts);

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts}
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

export default UserDiscovery;
UserDiscovery.jsx;

// import { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   Text,
//   View,
// } from "react-native";
// import tw from "../../lib/tailwind"; // Path to your Tailwind CSS setup
// import { useLazyDiscoveryAllPostQuery } from "../../redux/homeApi/homeApi"; // Path to your RTK Query API slice
// import PostViewCard from "./PostViewCard"; // Path to your PostViewCard component

// const UserDiscovery = ({ openModal }) => {
//   // Tracks whether the FlatList is currently being refreshed via pull-to-refresh
//   const [refreshing, setRefreshing] = useState(false);

//   // Tracks the current page number for pagination
//   const [page, setPage] = useState(1);

//   // Indicates whether a "load more" request is currently in progress (when scrolling to bottom)
//   const [loadingMore, setLoadingMore] = useState(false);

//   // Stores the list of posts fetched from the API
//   const [posts, setPosts] = useState([]);

//   // Tracks if there are more pages to load
//   const [hasMore, setHasMore] = useState(true); // Assume true initially

//   // Initializes the RTK Query lazy fetch hook
//   const [fetchPosts, { isLoading, isFetching }] =
//     useLazyDiscoveryAllPostQuery();

//   // Loads more posts (pagination) when user scrolls to bottom
//   const loadPosts = useCallback(async () => {
//     // Prevent duplicate requests if already loading or no more data
//     if (!hasMore || loadingMore || isLoading || isFetching) {
//       console.log("loadPosts prevented:", {
//         hasMore,
//         loadingMore,
//         isLoading,
//         isFetching,
//       });
//       return;
//     }

//     setLoadingMore(true); // Set loading state

//     try {
//       console.log(`Fetching page: ${page}`);
//       const response = await fetchPosts({ page }).unwrap(); // Fetch posts for the current page

//       if (response?.status && response?.data?.data?.length > 0) {
//         // Append new posts to existing list
//         setPosts((prevPosts) => [...prevPosts, ...response?.data?.data]);

//         // Move to the next page
//         setPage(response?.data?.current_page + 1);

//         // Check if there are more pages based on total_pages or other logic
//         // This assumes your API provides total_pages or last_page in response.data
//         if (response.data.current_page >= response.data.last_page) {
//           // Assuming `last_page` from API
//           setHasMore(false);
//           console.log("No more pages detected.");
//         }
//       } else {
//         // No more data returned, set hasMore to false
//         console.log("API returned no new data or empty array.");
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to load posts:", error); // Handle errors gracefully
//     } finally {
//       setLoadingMore(false); // Reset loading state
//     }
//   }, [page, hasMore, loadingMore, isLoading, isFetching, fetchPosts]); // Added hasMore dependency

//   // Refreshes the post list (pull-to-refresh)
//   const onRefresh = async () => {
//     setRefreshing(true); // Show refresh spinner
//     console.log("Starting refresh...");
//     try {
//       const response = await fetchPosts({ page: 1 }).unwrap(); // Fetch first page again
//       if (response?.status) {
//         setPosts(response.data.data); // Replace existing posts with fresh data
//         setPage(2); // Reset page to 2 for future pagination
//         setHasMore(true); // Assume there's more data after a refresh
//         console.log(
//           "Refresh successful. Posts count:",
//           response.data.data.length
//         );
//       } else {
//         console.log("Refresh status not OK.");
//       }
//     } catch (error) {
//       console.error("Refresh failed:", error); // Handle error
//     } finally {
//       setRefreshing(false); // Hide refresh spinner
//     }
//   };

//   // Load posts when the component first mounts
//   useEffect(() => {
//     console.log("UserDiscovery mounted. Initial loadPosts.");
//     loadPosts();
//   }, []); // Empty dependency array means this runs once on mount

//   console.log(
//     "Current posts count:",
//     posts.length,
//     "Page:",
//     page,
//     "Has More:",
//     hasMore
//   );

//   return (
//     <View style={tw`flex-1`}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item?.id?.toString()}
//         renderItem={({ item }) => (
//           <PostViewCard
//             item={item}
//             openModal={openModal}
//             key={item?.id}
//             // Passing fetchPosts to allow PostViewCard to trigger a re-fetch of all posts if needed
//             // Consider more granular invalidation if possible within RTK Query
//             refetch={() => onRefresh()} // Or pass fetchPosts directly for specific invalidation
//           />
//         )}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={["#ED6237"]}
//             tintColor="#ED6237"
//           />
//         }
//         ListFooterComponent={
//           loadingMore ? (
//             <ActivityIndicator color="#ED6237" style={tw`my-4`} />
//           ) : !hasMore && posts.length > 0 ? (
//             <Text style={tw`text-center text-gray-500 my-4`}>
//               No more posts to show.
//             </Text>
//           ) : null // Don't show footer if there are no posts yet
//         }
//         ListEmptyComponent={
//           // Show this only if no posts, not loading, and not refreshing
//           !isLoading && !isFetching && !refreshing && posts.length === 0 ? (
//             <View style={tw`flex-1 items-center justify-center p-5`}>
//               <Text style={tw`text-gray-500 text-lg`}>No posts available.</Text>
//               <Text style={tw`text-gray-400 text-sm mt-2`}>
//                 Pull down to refresh or check your connection.
//               </Text>
//             </View>
//           ) : null
//         }
//         onEndReached={loadPosts}
//         onEndReachedThreshold={0.5}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default UserDiscovery;
