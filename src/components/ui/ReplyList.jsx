import tw from "@/src/lib/tailwind";
import { View } from "react-native";
import ReplyItem from "./ReplyItem";

const ReplyList = ({ replies }) => {
  return (
    <View style={tw`ml-12`}>
      <View
        style={tw`absolute -left-8 top-0 bottom-0 w-0.6 bg-primary rounded-b-lg`}
      />
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </View>
  );
};

export default ReplyList;
