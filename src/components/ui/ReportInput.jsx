import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import { useUserReportMutation } from "../../redux/userReportApi/userReportApi";

const ReportInput = ({
  reportVisible,
  setReportVisible,
  reportUserData,
  id,
  setProfileReport,
  profileReport,
}) => {
  const [report, setReport] = useState("");
  const [userReport, { isLoading }] = useUserReportMutation();

  const handleReport = async () => {
    if (!report.trim()) return; // Prevent empty spaces

    try {
      const res = await userReport({
        reported_id: reportUserData?.user_id || id,
        content: report,
      }).unwrap();

      console.log(res);

      Alert.alert(
        "Report Submitted",
        "Your report has been successfully submitted.",
        [
          {
            text: "OK",
            onPress: () => {
              id ? setProfileReport(!profileReport) : setReportVisible(false);
              setReport("");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to submit report. Please try again.");
    }
  };

  return (
    <View style={tw`flex-col gap-4`}>
      <View
        style={tw`flex-row items-center bg-[#F3F3F3] px-4 py-1 rounded-1.5`}
      >
        <TextInput
          placeholder="Write your report..."
          style={tw`flex-1 text-base text-black dark:text-white`}
          onChangeText={setReport}
          value={report}
          placeholderTextColor="#888"
          selectionColor="#888"
          multiline
        />
      </View>

      <View style={tw`w-30`}>
        <TouchableOpacity
          onPress={handleReport}
          disabled={!report.trim() || isLoading}
          style={tw.style(
            "py-2 rounded",
            !report.trim() || isLoading ? "bg-orange/50" : "bg-orange"
          )}
        >
          <Text style={tw`text-center text-white text-xl`}>
            {isLoading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportInput;
