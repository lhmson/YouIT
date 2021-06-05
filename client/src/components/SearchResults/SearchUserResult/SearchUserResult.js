import React, { useState, useEffect, useMemo } from "react";
import UserCard from "../../../components/UserCard/UserCard";
import * as api from "../../../api/search";
import NoDataSearch from "../../../components/NoDataSearch/NoDataSearch";
import { useMobile } from "../../../utils/responsiveQuery";

function SearchUserResult({ userNameSearch }) {
  const [listUser, setListUser] = useState([]);

  const isMobile = useMobile();

  useEffect(() => {
    api
      .fetchSearchUser(userNameSearch)
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListUser(res.data);
        else setListUser([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userNameSearch]);

  const listUserCard = useMemo(
    () =>
      listUser?.map((user, i) => {
        return (
          <UserCard
            key={i}
            _id={user._id}
            name={user.name}
            relationship="Add Friend"
          ></UserCard>
        );
      }),
    [listUser]
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
        {listUserCard.length === 0 ? (
          <NoDataSearch></NoDataSearch>
        ) : (
          listUserCard
        )}
      </div>
    </div>
    // </div>
  );
}

export default SearchUserResult;
