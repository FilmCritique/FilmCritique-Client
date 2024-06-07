import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import back from "../../assets/icon/backIcon.svg";
import whiteback from "../../assets/icon/back_white.svg";
import edit from "../../assets/icon/edit.svg";
import deleteIcon from "../../assets/icon/delete.svg";
import QuitWriteModal from "../writereview/QuitWriteModal";
import EditReviewModal from "../reviewdetail/EditReviewModal";
import DeleteReviewModal from "../reviewdetail/DeleteReviewModal";
const Header = ({ onButtonClick }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openQuitModal = () => setIsQuitModalOpen(true);
  const closeQuitModal = () => setIsQuitModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const handleFormSubmit = () => {
    if (onButtonClick) {
      onButtonClick();
      console.log("click");
    }
  };

  return (
    <>
      <StyledHeader pathname={pathname}>
        {pathname === "/" && (
          <>
            <Title onClick={() => navigate("/")}>FilmCritique</Title>
            <ActionButton onClick={() => navigate("/writeReview")}>
              Write
            </ActionButton>
          </>
        )}
        {pathname.startsWith("/writeReview") && (
          <>
            <BackImg src={back} onClick={openQuitModal} />
            <ActionButton onClick={handleFormSubmit}>Submit</ActionButton>{" "}
          </>
        )}
        {pathname.startsWith("/reviewDetail") && (
          <>
            <BackImg src={whiteback} onClick={() => navigate(-1)} />
            <ButtonContainer>
              <Icon src={edit} onClick={openEditModal} />
              <Icon src={deleteIcon} onClick={openDeleteModal} />
            </ButtonContainer>
          </>
        )}
      </StyledHeader>
      {isQuitModalOpen && pathname === "/writeReview" && (
        <QuitWriteModal closeModal={closeQuitModal} />
      )}
      {isEditModalOpen && pathname.startsWith("/reviewDetail") && (
        <EditReviewModal closeModal={closeEditModal} />
      )}
      {isDeleteModalOpen && pathname.startsWith("/reviewDetail") && (
        <DeleteReviewModal closeModal={closeDeleteModal} />
      )}
    </>
  );
};

export default Header;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  align-self: stretch;
  z-index: ${({ pathname }) =>
    pathname.startsWith("/reviewDetail") ? "3" : "1"};
  background: ${({ pathname }) =>
    pathname.startsWith("/reviewDetail")
      ? "#0000004d"
      : "var(--surface-surface-primary, #f6f6f6)"};
`;

const Title = styled.div`
  font-family: CabinetGrotesk;
  font-size: 24px;
  cursor: pointer;
`;

const ActionButton = styled.h1`
  color: var(--text-text-primary, #202020);
  font-feature-settings: "dlig" on;
  font-family: "Cabinet Grotesk";
  font-size: 24px;
  font-weight: 700;
  text-decoration-line: underline;
  cursor: pointer;
`;

const BackImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;
