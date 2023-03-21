import styled from "@emotion/styled";
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "../Utils";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { uniqBy } from "lodash";
import { getAccountData } from "../store/RiotApi";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactComponent as Star } from "../assets/images/star.svg";
import { ReactComponent as Delete } from "../assets/images/delete.svg";
import { ReactComponent as FilledStar } from "../assets/images/filled-star.svg";
import { borderRadius } from "@mui/system";

interface Card {
  small: string;
  medium: string;
  large: string;
}

interface UserList {
  name: string;
  card: Card;
}

interface Properties {
  style?: React.CSSProperties;
  id: string;
}

const CustomAutoComplete = ({
  id = "",
  style = { width: 200 },
}: Properties) => {
  const [userList, setUserList] = useState<Array<UserList>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [hasInputValue, setHasInputValue] = useState<boolean>(false);
  const [dropDownLiKey, setDropDownLiKey] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    handleChangeTextField(inputValue);

    // autocomplete input value가 공란일 때
    if (inputValue === "") {
      setHasInputValue(false);
      setDropDownLiKey(0);
    }

    // autocomplete input value가 존재하고, #을 포함할 때만 검색함.
    if (inputValue && inputValue.includes("#")) {
      setHasInputValue(true);
    }
  }, [inputValue]);

  const makeSearchHistoryData = (nameValue: string, card: Card) => {
    let searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") ?? "[]"
    );
    searchHistory.push({ name: nameValue, card, favorite: false });
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(Array.from(uniqBy(searchHistory, "name")))
    );
  };

  const handleChangeAutoComplete = (value: string, card: Card) => {
    if (value) {
      const [name, tag] = value.split("#");

      makeSearchHistoryData(value, card);
      deleteInputValue();

      navigate(`/profile/${name}/${tag}`, {
        state: {
          name,
          tag,
        },
      });
    }
  };

  const handleChangeTextField = async (value: string) => {
    if (value.includes("#")) {
      debounce(async () => {
        const [name, tag] = value.split("#");
        const USER_LIST: UserList = await getAccountData(name, tag, true);
        setUserList([USER_LIST]);
      }, 500);
    } else {
      setUserList([{ name: "", card: { small: "", medium: "", large: "" } }]);
    }
  };

  useEffect(() => {
    if (dropDownLiKey === -1) {
      setDropDownLiKey(0);
    }

    if (dropDownLiKey > userList.length - 1) {
      setDropDownLiKey(userList.length - 1);
    }
  }, [dropDownLiKey]);

  // const filterDropDownList = () => {
  //     if (inputValue === '') {

  //     } else {
  //         setHasInputValue(true);
  //         // const filteredDropDownList = options.filter(item => item.name.includes(inputValue));
  //         // setDropDownList(filteredDropDownList);
  //     }
  // };

  const handleChange = (e: React.SyntheticEvent) => {
    setInputValue((e.target as HTMLInputElement)?.value);
  };

  const selectDropDown = (e: React.SyntheticEvent | null) => {
    const focusedItemLabel = Object.values(userList)[dropDownLiKey].name;
    const focusedItemCards = Object.values(userList)[dropDownLiKey].card;
    handleChangeAutoComplete(
      (e?.target as HTMLLIElement)?.innerText || focusedItemLabel,
      focusedItemCards
    );
    deleteInputValue();
  };

  const deleteInputValue = () => {
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (inputValue) {
      switch (e.key) {
        case "ArrowUp":
          setDropDownLiKey((prev) => --prev);
          break;
        case "ArrowDown":
          setDropDownLiKey((prev) => ++prev);
          break;
        case "Enter":
          selectDropDown(e);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Container>
        <CustomInputContainer id={id} hasInputValue={hasInputValue}>
          <CustomInput
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            style={style}
          />
          <DeleteButton onClick={deleteInputValue}>x</DeleteButton>
        </CustomInputContainer>
        {hasInputValue && (
          <DropDownListUl style={style}>
            {userList.length === 1 && userList[0]?.name === "" && (
              <DropDownListLi key={0}>검색 중 . . .</DropDownListLi>
            )}
            {userList.map((item, index) => (
              <DropDownListLi
                className={dropDownLiKey === index ? "selected" : ""}
                key={index}
                id={index + "id"}
                onClick={selectDropDown}
              >
                {item.name}
              </DropDownListLi>
            ))}
          </DropDownListUl>
        )}

        {/* {searchHistory.length >= 1 && (
          <>
            <div>최근 검색</div>
            {searchHistory.map((item) => {
              return (
                <div onClick={selectDropDown} style={{ cursor: "pointer" }}>
                  {item.name}
                </div>
              );
            })}
          </>
        )} */}
        {!inputValue && (
          <SearchHistoryGridList
            onClickHistory={handleChangeAutoComplete}
            style={style}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 10px;
  height: 100%;
  position: relative;
`;

const actvBorderRadius = "10px 10px 0 0";
const inactvBorderRadius = "10px 10px 10px 10px";

const CustomInputContainer = styled.div<{ hasInputValue: boolean }>`
  position: relative;
  display: flex;
  // flex-direction: row;
  padding: 16px;
  border: 1px solid lightgray;
  border-radius: ${(props) =>
    props.hasInputValue ? actvBorderRadius : inactvBorderRadius};
  background-color: white;
  z-index: 99;
  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const CustomInput = styled.input<{ style: React.CSSProperties }>`
  flex-grow: 1;
  width: ${(props) => props.style.width};
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: black;
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 30px;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DropDownListUl = styled.ul<{ style: React.CSSProperties }>`
  position: absolute;
  width: ${(props) => props.style.width};
  display: block;
  list-style: none;
  background-color: white;
  margin: 0px;
  padding: 16px;
  z-index: 99;
`;

const DropDownListLi = styled.li`
  cursor: pointer;
  padding: 0 16px;
  color: black;
  &.selected {
    background-color: lightgray;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: React.CSSProperties;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ISearchHistoryGridList {
  onClickHistory: (value: string, card: Card) => void;
  style: React.CSSProperties;
}

interface SearchList {
  name: string;
  card: Card;
  favorite: boolean;
}

interface FavoriteList {
  name: string;
  card: Card;
}

const SearchHistoryGridList = ({
  onClickHistory = () => {},
  style = { width: 200 },
}: ISearchHistoryGridList) => {
  const [value, setValue] = useState(0);
  const [searchHistory, setSearchHistory] = useState<Array<SearchList>>(
    JSON.parse(localStorage.getItem("searchHistory") ?? "[]")
  );
  const [favoriteHistory, setFavoriteHistory] = useState<Array<FavoriteList>>(
    JSON.parse(localStorage.getItem("favoriteHistory") ?? "[]")
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addFavoriteHistory = (item: { name: string; card: Card }) => {
    setFavoriteHistory((curr) => {
      let newFavoriteHistory = [...curr];
      newFavoriteHistory.push(item);

      localStorage.setItem(
        "favoriteHistory",
        JSON.stringify(uniqBy(newFavoriteHistory, "name"))
      );

      return [...newFavoriteHistory];
    });
    setSearchHistory((curr) => {
      let searchHistory = [...curr];
      const newSearchHistory = searchHistory.map((i) => {
        if (i.name === item.name) {
          return { ...i, favorite: true };
        } else {
          return { ...i };
        }
      });

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(uniqBy(newSearchHistory, "name"))
      );

      return [...newSearchHistory];
    });
  };

  const deleteFavoriteHistory = (name: string) => {
    setFavoriteHistory((curr) => {
      let newFavoriteHistory = [...curr].filter((i) => i.name !== name);

      localStorage.setItem(
        "favoriteHistory",
        JSON.stringify(uniqBy(newFavoriteHistory, "name"))
      );

      return [...newFavoriteHistory];
    });
    setSearchHistory((curr) => {
      const newSearchHistory = [...curr];
      curr.forEach((i, index) => {
        if (i.name === name) {
          newSearchHistory[index]["favorite"] = false;
        }
      });

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(uniqBy(newSearchHistory, "name"))
      );

      return [...newSearchHistory];
    });
  };

  const deleteSearchHistory = (name: string) => {
    setSearchHistory((curr) => {
      const newSearchHistory = [...curr].filter((i) => i.name !== name);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(uniqBy(newSearchHistory, "name"))
      );

      return [...newSearchHistory];
    });
  };

  return (
    <div
      style={{
        marginTop: "10px",
        backgroundColor: "white",
        position: "absolute",
        padding: "0px 16px",
        ...style,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="최근 검색" {...a11yProps(0)} />
            <Tab label="즐겨찾기" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} style={{ width: "100%" }}>
          <HistoryWrapper>
            {searchHistory.map((item) => {
              return (
                <History>
                  <div
                    style={{
                      margin: "0px 0px 0px 10px",
                      display: "flex",
                      border: "0px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      onClickHistory(item.name, item.card);
                    }}
                  >
                    <img
                      src={item.card.small}
                      width={40}
                      height={40}
                      alt=""
                    ></img>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "left",
                      flex: 3,
                    }}
                    onClick={() => {
                      onClickHistory(item.name, item.card);
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {item.name.split("#")[0]}
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {"#" + item.name.split("#")[1]}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "10px",
                    }}
                    onClick={() => {
                      if (item.favorite) {
                        deleteFavoriteHistory(item.name);
                      } else {
                        addFavoriteHistory(item);
                      }
                    }}
                  >
                    {item.favorite && <FilledStar width={24} height={24} />}
                    {!item.favorite && <Star width={24} height={24} />}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "10px",
                    }}
                    onClick={() => deleteSearchHistory(item.name)}
                  >
                    <Delete width={24} height={24} />
                  </div>
                </History>
              );
            })}
          </HistoryWrapper>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: "100%" }}>
          <HistoryWrapper>
            {favoriteHistory.map((item) => {
              return (
                <History>
                  <div
                    style={{
                      margin: "0px 0px 0px 10px",
                      display: "flex",
                      border: "0px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      onClickHistory(item.name, item.card);
                    }}
                  >
                    <img
                      src={item.card.small}
                      width={40}
                      height={40}
                      alt=""
                    ></img>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "left",
                      flex: 3,
                    }}
                    onClick={() => {
                      onClickHistory(item.name, item.card);
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {item.name.split("#")[0]}
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {"#" + item.name.split("#")[1]}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "10px",
                    }}
                    onClick={() => deleteFavoriteHistory(item.name)}
                  >
                    <Delete width={24} height={24} />
                  </div>
                </History>
              );
            })}
          </HistoryWrapper>
        </TabPanel>
      </Box>
    </div>
  );
};

const HistoryWrapper = styled.div`
  display: flex;
  width: 100%;
  div:nth-of-type(n + 2) {
    margin-left: 5px;
  }
`;

const History = styled.div`
  cursor: pointer;
  color: black;
  display: flex;
  width: 33.3%;
  padding: 3px;
  &:hover {
    background-color: lightgray;
  }
`;

export default CustomAutoComplete;
