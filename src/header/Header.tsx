import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAutoComplete from "../components/CustomAutoComplete";
import { getAccountData } from "../store/RiotApi";
import { debounce } from "../Utils";
import { ReactComponent as TitleImage } from "../assets/images/valorant.svg";

export default function Header() {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <TitleImageWrapper>
        <TitleImage onClick={moveToHome} />
        <HeaderTitle onClick={moveToHome}>Valorant</HeaderTitle>
      </TitleImageWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e84057;
  height: 80px;
`;

const TitleImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const HeaderTitle = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 2rem;
  font-weight: bold;
`;