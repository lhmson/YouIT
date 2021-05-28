import React, { useRef } from "react";
import { Button, Typography, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FriendMangementPage from "../../../pages/FriendMangementPage/FriendMangementPage";
import styles from "./styles.js";
import UserCard from "../../UserCard/UserCard.js";
import COLOR from "../../../constants/colors.js";

const { Text, Title } = Typography;
const { Search } = Input;

const FriendManager = () => {
  const inputRef = useRef();
  return <FriendMangementPage></FriendMangementPage>;
};

export default FriendManager;
