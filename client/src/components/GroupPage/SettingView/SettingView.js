import React, { useContext, useState } from "react";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import EditableText from "../../UserInfo/AboutCard/OverviewPane/EditableText/EditableText.js";
import styles from "./styles.js";
import * as apiGroup from "../../../api/group";
import EditableCombobox from "../../UserInfo/AboutCard/OverviewPane/EditableCombobox/EditableCombobox.js";
import { GrGroup, MdDescription, MdPublic } from "react-icons/all";

const SettingView = () => {
  const { group, setGroup } = useContext(GroupContext);

  const [groupName, setGroupName] = useState(group?.name);
  const [description, setDescription] = useState(group?.description);
  const [privacy, setPrivacy] = useState(group?.privacy);

  const privacyOptions = [
    {
      value: "Public",
      label: "Public",
    },
    {
      value: "Private",
      label: "Private",
    },
  ];

  const saveGroupName = async () => {
    const updatedGroup = {
      ...group,
      name: groupName,
    };

    const { data } = await apiGroup.updateGroup(updatedGroup);
    console.log(data);
    setGroup(data);
  };

  const saveDescription = async () => {
    const updatedGroup = {
      ...group,
      description: description,
    };

    const { data } = await apiGroup.updateGroup(updatedGroup);
    console.log(data);
    setGroup(data);
  };

  const savePrivacy = async () => {
    const updatedGroup = {
      ...group,
      privacy: privacy,
    };

    const { data } = await apiGroup.updateGroup(updatedGroup);
    console.log(data);
    setGroup(data);
  };

  return (
    <div
      style={{
        background: "white",
        margin: 64,
        padding: 16,
      }}
    >
      <EditableText
        firstIcon={<GrGroup style={styles.icon} />}
        text={group?.name}
        subText="Group Name"
        placeholder="Group name"
        onChange={(value) => setGroupName(value.target.value)}
        onSave={saveGroupName}
        editable={true}
        setPreviousState={() => {}}
      />
      <EditableText
        firstIcon={<MdDescription style={styles.icon} />}
        text={group?.description}
        subText="Group description"
        placeholder="Group description"
        onChange={(value) => setDescription(value.target.value)}
        onSave={saveDescription}
        editable={true}
        setPreviousState={() => {}}
      />
      <EditableCombobox
        firstIcon={<MdPublic style={styles.icon} />}
        text={group?.privacy}
        subText="Group privacy"
        placeholder="Group privacy"
        options={privacyOptions}
        onSave={savePrivacy}
        onChange={(value) => {
          setPrivacy(value[0]);
        }}
        setPreviousState={() => {}}
        editable={true}
      />
    </div>
  );
};

export default SettingView;
