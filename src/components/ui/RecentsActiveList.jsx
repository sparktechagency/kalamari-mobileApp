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
import RandomUserRecentView from "./RandomUserRecentView";

const RecentsActiveList = ({ user_id }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [fetchPosts, { isFetching }] = useLazyGetRandomuserUserPostQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ user_id, page: pageNum }).unwrap();
      const newPosts = res?.data?.data || [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(res?.data?.current_page < res?.data?.last_page);
      setPage(res?.data?.current_page + 1);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
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

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <RandomUserRecentView key={item?.id} item={item} />
        )}
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#ED6237"]}
            tintColor="#ED6237"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#ED6237" style={tw`my-4`} />
          ) : null
        }
        ListEmptyComponent={
          !isFetching && posts.length === 0 ? (
            <Text style={tw`text-center text-gray-500 mt-10`}>
              No recent posts found.
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default RecentsActiveList;
