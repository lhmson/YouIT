import { Button, Image, Layout } from "antd";
import React from "react";
import styles from "./styles.js";

function CoverPhoto() {
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
          src="https://vnn-imgs-f.vgcloud.vn/2020/09/07/15/.jpg"
          style={{
            maxHeight: "40vh",
            width: "100%",
            objectFit: "cover",
            height: "auto",
            display: "block",
          }}
        ></Image>
        <Button className="green-button" style={styles.editImageBtn}>
          Edit cover photo
        </Button>
      </Layout>
    </div>
  );
}

export default CoverPhoto;
