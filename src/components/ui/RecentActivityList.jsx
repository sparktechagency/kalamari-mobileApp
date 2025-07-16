import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import tw from "../../lib/tailwind";
import {
  useDeletedRecentPostMutation,
  useLazyGetMyAllPostQuery,
} from "../../redux/profileApi/profileApi";
import ProfileRanderItem from "./ProfileRanderItem"; // assuming you have this component

const RecentActivityList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true); // to control if more data is available

  const [fetchPosts, { isLoading }] = useLazyGetMyAllPostQuery();
  const [deleteRecent, { isLoading: deleteLoading }] =
    useDeletedRecentPostMutation();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum }).unwrap();

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

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Recents",
      "Are you sure you want to delete this Recent?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRecent({ post_id: id }).unwrap();
              setPosts((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return isLoading && posts?.length === 0 ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.id?.toString()}
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
        renderItem={({ item }) => (
          <ProfileRanderItem
            key={item?.id}
            handleDelete={handleDelete}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default RecentActivityList;
