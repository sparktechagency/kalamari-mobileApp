import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const ReportInput = ({ reportVisible, setReportVisible }) => {
  const [report, setReport] = useState("");
  // console.log(report);

  const handleReport = () => {
    Alert.alert(
      "Report Submitted",
      "Your report has been successfully created.",
      [
        {
          text: "OK",
          onPress: () => {
            setReportVisible(!reportVisible); // Alert OK  modal off
            setReport("");
          },
        },
      ]
    );
  };

  return (
    <View style={tw` flex-col gap-4`}>
      <View
        style={tw`flex-row  items-center bg-[#F3F3F3] px-4 py-1 rounded-1.5`}
      >
        <TextInput
          style={tw`flex-1 text-base text-black dark:text-white`}
          onChangeText={(text) => setReport(text)}
          // onBlur={handleBlur("fullname")}
          value={report}
          placeholderTextColor="#888"
          selectionColor={"#888"}
        />
      </View>

      <View style={tw`w-30`}>
        <TouchableOpacity
          onPress={handleReport}
          style={tw`py-2 rounded bg-orange`}
        >
          <Text style={tw`text-center text-white text-xl`}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportInput;
