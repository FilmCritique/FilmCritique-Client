import React from "react";
import { Rating } from "react-simple-star-rating";

const StarRate = ({ onChange, value }) => {
  const handleRating = (rate) => {
    onChange(rate); // 부모 컴포넌트에서 받은 onChange 함수를 호출
  };

  return (
    <div className="box">
      <div className="demo">
        <Rating
          onClick={handleRating}
          size={30}
          transition
          allowFraction
          fillColor="#202020"
          initialValue={value}
        />
      </div>
    </div>
  );
};

export default StarRate;
