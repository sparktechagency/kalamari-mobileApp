import {
  IconClose,
  IconConditions,
  IconDHome,
  IconDPost,
  IconMission,
  IconPass,
  IconPrivacy,
  IconProfile,
  IconSideBookMark,
} from "@/assets/Icon";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import Logout from "./Logout";

export default function CustomDrawerContent(props) {
  return (
    <View style={tw`flex-col justify-between  mt-20 px-4 pb-10  flex-1`}>
      <View style={tw`flex-col gap-6`}>
        <View style={tw`flex-row items-center justify-between `}>
          <Text style={tw`text-9 font-rubik-700 text-[#141A47]`}>Kalamari</Text>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
        </View>

        {/* Navigation Section */}
        <View style={tw`flex-col gap-4`}>
          <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
            Navigation
          </Text>
          <View style={tw`flex-col gap-2`}>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tab)");
                props.navigation.closeDrawer();
              }}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconDHome} />
                <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                  Home
                </Text>
              </View>
            </TouchableOpacity>

            <Link href={"/(drawer)/Post"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconDPost} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Post
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href={"/(drawer)/Bookmarks"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconSideBookMark} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Lists
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href={"/(drawer)/Profile"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconProfile} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Account Section */}
        <View style={tw`flex-col gap-4`}>
          <Text style={tw`text-4 font-inter-700 text-textPrimary`}>
            Account
          </Text>
          <View style={tw`flex-col gap-2`}>
            <Link href={"/(drawer)/ChangePassword"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconPass} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Change Password
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href={"/(drawer)/TermsAndConditions"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconConditions} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Terms & Conditions
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href={"/(drawer)/PrivacyPolicy"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconPrivacy} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Privacy Policy
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>

            <Link href={"/(drawer)/Mission"} asChild>
              <TouchableOpacity>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconMission} />
                  <Text style={tw`text-4 font-inter-400 text-[#454545]`}>
                    Our Mission
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      {/* Logout */}
      <View>
        <Logout />
      </View>
    </View>
  );
}
