import React, { useContext, useState, useEffect } from "react";
import * as api from "../../../api/post";
import PostRequests from "../../../components/PostRequests/PostRequests";
import COLOR from "../../../constants/colors";
import { GroupContext } from "../../GroupPage/GroupPage";

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
          <div className="col-10 offset-1">{listPostRequestCard()}</div>
        </div>
      </div>
    </div>
  );
}

export default PostRequestsResult;
