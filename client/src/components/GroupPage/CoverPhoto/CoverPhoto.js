import { Button, Image, Layout, message } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.js";

import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { convertFileToBase64 } from "../../../utils/image.js";
import * as apiGroup from "../../../api/group";
import { isOwner } from "../../../utils/user.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import Loading from "../../Loading/Loading.js";

function CoverPhoto() {
  const { group } = useContext(GroupContext);
  const [user, setUser] = useLocalStorage("user");

  const [background, setBackground] = useState(group?.backgroundUrl);
  const [loadingBackground, setLoadingBackground] = useState(false);

  useEffect(() => {
    setBackground(group?.backgroundUrl);
  }, [group]);

  const hiddenBackgroundInput = useRef(null);

  const handleBackgroundChange = async (e) => {
    setLoadingBackground(true);
    const fileUploaded = e.target.files[0];
    const base64 = await convertFileToBase64(fileUploaded);

    const updatedGroup = {
      ...group,
      backgroundUrl: base64,
    };
    await apiGroup.updateGroup(updatedGroup).then((res) => {
      setLoadingBackground(false);
      setBackground(res.data?.backgroundUrl);
    });
  };

  const handleEditBackground = () => {
    hiddenBackgroundInput.current.click();
  };
  console.log(loadingBackground);
  return (
    <div style={{ position: "relative" }}>
      <Layout
        style={{
          position: "relative",
          height: "40vh",
          marginBottom: 32,
        }}
      >
        {loadingBackground ? (
          <div style={{ alignSelf: "center", justifySelf: "center" }}>
            <Loading />
          </div>
        ) : (
          <Image
            src={background}
            style={{
              maxHeight: "40vh",
              width: "100%",
              objectFit: "cover",
              height: "auto",
              display: "block",
            }}
            onError={(error) => message.error(error)}
          ></Image>
        )}
        {isOwner(user, group) ? (
          <div>
            <Button
              className="green-button"
              style={styles.editImageBtn}
              onClick={handleEditBackground}
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
