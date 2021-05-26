import React, { useState, useEffect, useMemo } from "react";
import GroupCard from "../../../components/GroupCard/GroupCard";
import * as api from "../../../api/search";

const SearchGroupResult = ({ txtSearch }) => {
  const [listGroup, setListGroup] = useState([]);

  useEffect(() => {
    api
      .fetchSearchGroup(txtSearch)
      .then((res) => {
        console.log("LISTGROUP", txtSearch);
        console.log(res.data);
        if (res.data instanceof Array) setListGroup(res.data);
        else setListGroup([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listGroupCardLeft = useMemo(
    () =>
      listGroup?.map((group, i) => {
        if (i % 2 == 0)
          return <GroupCard _id={group._id} nameGroup={group.name}></GroupCard>;
      }),
    [listGroup]
  );

  const listGroupCardRight = useMemo(
    () =>
      listGroup?.map((group, i) => {
        if (i % 2 == 1)
          return <GroupCard _id={group._id} nameGroup={group.name}></GroupCard>;
      }),
    [listGroup]
  );

  return (
    <div className="col-10 offset-1">
      <div
        className="row"
        style={{
          height: 900,
          paddingTop: 16,
          paddingLeft: 32,
          marginLeft: 128,
        }}
      >
        <div className="col-6">
          <ul>{listGroupCardLeft}</ul>
        </div>
        <div className="col-6">
          <ul>{listGroupCardRight}</ul>
        </div>
      </div>
    </div>
  );
};

export default SearchGroupResult;
