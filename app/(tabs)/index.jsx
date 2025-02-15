import { View, Text, TouchableOpacity, Vibration } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import "../../global.css";
import ReactNativeModal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const AlarmPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [alarm, setAlarm] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [sound, setSound] = useState(null);

  const toggleAlarm = (id) => {
    setAlarm((prevAlarm) =>
      prevAlarm.map((alarm) =>
        alarm.id === id ? { ...alarm, isOn: !alarm.isOn } : alarm
      )
    );
  };

  const deleteAlarm = (id) => {
    setAlarm((prevAlarm) => prevAlarm.filter((alarm) => alarm.id !== id));
  };

  const handleConfirm = (event, selectedDate) => {
    if (selectedDate) {
      const newAlarm = {
        id: Date.now(),
        time: selectedDate,
        ringtone: "default",
        vibrate: true,
        isOn: true,
      };
      setAlarm((prevAlarm) => [...prevAlarm, newAlarm]);
    }
    setShowPicker(false);
    setModalVisible(false);
  };

  const checkAlarm = async () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    alarm.forEach(async (alarmItem) => {
      const alarmTime = new Date(alarmItem.time);
      const alarmMinutes = alarmTime.getHours() * 60 + alarmTime.getMinutes();

      if (currentTime === alarmMinutes && alarmItem.isOn) {
        await playAlarmSound();
        Vibration.vibrate([500, 1000, 500]);
      }
    });
  };

  const playAlarmSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound.wav")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const interval = setInterval(checkAlarm, 60000);
    return () => clearInterval(interval);
  }, [alarm]);

  return (
    <View className="flex-1 bg-[#1b263b]  p-2 relative">
      {alarm.map((alarmItem) => (
        <View
          key={alarmItem.id}
          className="mt-[1rem] h-[3rem] flex-row px-[1rem] py-[5px]  w-full justify-between bg-white rounded-md"
        >
          <Text className="text-[1.6rem] font-[700] text-center font-serif">
            {new Date(alarmItem.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Text>
          <View className="flex-row gap-[2rem]">
            <TouchableOpacity onPress={() => toggleAlarm(alarmItem.id)}>
              {alarmItem.isOn ? (
                <FontAwesome6 name="toggle-on" size={30} color="black" />
              ) : (
                <FontAwesome6 name="toggle-off" size={30} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteAlarm(alarmItem.id)}>
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View className="absolute bottom-[2rem] right-[10rem] h-[5rem] w-[5rem] rounded-full bg-white items-center justify-center">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircleo" size={45} color="black" />
        </TouchableOpacity>
        <ReactNativeModal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <View className="bg-slate-200 h-[12rem] relative w-full rounded-[12px] p-[1rem]">
            <Text className="text-[1.2rem] font-[600]">Select time</Text>
            {showPicker && (
              <DateTimePicker
                value={alarmTime}
                mode="time"
                display="spinner"
                onChange={handleConfirm}
              />
            )}
            <TouchableOpacity
              className="mt-[1rem] bg-[#000000] rounded-md px-4 py-3 w-fit"
              onPress={() => setShowPicker(true)}
            >
              <Text className="text-white text-[1.1rem] font-[700] text-center">
                Set Alarm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=" absolute right-[1rem] bottom-[1rem] bg-[#000000] rounded-md px-4 py-3 w-fit"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-[1.1rem] font-[700] text-center">
                Clear
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </View>
    </View>
  );
};

export default AlarmPage;
