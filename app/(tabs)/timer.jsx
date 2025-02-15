import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const timer = () => {
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    let timer = null;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      playSound();
    }
  }, [time]);
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sound.wav")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error("Error playing sound", err);
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(60);
    setIsRunning(false);
  };
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View className="flex-1 items-center justify-center bg-[#1b263b] p-[1rem]">
      <View
        className="h-[15rem] w-[15rem] bg-[#0b1b38] rounded-[50%]
        flex items-center justify-center "
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        <Text className="text-[4rem] font-serif text-white text-center font-[700]">
          {time} sec
        </Text>
      </View>
      <View
        className="flex-row items-center mt-[2rem] gap-[5rem]
       justify-center space-x-4"
      >
        <TouchableOpacity onPress={pauseTimer}>
          <AntDesign name="pausecircle" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={startTimer}>
          <AntDesign name="caretright" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer}>
          <MaterialIcons name="restart-alt" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default timer;
