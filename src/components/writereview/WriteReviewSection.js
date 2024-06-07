import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Line from "../common/Line";
import styled from "styled-components";
import uploadposter from "../../assets/icon/poster.png";
import { DisplayMd, BodyMediumXs } from "../../styles/font";
import StarRate from "./StarRate";
import { instance } from "../../api/instance";
const WriteReviewSection = ({
  reviewData,
  onReviewDataChange,
  onSubmit,
  formRef,
}) => {
  const [previewSource, setPreviewSource] = useState(uploadposter);
  const { reviewid } = useParams();

  const fileInputRef = useRef(null);

  const onInputHandler = (e) => {
    const { name, value } = e.target;
    onReviewDataChange({
      ...reviewData,
      [name]: value,
    });
  };

  const handleImgUpload = (e) => {
    if (!e.target.files) return;
    const uploadFile = e.target.files[0];
    onReviewDataChange({
      ...reviewData,
      poster: uploadFile,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleRatingChange = (rating) => {
    onReviewDataChange({
      ...reviewData,
      rating,
    });
  };

  // 리뷰 아이디가 변경될 때마다 해당 리뷰의 데이터를 불러옴
  useEffect(() => {
    if (reviewid) {
      const fetchReviewData = async () => {
        try {
          const res = await instance.get(`/critique/review/${reviewid}/`);
          onReviewDataChange(res.data); // 데이터를 받아서 바로 상태를 업데이트
        } catch (err) {
          alert(err);
        }
      };
      fetchReviewData();
    }
  }, [reviewid, onReviewDataChange]);
  return (
    <WriteReviewContainer>
      <Line />
      <form onSubmit={() => onSubmit(reviewData)} ref={formRef}>
        <div className="poster">
          <DisplayMd>Poster</DisplayMd>
          <PosterImg src={previewSource} onClick={handleImageClick} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImgUpload}
            style={{ display: "none" }}
          />
        </div>
        <Line />
        <div className="film-title">
          <div className="word-limit">
            <DisplayMd>Film Title</DisplayMd>
            <BodyMediumXs>{reviewData.title.length}/30</BodyMediumXs>
          </div>
          <ShortInput
            name="title"
            onChange={onInputHandler}
            maxLength="30"
            value={reviewData.title}
          />
        </div>
        <Line />
        <div className="rate">
          <DisplayMd>Rate</DisplayMd>
          <StarRate onChange={handleRatingChange} value={reviewData.rating} />
        </div>
        <Line />
        <div className="date-watched">
          <DisplayMd>Date Watched</DisplayMd>
          <ShortInput
            name="dateWatched"
            onChange={onInputHandler}
            placeholder=""
            value={reviewData.dateWatched}
          />
        </div>
        <Line />
        <div className="review">
          <div className="word-limit">
            <DisplayMd>Review</DisplayMd>
            <BodyMediumXs>{reviewData.review.length}/1000</BodyMediumXs>
          </div>
          <ReviewInput
            name="review"
            onChange={onInputHandler}
            maxLength="1000"
            value={reviewData.review}
          />
        </div>
        <Line />
        <div className="username">
          <div className="word-limit">
            <DisplayMd>Username</DisplayMd>
            <BodyMediumXs>{reviewData.username.length}/20</BodyMediumXs>
          </div>
          <ShortInput
            name="username"
            onChange={onInputHandler}
            maxLength="20"
            value={reviewData.username}
          />
        </div>
        <Line />
        <div className="password">
          <div className="word-limit">
            <DisplayMd>Password</DisplayMd>
            <BodyMediumXs>{reviewData.password.length}/6</BodyMediumXs>
          </div>
          <ShortInput
            name="password"
            onChange={onInputHandler}
            maxLength="6"
            value={reviewData.password}
          />
        </div>
        <Line />
      </form>
    </WriteReviewContainer>
  );
};
export default WriteReviewSection;
const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface-surface-primary, #f6f6f6);

  .film-title,
  .rate,
  .date-watched,
  .review,
  .username,
  .password {
    display: flex;
    padding: var(--spacing-spacing-2xl, 24px) var(--spacing-spacing-md, 16px);
    align-items: flex-start;
    align-self: stretch;
    flex-direction: column;
    gap: var(--spacing-spacing-xs, 12px);
  }
  .poster {
    display: flex;
    padding: var(--spacing-spacing-2xl, 24px) var(--spacing-spacing-md, 16px);
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
  }
  .word-limit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }
`;

const PosterImg = styled.img`
  width: 90px;
  height: 135px;
  border-radius: var(--radius-radius-sm, 4px);
  cursor: pointer;
`;

const ShortInput = styled.input`
  font-family: pretendard;
  height: 49px;
  width: 100%;
  padding: var(--size-160, 16px) var(--spacing-spacing-md, 16px);
  border-radius: var(--radius-radius-md, 8px);
  border: 1px solid var(--border-border-tertiary, #e1e1e1);
`;

const ReviewInput = styled.textarea`
  font-family: pretendard;

  height: 242px;
  width: 100%;
  padding: var(--size-160, 16px) var(--spacing-spacing-md, 16px);
  border-radius: var(--radius-radius-md, 8px);
  border: 1px solid var(--border-border-tertiary, #e1e1e1);
`;
