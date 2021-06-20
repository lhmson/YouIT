import React, { useState, useEffect } from "react";
import { Layout, Button, Typography } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import HorizontalScroll from "react-scroll-horizontal";
import AOS from "aos";
import "aos/dist/aos.css";

const { Title, Text } = Typography;

const BigTag = () => {
  return (
    <Text className="boldhover" style={{ fontSize: 40, marginRight: 32 }}>
      javascript
    </Text>
  );
};

const pagePadding = 148;
function HomePage() {
  const [user] = useLocalStorage("user");

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ marginTop: 128, padding: 24, alignItems: "center" }}>
          <div className="row" style={{ marginBottom: 100 }}>
            <div
              className="col-md-6 align-items-center justify-content-center"
              style={{
                paddingLeft: pagePadding,
              }}
            >
              <Text
                style={{
                  fontSize: 60,
                  fontWeight: "bolder",
                  marginBottom: 0,
                  padding: 0,
                }}
              >
                YouIT, share our
              </Text>
              <br />
              <Text style={{ fontSize: 60, fontWeight: "bolder" }}>
                programming skills
              </Text>
              <br />
              <div className="mt-4" />
              <Text style={{ fontSize: 24 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </Text>
              <br />
              <div className="row ml-1 mt-5">
                <Button className="green-button mr-4" size="large">
                  Interview preparation
                </Button>
                <Button className="green-button" size="large">
                  Interview preparation
                </Button>
              </div>
            </div>
            <div
              className="col-md-6"
              style={{
                alignItems: "stretch",
                justifyContent: "stretch",
                paddingRight: pagePadding,
              }}
            >
              <div className="pink" style={{ flex: 1, height: 480 }} />
            </div>
          </div>
          <div
            style={{
              marginBottom: 100,
              marginLeft: pagePadding * 2,
              marginRight: pagePadding * 2,
            }}
          >
            <div data-aos="zoom-in">
              <div className="pink" style={{ height: 400 }} />
            </div>
            <div style={{ height: 24 }} />

            <div data-aos="fade-up" style={{ textAlign: "center" }}>
              <Text strong style={{ fontSize: 40 }}>
                Something 1
              </Text>
              <br />
              <div style={{ height: 16 }} />
              <Text style={{ fontSize: 24 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </Text>
            </div>
          </div>

          <div
            data-aos="fade-right"
            className="row"
            style={{
              alignItems: "center",
              paddingLeft: pagePadding - 16,
              paddingRight: pagePadding - 16,
              marginBottom: 100,
            }}
          >
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <Text strong style={{ fontSize: 40 }}>
                Something 2
              </Text>
              <br />
              <div style={{ height: 16 }} />

              <Text style={{ fontSize: 24 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </Text>
            </div>
            <div
              data-aos="flip-left"
              className="col-md-6"
              style={{ textAlign: "left" }}
            >
              <div className="pink" style={{ height: 400 }} />
            </div>
          </div>
          <div
            className="row"
            style={{
              alignItems: "center",
              paddingLeft: pagePadding - 16,
              paddingRight: pagePadding - 16,
              marginBottom: 100,
            }}
          >
            <div data-aos="flip-right" className="col-md-6">
              <div className="pink" style={{ height: 400 }} />
            </div>
            <div
              data-aos="fade-left"
              className="col-md-6"
              style={{ textAlign: "left" }}
            >
              <Text strong style={{ fontSize: 40 }}>
                Something 3
              </Text>
              <br />
              <div style={{ height: 16 }} />

              <Text style={{ fontSize: 24 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </Text>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              height: 68,
              marginLeft: pagePadding * 2 - 16,
              marginRight: pagePadding * 2 - 16,
              marginBottom: 50,
            }}
          >
            <HorizontalScroll>
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
              <BigTag />
            </HorizontalScroll>
          </div>

          <div
            style={{
              height: 68,
              marginLeft: pagePadding * 2 - 16,
              marginRight: pagePadding * 2 - 16,
              textAlign: "center",
            }}
          >
            <div
              data-aos="zoom-in-up"
              style={{
                height: 400,
                marginBottom: 32,
                backgroundColor: "white",
                flex: 1,
              }}
            />
            <Title className="boldhover">Explore this tag</Title>
            <div style={{ height: 200 }} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePage;
