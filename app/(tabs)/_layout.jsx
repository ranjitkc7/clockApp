import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";

const LayoutPage = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ccff33",
          borderBottomColor: "#000000",
          borderBottomWidth: 1,
        },
        tabBarStyle: {
          backgroundColor: "#293241",
        },
        tabBarActiveTintColor: "#ccff33",
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Alarm",
          tabBarIcon: ({ color }) => (
            <Ionicons name="alarm" size={30} color={color} />
          ),
          headerRight: () => (
            <Entypo name="dots-three-vertical" size={30} color="black" 
             style={{ marginRight: 10 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clock"
        options={{
          title: "Clock",
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircle" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="timer"
        options={{
          title: "Timer",
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          title: "Stopwatch",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stopwatch" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default LayoutPage;
