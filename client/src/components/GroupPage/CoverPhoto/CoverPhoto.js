import { Button, Image, Layout } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.js";

import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { convertFileToBase64 } from "../../../utils/image.js";
import * as apiGroup from "../../../api/group";
import { isOwner } from "../../../utils/user.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

function CoverPhoto() {
  const { group } = useContext(GroupContext);
  const [user, setUser] = useLocalStorage("user");

  const [background, setBackground] = useState(group?.backgroundUrl);

  useEffect(() => {
    setBackground(group?.backgroundUrl);
  }, [group]);

  const hiddenBackgroundInput = useRef(null);

  const handleBackgroundChange = async (e) => {
    const fileUploaded = e.target.files[0];
    const base64 = await convertFileToBase64(fileUploaded);

    const updatedGroup = {
      ...group,
      backgroundUrl: base64,
    };
    const { data } = await apiGroup.updateGroup(updatedGroup);
    console.log(data);
    setBackground(data.backgroundUrl);
  };

  return (
    <div style={{ position: "relative" }}>
      <Layout
        style={{
          position: "relative",
          height: "40vh",
          marginBottom: 32,
        }}
      >
        <Image
          src={background}
          style={{
            maxHeight: "40vh",
            width: "100%",
            objectFit: "cover",
            height: "auto",
            display: "block",
          }}
        ></Image>
        {isOwner(user, group) ? (
          <div>
            <Button
              className="green-button"
              style={styles.editImageBtn}
              onClick={() => hiddenBackgroundInput.current.click()}
            >
              Edit cover photo
            </Button>
            <input
              type="file"
              ref={hiddenBackgroundInput}
              style={{ display: "none" }}
              onChange={handleBackgroundChange}
            ></input>
          </div>
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
}

export default CoverPhoto;
