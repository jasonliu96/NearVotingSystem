import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from '@material-ui/icons';
import styled from 'styled-components';
import React, { Fragment } from 'react';

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Fragment>
      <Container>
        <Left>
          <Logo>dAPP</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color='3B5999'>
              <Facebook />
            </SocialIcon>
            <SocialIcon color='E4405F'>
              <Instagram />
            </SocialIcon>
            <SocialIcon color='55ACEE'>
              <Twitter />
            </SocialIcon>
            <SocialIcon color='E60023'>
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Elections</ListItem>
            <ListItem>Meeting Votes</ListItem>
            <ListItem>Features</ListItem>
            <ListItem>Reviews</ListItem>
            <ListItem>Services</ListItem>
            <ListItem>Pricing</ListItem>
            <ListItem>Guide to Electronic Elections</ListItem>
            <ListItem>Voting Systems Explained</ListItem>
            <ListItem>Announcements and Election Notice</ListItem>
            <ListItem>Elections Audit and obervability</ListItem>
            <ListItem>Tips and Tricks: How-to-Run Online Elections</ListItem>
            <ListItem>Combining Board Nominations with Elections</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: '10px' }} /> 1 Washington Sq, San Jose,
            CA 95192
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: '10px' }} /> +1(408) 924-1000
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: '10px' }} /> abc@sjsu.edu
          </ContactItem>
        </Right>
      </Container>
    </Fragment>
  );
};

export default Footer;
