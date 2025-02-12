import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import "../global.css";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-[#1b263b] p-[1rem]">
      <TouchableOpacity
       activeOpacity={0.7}
        className="bg-[#ccff33] rounded-md w-full px-4 py-3"
         onPress={() => router.push("/(tabs)")}
      >
        <Text className="text-[1.4rem] text-center font-[600]">
          Click To Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
