import styled from "@emotion/styled";
import { isEmpty, uniqBy } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAutoComplete from "../components/CustomAutoComplete";
import { getAccountData } from "../store/RiotApi";
import { debounce } from "../Utils";

export default function MainPage() {
  interface UserList {
    name: string;
  }

  const LS_SEARCH_HISTORY = JSON.parse(
    localStorage.getItem("searchHistory") ?? "[]"
  );
  const [userList, setUserList] = useState<UserList[]>([{ name: "" }]);
  const navigate = useNavigate();

  const handleChangeAutoComplete = useCallback(
    (value: string) => {
      if (value) {
        const [name, tag] = value.split("#");

        let searchHistory = JSON.parse(
          localStorage.getItem("searchHistory") ?? "[]"
        );
        searchHistory.push({ name: value });
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(Array.from(uniqBy(searchHistory, "name")))
        );

        navigate(`/profile/${name}/${tag}`, {
          state: {
            name,
            tag,
          },
        });
      }
    },
    [navigate]
  );

  const handleChangeTextField = useCallback(
    async (value: string) => {
      if (value.includes("#")) {
        debounce(async () => {
          const [name, tag] = value.split("#");
          const USER_LIST: UserList = await getAccountData(name, tag, true);
          setUserList([USER_LIST]);
        }, 500);
      } else {
        setUserList([{ name: "" }]);
      }
    },
    [userList]
  );

  return (
    <>
      <MainWrapper>
        <MainContentWrapper>
          <MainContentLogoImageWrapper>
            <img
              src={"https://valorant.op.gg/images/valorant.png"}
              width="240px"
              height={"35px"}
            />
          </MainContentLogoImageWrapper>
          <AutoCompleteWrapper>
            <CustomAutoComplete
              id="main_auto_complete"
              searchHistory={LS_SEARCH_HISTORY}
              options={userList}
              onInputChange={handleChangeTextField}
              onChange={handleChangeAutoComplete}
              style={{ width: "500px" }}
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
