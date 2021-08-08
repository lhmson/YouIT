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
      >
        <p className="boldhover feature-text mr-5 no-wrap">{title}</p>
      </div>
    );
  };

  const HashTagsSelection = () => {
    return (
      <div>
        <div style={{ height: 40 }} />
        <div
          style={{
            flex: 1,
            height: 100,
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
        <div className="main-container">
          <section className="section">
            <img
              alt="youit background"
              src="https://i.ibb.co/KhP9yq3/programming.png"
              className="background-img"
            />
            <div className="avoid-nav pt-4 pt-lg-0 d-lg-flex intro-section text-center text-lg-left align-items-center">
              <div>
                <Text className="slogan">YouIT, share our</Text>
                <br />
                <RotatingText
                  style={{
                    fontWeight: "bold",
                    fontSize: "max(2rem,4vw)",
                    color: COLOR.green,
                  }}
                  deletingInterval={16}
                  items={[
                    "programming skills",
                    "tiny bugs",
                    "coding experience",
                  ]}
                />
                <br />
                <div className="mt-4" />
                <Text className="intro-desc">
                  Hello world! YouIT is more than just a website. Our goal is to
                  build a strong and ever - growing geeks community.
                </Text>
                <br />
                <div className="mt-4 mb-4 mb-lg-0">
                  <Button
                    className="green-button mr-4"
                    size="large"
                    onClick={() =>
                      history.push("/group/60d08c234088f200159fc6db/main")
                    }
                  >
                    Interview preparation
                  </Button>

                  <Button
                    className="green-button"
                    size="large"
                    onClick={() =>
                      history.push("/group/60d0c3b380bc9b4f44217c30/main")
                    }
                  >
                    Hello World
                  </Button>
                </div>
              </div>
              <div className="video-container">
                <iframe
                  className="video "
                  src="https://streamable.com/e/h799qa?autoplay=1"
                  frameborder="0"
                  width="100%"
                  height="100%"
                  allowfullscreen
                  // allow="autoplay"
                ></iframe>
              </div>
            </div>
          </section>
          <section className="section bg-white justify-content-center">
            <div className=" container d-lg-flex flex-lg-row-reverse col-gap justify-content-center align-items-center  text-center text-lg-left">
              <div className="pic-container " data-aos="zoom-in">
                <img
                  className="pic shadow-lg"
                  alt="youit conversation"
                  src="https://i.ibb.co/ByKHNZd/getconnected.jpg"
                />
              </div>
              <div
                className=" d-flex flex-column justify-content-center"
                data-aos="fade-up"
              >
                <p className="feature-heading mt-4 mb-0">
                  Connect to the programming world
                </p>
                <br />
                <p className="feature-text ">
                  Easily reach out to other coders and seek new companions.
                </p>
              </div>
            </div>
          </section>

          <section className="section bg-team justify-content-center ">
            <div className="d-lg-flex  col-gap align-items-center container text-center text-lg-left">
              <div className="pic-container" data-aos="fade-right">
                <img
                  className="pic shadow-lg"
                  alt="youit share post"
                  src="https://i.ibb.co/bWpRkNt/sharepost.png"
                />
              </div>
              <div
                className=" d-flex flex-column justify-content-center col-lg-5 "
                data-aos="fade-up"
              >
                <p className="feature-heading mt-4 mb-0">Keep up-to-date</p>
                <br />
                <p className="feature-text ">
                  Quickly catch up with trendy technologies coming everyday and
                  expand your knowledge.
                </p>
              </div>
            </div>
          </section>

          <section className="section bg-white justify-content-center">
            <div className=" container row justify-content-center align-items-center flex-lg-row-reverse  text-left">
              <div
                className="pic-container col-lg-7  flex-grow-1"
                data-aos="zoom-out"
              >
                {/* <img
                  className="pic act1"
                  alt="youit group"
                  src="https://i.ibb.co/QKFYSHm/group.png"
                /> */}
                <img
                  className="pic act2 shadow-lg"
                  alt="youit chart"
                  src="https://i.ibb.co/JRnddv6/chart.jpg"
                />
                <img
                  className="pic act3 shadow-lg"
                  alt="youit maths"
                  src="https://i.ibb.co/HNhjzbB/maths.jpg"
                />
                <img
                  className="pic act1"
                  alt="youit maths"
                  src="https://i.ibb.co/m5R7NMK/Untitled-4.png"
                />
              </div>
              <div
                className="col-lg-5 d-flex flex-column justify-content-center align-items-center align-items-lg-start "
                data-aos="fade-up"
              >
                <p className="feature-heading mt-4 mb-0">Many activities</p>
                <br />
                <ul className=" d-none d-lg-block feature-text">
                  <li>Create group</li>
                  <li>Play with the editor</li>
                  <li>Host a code contest</li>
                  <li>And more...</li>
                </ul>
                <p className="d-block d-lg-none feature-text text-center">
                  Create group, play with the editor, host a code contest, and
                  more...
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white">
            <div className="container">
              {loadingAll ? (
                <HashTagsSelection />
              ) : (
                <div>
                  <LoadingSearch />
                </div>
              )}
            </div>
          </section>
        </div>

        <Footer />
      </Layout>
    </>
  );
}

export default HomePage;
