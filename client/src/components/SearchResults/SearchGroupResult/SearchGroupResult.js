import React, { useState, useEffect, useMemo } from "react";
import GroupCard from "../../../components/GroupCard/GroupCard";
import * as api from "../../../api/search";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";

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

  const listGroupCard = useMemo(
    () =>
      listGroup?.map((group, i) => {
        return (
          <GroupCard
            key={i}
            _id={group._id}
            nameGroup={group.name}
            description={group.description}
            totalMembers={group.listMembers?.length}
          ></GroupCard>
        );
      }),
    [listGroup]
  );

  return (
    <div className="col-12">
      <div
        className="col-12"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {listGroupCard.length === 0 ? (
          <NoDataSearch></NoDataSearch>
        ) : (
          listGroupCard
        )}
      </div>
    </div>
  );
};

export default SearchGroupResult;
