import React, { useState, useEffect, useMemo } from "react";
import GroupCard from "../../../components/GroupCard/GroupCard";
import * as api from "../../../api/search";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";
import { useMobile } from "../../../utils/responsiveQuery";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import LoadingSearch from "../../../components/Loading/LoadingSearch.js";

const SearchGroupResult = ({ txtSearch }) => {
  const [listGroup, setListGroup] = useState([]);
  const [user, setUser] = useLocalStorage("user");
  const [loading, setLoading] = useState(false);

  const isMobile = useMobile();

  useEffect(() => {
    setLoading(false);
    api
      .fetchSearchGroup(txtSearch)
      .then((res) => {
        console.log("LISTGROUP", txtSearch);
        console.log(res.data);
        if (res.data instanceof Array) setListGroup(res.data);
        else setListGroup([]);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [txtSearch]);

  const listGroupCard = useMemo(
    () =>
      listGroup?.map((group, i) => {
        let status = "Join";
        for (let i = 0; i < group?.listMembers?.length; i++)
          if (group?.listMembers[i]?.userId === user?.result._id) {
            status = "Joined";
            break;
          }

        for (let i = 0; i < group?.listPendingMembers?.length; i++)
          if (group?.listPendingMembers[i]?.userId === user?.result._id) {
            status = "Cancel request";
            break;
          }
        return (
          <GroupCard
            key={i}
            _id={group._id}
            nameGroup={group.name}
            description={group.description}
            topic={group.topic}
            totalMembers={group.listMembers?.length}
            status={status}
          ></GroupCard>
        );
      }),
    [listGroup]
  );

  if (!loading)
    return (
      <div
        className="row justify-content-center"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <div className={`${!isMobile && "col-12"}`}>
          <LoadingSearch></LoadingSearch>
        </div>
      </div>
    );

  return (
    // <div className="col-12">
    <div
      className="row justify-content-center"
      style={{
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
      }}
    >
      <div className={`${!isMobile && "col-12"}`}>
        {listGroupCard.length === 0 ? (
          <NoDataSearch></NoDataSearch>
        ) : (
          listGroupCard
        )}
      </div>
    </div>
    // </div>
  );
};

export default SearchGroupResult;
