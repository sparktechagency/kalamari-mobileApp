import tw from "@/src/lib/tailwind";
import { Image, Text, View } from "react-native";

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const ReplyItem = ({ reply }) => {
  return (
    <View style={tw`flex-row gap-3 py-2 pl-3`}>
      <View style={tw`absolute -left-8 h-0.6 w-16 bg-primary top-6`} />
      <Image
        source={{ uri: DEFAULT_AVATAR }}
        style={tw`w-8 h-8 rounded-full mt-1 z-10`}
      />
      <View style={tw`flex-1 bg-gray-50 rounded-lg p-3`}>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={tw`font-inter-600 text-sm`}>{reply?.user_name}</Text>
          <Text style={tw`text-xs text-textgray`}>
            {formatTime(reply?.created_at)}
          </Text>
        </View>
        <Text style={tw`text-sm font-inter-400 text-gray-800 mt-1`}>
          {reply?.replay}
        </Text>
      </View>
    </View>
  );
};

export default ReplyItem;
