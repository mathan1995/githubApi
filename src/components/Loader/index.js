import React from "react";
import { SpinnerCircular } from "spinners-react";

const Index = ({ size, thickness, speed, color, secondaryColor }) => {
  return (
    <div className="spinner__container">
      <SpinnerCircular
        size={size}
        thickness={thickness}
        speed={speed}
        color={color}
        secondaryColor={secondaryColor}
      />
      Loading..
    </div>
  );
};

export default Index;
