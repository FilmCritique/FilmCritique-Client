import React from "react";
import Router from "./Router";
import styled from "styled-components";
function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}
const AppContainer = styled.div`
  width: 376px;
  height: 100vh;
  overflow: scroll;
  margin: 0 auto;
`;

export default App;
