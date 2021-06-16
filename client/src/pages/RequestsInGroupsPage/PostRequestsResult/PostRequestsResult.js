import React, { useContext, useState, useEffect } from "react";
import { AiOutlineAntDesign } from "react-icons/ai";
import * as api from "../../../api/post";
import PostRequests from "../../../components/PostRequests/PostRequests";
import COLOR from "../../../constants/colors";
import { GroupContext } from "../../GroupPage/GroupPage";
import { Typography, Row } from "antd";
import styles from "./styles.js";

const { Text } = Typography;
function PostRequestsResult() {
  const { group } = useContext(GroupContext);
  const [listPostRequest, setListPostRequest] = useState([]);

  useEffect(() => {
    api
      .fetchPostsPagination(0, 10082000, "pending_in_group", null, group?._id)
      .then((res) => {
        if (res.data instanceof Array) setListPostRequest(res.data);
        else setListPostRequest([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [group]);

  const listPostRequestCard = () =>
    listPostRequest?.map((post, i) => (
      <PostRequests post={post}></PostRequests>
    ));

  const noRequestPending = () => (
    <div style={styles.item}>
      <Row className="pb-2 justify-content-between align-items-center">
        <Text style={{ fontSize: 24 }}>No post review pending.</Text>
      </Row>
    </div>
  );
  return (
    <div
      style={{
        background: COLOR.whiteSmoke,
      }}
    >
      <div className="col-10 offset-1">
        <div
          className="row"
          style={{
            height: 900,
            paddingTop: 16,
          }}
        >
          <div className="col-10 offset-1">
            {listPostRequest.length === 0
              ? noRequestPending()
              : listPostRequestCard()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRequestsResult;
