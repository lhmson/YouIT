import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography, List } from "antd";
import { Avatar, Tag, Popover } from "antd";
import styles from "./styles.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as api from "../../../../api/friend";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

const { Title, Text } = Typography;

function MemberCard(props) {
  const [user, setUser] = useLocalStorage("user");
  const { name } = props;
  const { _id } = props;
  const [numberMutual, setNumberMutual] = useState(0);
  const [txtButton, setTxtButton] = useState(
    props.relationship ?? "Add Friend"
  );
  const [listMutual, setListMutual] = useState([]);
  const changeStateButton = () => {
    console.log(txtButton);
    if (txtButton === "Add Friend") setTxtButton("Cancel Request");
    else setTxtButton("Add Friend");
  };

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
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={72}
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Link to={`/userinfo/${_id}`}>
                <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}></div>
              <Text>React Native Developer</Text>
            </div>
            <div
              style={{
                marginLeft: 0,
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            ></div>
          </div>

          <div
            className="mr-3"
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: user?.result?._id === _id ? "none" : "block",
            }}
          >
            <Button
              onClick={changeStateButton}
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              {txtButton}
            </Button>
            <div>
              <Popover
                placement="bottom"
                title={""}
                content={popupListMutualFriend(listMutual ?? [])}
                trigger="hover"
              >
                <Text style={styles.text}>
                  {numberMutual} mutual friend{numberMutual >= 2 ? "s" : ""}
                </Text>
              </Popover>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            <Tag className="tag">C#</Tag>
            <Tag className="tag">Javascript</Tag>
            <Tag className="tag">Unity 3D</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>+ 15 Posts</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCard;
