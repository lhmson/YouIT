import React, { createContext, useMemo, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GroupsOfUserContext = createContext();

function groupsOfUserContext(state, action) {
  switch (action.type) {
    case "UPDATE_LIST_GROUPS": {
      return {
        ...state,
        listGroups: action.payload.newListGroups,
      };
    }
    case "ADD_GROUP":
      const newArr = [action.payload.newGroup, ...state.listGroups];
      return { ...state, listGroups: newArr };
    case "REMOVE_GROUP":
      return {
        ...state,
        listGroups: state.listGroups.filter(
          (item) => item._id !== action.payload.id
        ),
      };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function GroupsOfUserProvider(props) {
  const [user] = useLocalStorage("user");

  const [state, dispatch] = useReducer(groupsOfUserContext, {
    listGroups: [],
  });
  const value = useMemo(() => [state, dispatch], [state]);
  return <GroupsOfUserContext.Provider value={value} {...props} />;
}

function useGroupsOfUser() {
  const context = useContext(GroupsOfUserContext);
  // console.log("conversation", context);
  if (!context) {
    throw new Error(
      "useGroupsOfUser must be used within a GroupsOfUserProvider"
    );
  }

  const [state, dispatch] = context;

  const updateListGroups = (newListGroups) => {
    dispatch({
      type: "UPDATE_LIST_GROUPS",
      payload: { newListGroups },
    });
  };

  const addGroup = (newGroup) => {
    dispatch({
      type: "ADD_GROUP",
      payload: { newGroup },
    });
  };

  const removeGroup = (id) => {
    dispatch({ type: "REMOVE_GROUP", payload: { id } });
  };

  return {
    state,
    addGroup,
    removeGroup,
    updateListGroups,
  };
}

export { GroupsOfUserProvider, useGroupsOfUser };

// export default GroupsOfUserContext;
