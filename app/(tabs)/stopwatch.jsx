import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import "../../global.css";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const StopwatchPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 6000) / 100)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 100).toString().padStart(2, "0");

    return { minutes, seconds, milliseconds };
  };

  const toggleStopwatch = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    setIsRunning(!isRunning);
  };
  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setIsRunning(false);
  };
  const { minutes, seconds, milliseconds } = formatTime(time);
  return (
    <View className="flex-1 bg-[#1b263b]  items-center justify-start pt-[5rem] ">
      <View
        className="h-[20rem] w-[20rem] relative bg-white items-center justify-center 
        rounded-full border-[3px] border-[#ccff33]"
      >
        <View className="absolute top-[3.2rem] ">
          <Text className="text-[5rem] text-center font-serif  text-gray-900">
            {minutes}
          </Text>
        </View>
        <View className="absolute bottom-[3.2rem] ">
          <Text className="text-[5rem] text-center font-serif  text-gray-900">
            {seconds} : {milliseconds}
          </Text>
        </View>
      </View>
      <TouchableOpacity className="mt-[4rem]" onPress={toggleStopwatch}>
        {isRunning ? (
          <AntDesign name="pausecircle" size={60} color="white" />
        ) : (
          <AntDesign name="play" size={60} color="white" />
        )}
      </TouchableOpacity>
      <TouchableOpacity className="mt-[4rem]" onPress={resetStopwatch}>
        <MaterialCommunityIcons name="restart" size={60} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default StopwatchPage;
