import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./font.css";
export const GlobalStyle = createGlobalStyle`
${reset}
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    font-family:"Pretendard";
    background-color:white;
}
::-webkit-scrollbar{
    display:none;
}
input{
    border:none;
    outline:none;
}
button{
    width:auto;
    background:none;
    border:none;
    cursor:pointer;
    &:focus{
        outline:none;
    }
}


`;
