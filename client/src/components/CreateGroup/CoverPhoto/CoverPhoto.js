import { Button, Image, Layout } from "antd";
import React from "react";
import styles from "./styles.js";

function CoverPhoto() {
  return (
    <>
      <Layout
        style={{
          position: "relative",
          height: "40vh",
          marginBottom: 32,
        }}
      >
        <Image
          src="https://marketingweek.imgix.net/content/uploads/2015/03/Digital_tech_breaker.png?auto=compress,format&q=60&w=980&h=400"
          style={{
            maxHeight: "40vh",
            width: "100%",
            objectFit: "cover",
            height: "auto",
            display: "block",
          }}
        ></Image>
      </Layout>
    </>
  );
}

export default CoverPhoto;
