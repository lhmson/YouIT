import React from "react";
import COLOR from "../../constants/colors";
import { Typography } from "antd";
import { Box, Container, Row, Column, FooterLink, Heading } from "./styles";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/all";

const { Text } = Typography;

function Footer() {
  return (
    <Box>
      <h1 style={{ color: COLOR.black, textAlign: "center", margin: 80 }}>
        YouIT - social network for programming explorers
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Terms of Services</FooterLink>
            <FooterLink href="#">Privacy & Policies</FooterLink>
          </Column>
          <Column>
            <Heading>What to do</Heading>
            <FooterLink href="#">Sharing</FooterLink>
            <FooterLink href="#">Connecting</FooterLink>
            <FooterLink href="#">Coding</FooterLink>
            <FooterLink href="#">Teaching</FooterLink>
          </Column>
          <Column>
            <Heading>New to us</Heading>
            <FooterLink href="#">Get started</FooterLink>
            <FooterLink href="#">Hot trends</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Numbers</FooterLink>
          </Column>
          <Column>
            <Heading>Contact us</Heading>
            <FooterLink href="#">
              <FaFacebookF />
              <span style={{ marginLeft: "10px" }}>Facebook</span>
            </FooterLink>
            <FooterLink href="#">
              <FaInstagram />
              <span style={{ marginLeft: "10px" }}>Instagram</span>
            </FooterLink>
            <FooterLink href="#">
              <FaTwitter />
              <span style={{ marginLeft: "10px" }}>Twitter</span>
            </FooterLink>
            <FooterLink href="#">
              <FaYoutube />
              <span style={{ marginLeft: "10px" }}>Youtube</span>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <div className="text-center my-5">
        <Text style={{ fontSize: 18 }}>
          Copyright 2021 © Team Hearts Pro{" "}
          <strong>
            <a
              href="https://youit-social-network.netlify.app/"
              style={{ color: COLOR.black }}
            >
              YouIT
            </a>
          </strong>
        </Text>
      </div>
    </Box>
  );
}

export default Footer;
