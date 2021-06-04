import React, { useContext, useState, useEffect } from "react";
import * as api from "../../../api/post";
import PostRequests from "../../../components/PostRequests/PostRequests";
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
        console.log("thyyyyy", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [group]);

  const listPostRequestCard = () =>
    listPostRequest?.map((post, i) => (
      <PostRequests
        _id={post._id}
        _idOwnerPost={post.userId._id}
        title={post.title}
        nameOwner={post.userId.name}
        content={post.content.text}
      ></PostRequests>
    ));

  return (
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
  );
}

export default PostRequestsResult;
