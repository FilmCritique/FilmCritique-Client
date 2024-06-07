import React, { useState, useEffect } from "react";
import styled from "styled-components";
import star from "../../assets/icon/whitestar.svg";
import { useParams } from "react-router-dom";
import { instance } from "../../api/instance";
import dayjs from "dayjs";
const DetailReviewSection = () => {
  const [review, setReview] = useState({});
  const { reviewid } = useParams();
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const res = await instance.get(`/critique/review/${reviewid}/`);
        setReview(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchReviewData();
  }, [reviewid]);
  return (
    <DetailReviewContainer>
      <PosterImg src={review?.poster} />
      <Dim />
      <div className="top">
        <MovieTitle>{review?.title}</MovieTitle>
        <Username>{review?.username}님의 평가</Username>
        <Rate>
          <StarIcon src={star} />
          <RateScore> {review?.rating}</RateScore>
        </Rate>
      </div>

      <div className="bottom">
        <Review>{review?.review}</Review>
        <div className="time">
          <WatchTime>관람일:{review?.date_watched}</WatchTime>
          <UploadTime>
            작성일: {dayjs(review?.created_at).format("YYYY-MM-DD HH:mm")}
          </UploadTime>
        </div>
      </div>
    </DetailReviewContainer>
  );
};

export default DetailReviewSection;

const DetailReviewContainer = styled.div`
  .top {
    display: flex;
    padding: var(--spacing-spacing-md, 16px);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-spacing-5xs, 4px);
    align-self: stretch;
    background: #0000004d;
  }

  .rate {
    display: flex;
    align-items: center;
    gap: 6px;
    align-self: stretch;
  }
  .bottom {
    display: flex;
    padding: var(--spacing-spacing-5xl, 36px) var(--spacing-spacing-md, 16px);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-spacing-md, 16px);
    align-self: stretch;
    background: #f6f6f6;
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
  }
`;
const Dim = styled.div`
  background: #0000004d;
  height: 300px;
`;

const PosterImg = styled.img`
  display: flex;
  width: auto;
  top: 0;
  height: 500px;
  align-self: stretch;
  position: absolute;
  z-index: -1;
`;
const MovieTitle = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: #f6f6f6;
  font-feature-settings: "dlig" on;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;
const UploadTime = styled.h4`
  color: var(--text-text-secondary, #7c7c7c);
  font-feature-settings: "dlig" on;

  /* Body/medium-xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
`;
const WatchTime = styled.h4`
  color: var(--text-text-secondary, #7c7c7c);
  font-feature-settings: "dlig" on;

  /* Body/medium-xs */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
`;
const Username = styled.h4`
  color: #f6f6f6;
  font-feature-settings: "dlig" on;

  /* Body/medium-sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
`;
const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;
const StarIcon = styled.img``;
const RateScore = styled.h4`
  color: #f6f6f6;
  font-feature-settings: "dlig" on;

  /* Body/medium-sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
`;
const Review = styled.h3`
  color: var(--text-text-primary, #202020);
  font-feature-settings: "dlig" on;

  /* Body/medium-sm */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
`;
