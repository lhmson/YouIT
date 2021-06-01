import React, { useState, useEffect, useMemo } from "react";
import UserCard from "../../../components/UserCard/UserCard";
import * as api from "../../../api/search";
import ErrorPage from "../../../pages/ErrorPage/ErrorPage";

function SearchUserResult({ userNameSearch }) {
  const [listUser, setListUser] = useState([]);

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
            _id={user._id}
            name={user.name}
            relationship="Add Friend"
          ></UserCard>
        );
      }),
    [listUser]
  );

  return (
    <div className="col-12">
      <div
        className="row"
        style={{
          paddingTop: 16,
          paddingLeft: 32,
        }}
      >
        <div className="col-12">
          {listUserCard.length === 0 ? (
            <ErrorPage code={404}></ErrorPage>
          ) : (
            listUserCard
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUserResult;
