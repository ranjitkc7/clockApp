import { View,Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const clockSize = width * 0.8;
const clockRadius = clockSize / 2;
const center = clockRadius;

const ClockPage = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newTime = time.toLocaleTimeString(); 
  const getHandCoordinates = (length, angle) => {
    const radian = (Math.PI / 180) * (angle - 90);
    const x = center + length * Math.cos(radian);
    const y = center + length * Math.sin(radian);
    return { x, y };
  };

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = (360 / 12) * hour + (360 / 12) * (minute / 60);
  const minuteAngle = (360 / 60) * minute + (360 / 60) * (second / 60);
  const secondAngle = (360 / 60) * second;

  const hourHand = getHandCoordinates(center * 0.5, hourAngle);
  const minuteHand = getHandCoordinates(center * 0.7, minuteAngle);
  const secondHand = getHandCoordinates(center * 0.9, secondAngle);

  return (
    <View className="h-full flex-1 bg-[#1b263b] p-2 ">
      <View className="h-[50%] items-center mt-[1rem]">
        <Svg width={clockSize} height={clockSize}>
          <Circle
            cx={center}
            cy={center}
            r={clockRadius}
            fill="white"
            stroke="#ccff33"
            strokeWidth={4}
          />
          {[...Array(12)].map((_, i) => {
            const angle = (360 / 12) * (i + 1);
            const numberPos = getHandCoordinates(center * 0.85, angle);
            return (
              <SvgText
                key={i}
                x={numberPos.x}
                y={numberPos.y + 5}
                fontSize="21"
                fill="black"
                textAnchor="middle"
                font="bold"
                alignmentBaseline="middle"
              >
                {i + 1}
              </SvgText>
            );
          })}
          <Line
            x1={center}
            y1={center}
            x2={hourHand.x}
            y2={hourHand.y}
            stroke="black"
            strokeWidth={5}
          />
          <Line
            x1={center}
            y1={center}
            x2={minuteHand.x}
            y2={minuteHand.y}
            stroke="black"
            strokeWidth={4}
          />
          <Line
            x1={center}
            y1={center}
            x2={secondHand.x}
            y2={secondHand.y}
            stroke="red"
            strokeWidth={3}
          />

          <Circle cx={center} cy={center} r={5} fill="black" />
        </Svg>
      </View>
      <View className="h-[50%] flex-1 justify-center items-center">
        <View
          className="h-[10rem] m-4 w-[20rem] items-center 
        justify-center rounded-md border-[0.2rem] border-[rgb(213,242,84)] bg-white p-4 shadow-lg"
        >
          <Text className="text-[3.1rem] tracking-[2px] font-bold text-gray-900  font-serif">
            {newTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ClockPage;
