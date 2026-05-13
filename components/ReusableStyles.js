import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 650px;
  margin: 0 auto;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    width: 100%;
  }
`;
