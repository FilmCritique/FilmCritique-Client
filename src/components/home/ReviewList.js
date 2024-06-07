import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import styled from "styled-components";
import { instance } from "../../api/instance";

const ReviewList = () => {
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const res = await instance.get("critique/review/");
        if (res.status === 200) {
          setReviewList(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviewData();
  }, []);
  return (
    <ReviewItemContainer>
      {reviewList?.map((item) => (
        <ReviewItem key={item.id} reviewData={item} />
      ))}
    </ReviewItemContainer>
  );
};

export default ReviewList;

const ReviewItemContainer = styled.div`
  padding: 16px;
  background: var(--surface-surface-primary, #f6f6f6);
`;
