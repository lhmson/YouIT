import { Button, Image, Layout } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.js";

import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { convertFileToBase64 } from "../../../utils/image.js";
import * as apiGroup from "../../../api/group";

function CoverPhoto() {
  const { group } = useContext(GroupContext);
  const [background, setBackground] = useState(
    group?.backgroundUrl ?? "https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
  );

  useEffect(() => {
    setBackground(
      group?.backgroundUrl ?? "https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
    );

    console.log("thy dang iu", group?.backgroundUrl);
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
      </Layout>
    </div>
  );
}

export default CoverPhoto;
