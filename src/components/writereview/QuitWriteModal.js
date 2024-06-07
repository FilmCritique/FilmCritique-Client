import React from "react";
import styled from "styled-components";
import { BodyBoldMd, BodyMediumXs } from "../../styles/font";
import { useNavigate } from "react-router-dom";

const QuitWriteModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <DimBackground>
      <ModalContainer>
        <ModalContent>
          <AlertText>
            <BodyBoldMd>리뷰 작성을 그만두시나요?</BodyBoldMd>
            <BodyMediumXs style={{ textAlign: "center" }}>
              그만두기 버튼을 누르면 작성 중이던 리뷰가 삭제됩니다.
            </BodyMediumXs>
          </AlertText>
          <ButtonContainer>
            <CancelButton onClick={handleCloseModal}>취소</CancelButton>
            <ConfirmButton onClick={() => navigate(-1)}>그만두기</ConfirmButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </DimBackground>
  );
};

export default QuitWriteModal;

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
  height: 192px;
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
