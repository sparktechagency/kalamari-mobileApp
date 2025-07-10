import tw from "@/src/lib/tailwind";
import { View } from "react-native";
import ReplyItem from "./ReplyItem";

const ReplyList = ({ replies }) => {
  // console.log("replies ,", replies);

  return (
    <View style={tw`ml-5`}>
      {replies.map((reply) => (
        <ReplyItem key={reply?.id} reply={reply} />
      ))}
    </View>
  );
};

export default ReplyList;
