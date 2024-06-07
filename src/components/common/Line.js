import React from "react";
import styled from "styled-components";

const Line = () => {
  return <HorizontalLine />;
};

export default Line;

const HorizontalLine = styled.div`
  width: 343px;
  height: 1px;
  background: var(--border-border-primary, #202020);
`;
