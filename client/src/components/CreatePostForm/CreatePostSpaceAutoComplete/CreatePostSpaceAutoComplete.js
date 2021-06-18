import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserJoinedGroups } from "../../../redux/actions/group.js";

function CreatePostSpaceAutoComplete({
  postSpace,
  setPostSpace,
  onSelectedGroupChange,
  initialGroupId,
  disabled = false,
}) {
  const groups = useSelector((state) => state.groups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);

  const filterGroupsPredicate = (inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  useEffect(() => {
    dispatch(fetchUserJoinedGroups());
  }, []);

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
        style={{ width: "100%" }}
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
