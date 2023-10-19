import styled from "@emotion/styled";
import { isEmpty, uniqBy } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAutoComplete from "../components/CustomAutoComplete";
import { getAccountData } from "../store/RiotApi";
import { debounce } from "../Utils";

export default function MainPage() {
  return (
    <>
      <MainWrapper>
        <MainContentWrapper>
          <MainContentLogoImageWrapper>
          </MainContentLogoImageWrapper>
          <AutoCompleteWrapper>
            <CustomAutoComplete
              id="main_auto_complete"
              style={{ width: 665 }}
              showHistory={true}
            />
          </AutoCompleteWrapper>
        </MainContentWrapper>
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.div`
  background: url(https://valorant.op.gg/images/main_bg_desktop.jpeg) no-repeat
    center top;
  position: relative;
  min-height: 1080px;
  background-size: cover;
`;

const MainContentWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 900px;
  margin: auto;
  padding-top: 50px;
`;

const MainContentLogoImageWrapper = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
`;

const AutoCompleteWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
