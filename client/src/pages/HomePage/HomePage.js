import React, { useState, useEffect } from "react";
import { Layout, Button, Image, Typography } from "antd";
import styles from "./styles.js";
import RotatingText from "react-rotating-text";

import Navbar from "../../components/Navbar/Navbar";

import Footer from "../../components/Footer/Footer";

import { Link, useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import HorizontalScroll from "react-scroll-horizontal";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import * as apiHashtag from "../../api/hashtag";
import * as apiSearch from "../../api/search";
import FeedPost from "../../components/Posts/FeedPosts/FeedPost/FeedPost";
import LoadingSearch from "../../components/Loading/LoadingSearch";
import { useMobile } from "../../utils/responsiveQuery";
import COLOR from "../../constants/colors.js";

const { Title, Text } = Typography;
const pagePadding = 148;
function HomePage() {
  const [user] = useLocalStorage("user");
  const [hashtags, setHashtags] = useState([]);
  const isMobile = useMobile();
  const history = useHistory();

  const [listPostsOfTags, setListPostsOfTags] = useState({});
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const fetchAllDataOfTags = async () => {
    let tempData = {};
    let tempTags = [];
    for (let i = 0; i < hashtags.length; i++) {
      const { data } = await apiSearch.fetchSearchPostByTag(hashtags[i].name);
      tempData[hashtags[i].name] = data;
      if (data.length >= 1)
        tempTags.push({ name: hashtags[i].name, _id: hashtags[i]._id });
    }
    setHashtags(tempTags);
    setListPostsOfTags(tempData);
    setLoadingAll(true);
    setSelectedTag(tempTags[0].name);
  };
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    setLoadingTags(false);
    apiHashtag
      .fetchHashtagsTop(20)
      .then((res) => {
        setHashtags(res.data);
        setLoadingTags(true);
      })
      .catch((error) => {
        alert("Cannot get hashtags of system");
        console.log("Error when getting top hashtags", error);
      });
  }, []);

  useEffect(() => {
    if (hashtags.length !== 0 && loadingTags) fetchAllDataOfTags();
  }, [loadingTags]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const github = urlParams.get("github");
    if (github === "true") {
      const token = urlParams.get("token");
      const name = urlParams.get("name");
      const _id = urlParams.get("id");
      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          result: {
            name,
            _id,
          },
        })
      );
    }
  }, []);

  const BigTag = ({ title }) => {
    return (
      <div
        onMouseEnter={() => {
          if (!listPostsOfTags || !title) return;
          setSelectedTag(title);
          console.log("selected", title);
        }}
        // style={{ background: "red" }}
      >
        <Text
          className="boldhover"
          style={{ fontSize: isMobile ? 14 : 40, marginRight: 32 }}
        >
          {title}
        </Text>
      </div>
    );
  };

  const HashTagsSelection = () => {
    return (
      <div>
        <div
          style={{
            flex: 1,
            height: 68,
            marginBottom: 50,
          }}
        >
          <HorizontalScroll>
            {hashtags.map((item) => (
              <BigTag key={item._id} title={item.name} />
            ))}
          </HorizontalScroll>
        </div>

        <div
          style={{
            // height: 68,
            textAlign: "center",
          }}
        >
          <div
            data-aos="zoom-in-up"
            style={{
              marginBottom: 32,
              backgroundColor: "white",
            }}
          >
            {listPostsOfTags[selectedTag]?.map((post, i) => {
              return <FeedPost key={post._id} post={post}></FeedPost>;
            })}
          </div>
          {/* <Title className="boldhover">Explore this tag</Title> */}
          <div style={{ height: 200 }} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Layout>
        <Navbar />
        <div
          className="main"
          style={{ marginTop: 64, padding: 24, alignItems: "center" }}
        >
          <div className="row" style={{ marginBottom: 100 }}>
            <img
              style={{ position: "absolute", right: 100, opacity: 0.4 }}
              alt="bg-home"
              src="https://lh3.google.com/u/1/d/1WQ1JClChA69tfaRwMlAI6oXX1KKfo0JR=w1920-h870-iv1"
            />
            <div
              className="col-lg-6 align-items-center justify-content-center"
              // style={{ zIndex: 1 }}
            >
              <Text
                style={{
                  fontSize: isMobile ? 30 : 60,
                  fontWeight: "bolder",
                  marginBottom: 0,
                  padding: 0,
                  paddingLeft: isMobile ? 64 : 0,
                }}
              >
                YouIT, share our
              </Text>
              <br />
              {/* <Text style={{ fontSize: 60, fontWeight: "bolder" }}>
                programming skills
              </Text> */}
              <RotatingText
                style={{
                  fontWeight: 500,
                  fontSize: "2.5rem",
                  color: COLOR.green,
                }}
                deletingInterval={16}
                items={["programming skills", "tiny bugs", "code experience"]}
              />
              <br />
              <div className="mt-4" />
              <Text style={{ fontSize: 24 }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </Text>
              <br />
              <div className="row ml-1 mt-5 mb-5">
                <Button
                  className="green-button mr-4"
                  size="large"
                  style={{
                    fontFamily: "Consolas",
                    fontSize: isMobile ? 12 : 18,
                  }}
                  onClick={() =>
                    history.push("/group/60d08c234088f200159fc6db/main")
                  }
                >
                  Interview preparation
                </Button>

                <Button
                  className="green-button"
                  size="large"
                  style={{
                    fontFamily: "Consolas",
                    fontSize: isMobile ? 12 : 18,
                  }}
                  onClick={() =>
                    history.push("/group/60d0c3b380bc9b4f44217c30/main")
                  }
                >
                  Hello World
                </Button>
              </div>
            </div>
            {/* <div
              className="col-lg-6"
              style={{
                alignItems: "stretch",
                justifyContent: "stretch",
              }}
            >
              <div style={{ flex: 1, height: 480 }}> */}

            {/* </div>
            </div> */}
          </div>
          <div
            style={{
              marginBottom: 100,
            }}
          >
            <div data-aos="zoom-in">
              <div
                style={{
                  display: "flex",
                  height: isMobile ? 300 : 600,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ height: "100%" }}
                  alt="bg-connect"
                  src="https://lh3.googleusercontent.com/fife/AAWUweVuX0JVVDZ_ZQAbYkX0MsfVsuLQ_QC0Mkn5cu3HDEfcXEGYdDRBZhcueinL29kCLL1WR6NXQRdydqDHEESqfN7ksMc7G-c1-YMkOecfkcr84KEpnDCe0L4uEEKvlPlBfPbS2ZfApleT08GKb0rnw5FDtkltgN6azvSi1683nNCgc0Nd8l7HKamn9cMEH2rmo03AdmhkruZRSopGFi5dHAr_KmsHNrzYqCnLA-pyqEV8ECuMVE8g51u9mBQT25AT8CpG7xqus_Fht5v0e0FMu4LzCMXlNW0wLZKpvIFJ92LAP1u7bQr0weR7Y4JmDFPkC8QTcF4Fa_akBSthdop1PDb98zm1a9a1ASktFjJzHNKwyX0fRvUkqTTjcuUNXpzKNvuv7d1xaRd8gINRusEBxqkkVj8BrZ1s7gyR7UC-tjojR49tKFsxZi2zlfW77JsLw7cavk4GiXFSPTt-MQgsKZK3nAIOUF_uBEGPi_U68LzMnvhc-UXPhU6lNUUZxVxuraLB1JsjVKFdjeStWGBaHqDbBp7Ih8Ky9iGilZnlt9HiBXEisaCZk8fDOODkzw2NB2wRlF6yYt3buFdTpNwcrl-vwXxap__VLK4rFe0Xkzct-0qpzJ160NJwW0puXBW92N4_ypi4QcylU8L0PKXvywIydVqXw4FLOVFFJUVyAYWb2C_Pq6_kJ9p_05LkHtd3be02FC4Z3ZNAv-YuEqidIogib1ftWEcNBz0=w1920-h942-ft"
                />
              </div>
            </div>
            <div style={{ height: 24 }} />

            <div data-aos="fade-up" style={{ textAlign: "center" }}>
              <Text strong style={{ fontSize: 40 }}>
                Connect to the programming world
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
              marginBottom: 100,
            }}
          >
            <div className="col-lg-6 mb-4" style={{ textAlign: "left" }}>
              <Text strong style={{ fontSize: 40 }}>
                Keep up-to-date
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
              className="col-lg-6"
              style={{ textAlign: "left" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    height: isMobile ? 270 : 400,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ height: "100%" }}
                    alt="bg-share"
                    src="https://lh3.google.com/u/1/d/1X2SKAo8AH2PpQG7HWnBySYccJptLFtaD=w1920-h870-iv1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            <div data-aos="flip-right" className="col-lg-6 mb-4">
              <div>
                <div
                  style={{
                    display: "flex",
                    height: isMobile ? 180 : 400,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ height: "100%" }}
                    alt="bg-group"
                    src="https://lh3.google.com/u/1/d/1vPhZ8hGJauL4X7EKmKJIkac11qatYsry=w1330-h870-iv2"
                  />
                </div>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="col-lg-5 offset-1"
              style={{ textAlign: "left", paddingLeft: isMobile ? 0 : 90 }}
            >
              <Text strong style={{ fontSize: 40 }}>
                Share experiences
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
          {loadingAll ? (
            <HashTagsSelection />
          ) : (
            <div style={{ marginBottom: 18 }}>
              <LoadingSearch />
            </div>
          )}
        </div>
        {!isMobile ? <Footer /> : null}
      </Layout>
    </>
  );
}

export default HomePage;
