import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { BodyBoldMd, BodyMediumXs } from "../../styles/font";
import { instance } from "../../api/instance";

const EditReviewModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const inputRefs = useRef([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { reviewid } = useParams();
  const [isPendingRequest, setIsPendingRequest] = useState(false);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    setPassword((prevPassword) => {
      const newPassword = prevPassword.split("");
      newPassword[index] = value;
      return newPassword.join("").substring(0, 6);
    });
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  //수정하기 버튼 클릭시 실행
  const handleEditReview = async (reviewData) => {
    if (isPendingRequest) return;

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    };

    try {
      setIsPendingRequest(true);
      const res = await instance.post(
        `/critique/review/${reviewid}/password/`,
        { password },
        { headers }
      );

      if (res.status === 200 && res.data.password === true) {
        const reviewDataToUpdate = {
          title: reviewData.title,
          rating: reviewData.rating,
          review: reviewData.review,
          username: reviewData.username,
          password: reviewData.password,
          date_watched: reviewData.dateWatched,
        };

        const response = await instance.patch(
          `/critique/review/${reviewid}/`,
          reviewDataToUpdate,
          { headers }
        );

        if (response.status === 200) {
          navigate(`/writeReview/${reviewid}`);
        } else {
          setErrorMessage("리뷰를 수정하는데 실패했습니다.");
        }
      } else {
        setErrorMessage("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("Error checking password:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    } finally {
      setIsPendingRequest(false);
    }
  };

  return (
    <DimBackground>
      <ModalContainer>
        <ModalContent>
          <AlertText>
            <BodyBoldMd>수정하기</BodyBoldMd>
            <BodyMediumXs style={{ textAlign: "center" }}>
              리뷰 비밀번호 숫자 6자리를 입력해주세요.
            </BodyMediumXs>
          </AlertText>
          <PasswordContainer>
            {[...Array(6)].map((_, index) => (
              <PasswordInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="password"
                maxLength="1"
                value={password[index] || ""}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </PasswordContainer>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <ButtonContainer>
            <CancelButton
              onClick={handleCloseModal}
              disabled={isPendingRequest}
            >
              취소
            </CancelButton>
            <ConfirmButton
              onClick={handleEditReview}
              disabled={isPendingRequest}
            >
              수정하기
            </ConfirmButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </DimBackground>
  );
};

export default EditReviewModal;

const DimBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 375px;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 303px;
  height: 254px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 28px 36px;
  gap: 28px;
  border-radius: 12px;
  background: #f6f6f6;
`;

const AlertText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-overflow: ellipsis;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button`
  width: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 150%;
`;

const CancelButton = styled(Button)`
  background: #f6f6f6;
  color: #202020;
`;

const ConfirmButton = styled(Button)`
  background: #202020;
  color: #f6f6f6;
  line-height: normal;
`;

const PasswordContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const PasswordInput = styled.input`
  width: 32px;
  height: 36px;
  padding: 0;
  background: #e1e1e1;
  border: 0px solid;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  outline: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;
