import styled from "styled-components";

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 575px) {
    width: 100%;
    margin-right: 10px;
    margin-left: 10px;
  }

  @media (min-width: 576px) {
    width: 95%;
  }

  @media (min-width: 768px) {
    width: 720px;
  }

  @media (min-width: 992px) {
    width: 960px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
  }

  @media (min-width: 1400px) {
    width: 1320px;
  }
`;

export default Container;
