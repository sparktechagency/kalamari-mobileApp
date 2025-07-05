import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const CustomRadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row items-center gap-2`}>
      <View
        style={[
          tw`w-5 h-5 rounded-full border ${
            selected ? "border-orange" : "border-[#B0B0B0]"
          }  items-center justify-center`,
        ]}
      >
        {selected && <View style={tw`w-3 h-3 rounded-full bg-orange`} />}
      </View>
      <Text style={tw`text-[#454545] font-normal`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
