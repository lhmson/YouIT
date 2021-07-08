import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Input, Image, Tooltip, Tag } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "antd";
import FriendCard from "../../components/FriendCard/FriendCard";
import UserRequestCard from "../../components/FriendCard/UserRequestCard";
import COLOR from "../../constants/colors";
import * as api from "../../api/friend";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import LoadingSearch from "../../components/Loading/LoadingSearch.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function FriendManagementPage() {
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listFriend, setListFriend] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Friends");
  const [updateData, setUpdateData] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    setLoading1(false);
    api
      .fetchListMyFriends(user?.result?._id)
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
        setLoading1(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, updateData]);

  useEffect(() => {
    setLoading2(false);
    api
      .fetchListRequestFriends(user?.result?._id)
      .then((res) => {
        console.log("Lala", res.data);
        if (res.data instanceof Array) setListRequest(res.data);
        else setListRequest([]);
        setLoading2(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, updateData]);

  const numberTotalFriend = listFriend.length;

  let listFilter = listFriend.filter((user) =>
    user?.name?.toLowerCase().includes(txtSearch?.toLowerCase())
  );

  if (mode === "Requests") {
    listFilter = listRequest.filter((user) =>
      user?.name?.toLowerCase().includes(txtSearch?.toLowerCase())
    );
  }

  const listUserCard = useMemo(
    () =>
      listFilter?.map((user, i) => {
        if (mode === "Friends")
          return (
            <FriendCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
              avatarUrl={user.avatarUrl}
              userInfo={user.userInfo}
            ></FriendCard>
          );
        else
          return (
            <UserRequestCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
              setUpdateData={setUpdateData}
              updateData={updateData}
              avatarUrl={user.avatarUrl}
              userInfo={user.userInfo}
            ></UserRequestCard>
          );
      }),
    [listFilter]
  );

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  if (!loading1 || !loading2)
    return (
      <div
        style={{ flex: 1, background: "white", height: 1000, paddingTop: 64 }}
      >
        <LoadingSearch></LoadingSearch>
      </div>
    );

  const CardSuggestion = ({ item }) => {
    console.log("card", item);
    return (
      <div
        style={{
          background: COLOR.greenSmoke,
          borderRadius: 20,
          width: 200,
          height: 380,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          boxShadow: "1px 1px #F2F2F2",
          marginBottom: 8,
        }}
      >
        <img
          alt={"avt"}
          src={
            item.avatarUrl ??
            "https://i.pinimg.com/originals/a1/62/89/a16289ed246af75e6199f0df99f7dbdf.gif"
          }
          style={{
            width: 180,
            objectFit: "cover",
            height: 200,
            alignSelf: "center",
            borderRadius: 20,
            marginBottom: 10,
          }}
        ></img>

        <Title level={5}>{item.name ?? "Phạm Sanh"}</Title>
        <div
          className="row"
          style={{
            padding: 16,
            alignItems: "center",
            marginTop: -16,
          }}
        >
          <img
            alt={"avt1"}
            src={
              item.avatarUrl1 ??
              "https://i.pinimg.com/564x/8f/0f/05/8f0f05ffe99debfbeef4cb83f87cad95.jpg"
            }
            style={{
              width: 30,
              objectFit: "cover",
              height: 30,
              borderRadius: 20,
            }}
          ></img>

          <img
            alt={"avt1"}
            src={
              item.avatarUrl2 ??
              "https://i.pinimg.com/236x/bf/f5/46/bff5462f324fa7aa5ca617e0912fa688.jpg"
            }
            style={{
              width: 30,
              objectFit: "cover",
              height: 30,
              borderRadius: 20,
              marginLeft: -15,
              marginRight: 8,
            }}
          ></img>

          <Text>{item.numberMutualFriends} mutual friends</Text>
        </div>
        <Link to={`/userinfo/${item.userId}`}>
          <Button
            onClick={() => {}}
            type="primary"
            style={{
              background: COLOR.green,
              borderColor: COLOR.green,
              color: "white",
              fontWeight: 500,
              width: "100%",
              borderRadius: 20,
            }}
          >
            Profile
          </Button>
        </Link>
        <div
          className="row"
          style={{ alignItems: "center", justifyContent: "center", padding: 8 }}
        >
          <Tooltip
            title={`Mentioned ${item?.hashtag?.count ?? 0} time${
              item?.hashtag?.count > 1 ? "s" : ""
            }`}
          >
            <Tag className="mb-2 tag">{item?.hashtag?.name}</Tag>
          </Tooltip>
        </div>
      </div>
    );
  };

  const Suggestion = () => {
    const [listSuggestion, setListSuggestion] = useState([]);
    useEffect(() => {
      api
        .getSuggestion(user?.result?._id)
        .then((res) => {
          if (res.data instanceof Array) setListSuggestion(res.data);
          else setListSuggestion([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);
    return (
      <div
        className="row"
        style={{ padding: 32, justifyContent: "space-between" }}
      >
        {listSuggestion?.map((item, index) => (
          <CardSuggestion item={item} key={index.toString()}></CardSuggestion>
        ))}
      </div>
    );
  };
  const FriendScrollView = () => {
    return (
      <div
        className="col-8 offset-2 "
        style={{
          marginTop: 64,
          alignItems: "center",
          background: "whitesmoke",
          borderRadius: 20,
          marginBottom: 32,
          boxShadow: "5px 5px #27AE60",
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 32,
            paddingBottom: 8,
          }}
        >
          <Title>Friends</Title>
          <div className="row">
            <Button
              onClick={() => setMode("Requests")}
              type="primary"
              style={{
                background: COLOR.green,
                borderColor: COLOR.green,
                color: "white",
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              Requests ({listRequest.length})
            </Button>
            <Button
              onClick={() => setMode("Friends")}
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Friends ({numberTotalFriend})
            </Button>
          </div>
        </div>

        <div
          className="row"
          style={{
            marginTop: 8,
            marginBottom: 16,
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <Input
            onPressEnter={handleSearch}
            allowClear
            suffix={
              <SearchOutlined
                onClick={() => {}}
                style={{ fontSize: 24, color: COLOR.white }}
              />
            }
            ref={inputRef}
            bordered={false}
            style={{
              backgroundColor: COLOR.lightGreen,
            }}
            defaultValue={""}
          />
        </div>

        <div className="row" style={{ padding: 32 }}>
          {listUserCard}
        </div>

        <div style={{ marginLeft: 32 }}>
          <Title level={3}>People you may know</Title>
        </div>

        <Suggestion></Suggestion>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={styles.mainArea}>
            <Content>
              <FriendScrollView></FriendScrollView>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FriendManagementPage;
