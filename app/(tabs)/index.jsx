import { View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import "../../global.css";

const AlarmPage = () => {
  return (
    <View className="flex-1 bg-[#1b263b]  p-2 relative">
      <View
        className="absolute bottom-[2rem] right-[10rem] h-[5rem] w-[5rem]
       rounded-full bg-white items-center justify-center"
      >
        <TouchableOpacity>
          <AntDesign
            name="pluscircleo"
            size={45}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlarmPage;
