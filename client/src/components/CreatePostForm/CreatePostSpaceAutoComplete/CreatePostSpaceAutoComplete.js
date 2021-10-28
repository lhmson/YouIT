import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import createPostStyle from "../styles.js";
import { useGroupsOfUser } from "../../../context/GroupsOfUserContext.js";

function CreatePostSpaceAutoComplete({
  postSpace,
  setPostSpace,
  onSelectedGroupChange,
  initialGroupId,
  disabled = false,
}) {
  const groups = useGroupsOfUser().state.listGroups;
  // const groups = useSelector((state) => state.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [options, setOptions] = useState([]);

  const filterGroupsPredicate = (inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  // useEffect(() => {
  //   dispatch(fetchUserJoinedGroups());
  // }, []);

  useEffect(() => {
    if (!groups) setOptions([]);
    else
      setOptions(
        groups.map((g) => ({
          value: g.name,
          data: g,
        }))
      );
  }, [groups]);

  useEffect(() => {
    if (!selectedGroup && initialGroupId) {
      const toBeSelectedGroup = groups.find((g) => g._id === initialGroupId);
      setSelectedGroup(toBeSelectedGroup);
      setPostSpace(toBeSelectedGroup?.name);
    }
  }, [groups, initialGroupId]);

  const handlePostSpaceChange = (value) => {
    setSelectedGroup(null);
    setPostSpace(value);
  };

  useEffect(() => {
    onSelectedGroupChange(selectedGroup);
  }, [selectedGroup, onSelectedGroupChange]);

  const handlePostSpaceSelect = (value, { data }) => {
    setSelectedGroup(data);
  };

  const isValid = () => selectedGroup || !postSpace;

  return (
    <div>
      <AutoComplete
        className={isValid() ? "green" : "red"}
        options={options}
        dropdownStyle={createPostStyle.editorFont}
        style={{ width: "100%", ...createPostStyle.editorFont }}
        placeholder="My wall"
        filterOption={filterGroupsPredicate}
        value={postSpace}
        onChange={handlePostSpaceChange}
        onSelect={handlePostSpaceSelect}
        disabled={disabled}
      />
    </div>
  );
}

export default CreatePostSpaceAutoComplete;
