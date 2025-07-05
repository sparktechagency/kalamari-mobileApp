import { Text, View } from 'react-native'
import tw from '../../lib/tailwind'

const AuthHeading = ({Heading , SubHeading}) => {
  return (
    <View>
      <View style={tw` w-full flex-col gap-3 mb-16`}>
            <Text style={tw`text-7 text-[#121212] font-inter-700 dark:text-white text-center `}>
              {Heading}
            </Text>

            <Text
              style={tw`mt-2 text-3 text-[#888888] dark:text-gray-300 text-center`}
            >
              {SubHeading}
            </Text>
          </View>
    </View>
  )
}

export default AuthHeading