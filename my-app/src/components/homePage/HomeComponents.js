import styled from "styled-components";

export const HomeDiv = styled.div`
  // background-color: #e01e22;
  background-color: transparent;
  position: relative;
  height: 100%;
  padding-bottom: 5px;
  text-align: center;
  font-weight: light;
`;

export const HomeTitleContainer = styled.div`
  display block;
  height: 45px;
  padding: 12px;
  margin:20px;
  // border-bottom: 3px solid #dddddd;
`;

export const HomeTitleTag = styled.span`
  font-size: 3em;
  font-weight: light;
  color: white;
  text-align: center;
  animation: titleAnimation 2s;
  opacity: 0.7;
  
  @keyframes titleAnimation {
      0% { opacity: 0; }
      100% { opacity: 0.7; } 
      0% { filter: blur(10); }  
      100% { filter: blur(0);} 
  }
`;

