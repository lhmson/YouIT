import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { Avatar, Tag, Popover, List, Tooltip } from "antd";
import styles from "./styles.js";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import * as api from "../../api/friend";
import { useMobile } from "../../utils/responsiveQuery.js";
import { fetchProgrammingHashtags } from "../../api/hashtag";

const { Text, Title } = Typography;

function FriendCard(props) {
  const [user, setUser] = useLocalStorage("user");
  const { name } = props;
  const { _id } = props;
  const { avatarUrl } = props;
  const [numberMutual, setNumberMutual] = useState(0);
  const [listMutual, setListMutual] = useState([]);
  const [listHashTags, setListHashTags] = useState([]);

  const isMobile = useMobile();

  useEffect(() => {
    api
      .fetchCountMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data) setNumberMutual(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    api
      .fetchListMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data && res.data instanceof Array) {
          const tempList = [];
          for (let i = 0; i < res.data.length; i++)
            tempList.push({ name: res.data[i].name, id: res.data[i]._id });
          setListMutual(tempList);
          console.log(tempList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetchProgrammingHashtags(_id)
      .then((res) => {
        if (res.data) setListHashTags(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const popupListMutualFriend = (data) => {
    return (
      <>
        <div>
          <List
            header={<div></div>}
            footer={<div></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/userinfo/${item.id}`}>
                  <Text style={styles.text}>{item.name}</Text>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div style={styles.card}>
        <div
          className={`${!isMobile && "row"} m-2`}
          style={{ justifyContent: "space-between" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // minWidth: 600,
            }}
          >
            <div>
              <Avatar size={72} src={avatarUrl} />
            </div>

            <div className="ml-3 break-word">
              <Link to={`/userinfo/${_id}`}>
                <Title style={styles.textUser}>{name ?? "Anonymous"}</Title>
              </Link>

              <Text>React Native Developer</Text>
            </div>
          </div>

          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: user?.result?._id === _id ? "none" : "block",
            }}
          >
            <Link to={`/message`}>
              <Button
                className="mb-2"
                type="primary"
                style={{
                  background: "#27AE60",
                  borderColor: "#27AE60",
                  color: "white",
                  fontWeight: 500,
                }}
              >
                message
              </Button>
            </Link>
            <div>
              <Popover
                placement="bottom"
                title={""}
                content={popupListMutualFriend(listMutual ?? [])}
                trigger="hover"
              >
                <Link to={`/mutualFriends/${_id}`}>
                  <Text style={styles.text}>
                    {numberMutual} mutual friend{numberMutual >= 2 ? "s" : ""}
                  </Text>
                </Link>
              </Popover>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            {listHashTags?.map((item, i) => (
              <Tooltip
                title={`Mentioned ${item?.count} time${
                  item?.count > 1 ? "s" : ""
                }`}
              >
                <Tag key={i} className="mb-2 tag">
                  {item.name}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendCard;
