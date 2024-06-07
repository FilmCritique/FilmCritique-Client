import React, { useRef, useState } from "react";
import Header from "../components/common/Header";
import WriteReviewSection from "../components/writereview/WriteReviewSection";
import { instance } from "../api/instance";
import { useNavigate } from "react-router-dom";
const WriteReview = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    poster: {},
    title: "",
    rating: "",
    review: "",
    username: "",
    password: "",
    dateWatched: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", reviewData.title);
    formData.append("rating", reviewData.rating);
    formData.append("review", reviewData.review);
    formData.append("username", reviewData.username);
    formData.append("password", reviewData.password);
    formData.append("date_watched", reviewData.dateWatched);
    formData.append("poster", reviewData.poster);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      console.log("Submitting review data:", formData);
      console.log("Submitting review data:", reviewData.poster);

      const response = await instance.post("/critique/review/", formData, {
        headers,
      });
      if (response.status === 201) {
        console.log("Review submitted successfully!");
        navigate(`/`);
      } else {
        console.error("Failed to submit review!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const handleReviewDataChange = (data) => {
    setReviewData(data);
  };
  const handleButtonClick = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };
  return (
    <div>
      <Header onButtonClick={handleButtonClick} />
      <WriteReviewSection
        onReviewDataChange={handleReviewDataChange}
        reviewData={reviewData}
        onSubmit={handleSubmit}
        formRef={formRef}
      />
    </div>
  );
};

export default WriteReview;
