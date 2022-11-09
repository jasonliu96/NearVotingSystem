import * as React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import PropTypes from 'prop-types';
import { useState } from "react";
import styled from "styled-components"
import { sliderItems } from "../data";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const Container = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    position : relative;
    overflow : hidden;
`;

const Arrow = styled.div`
    width : 50px;
    height : 50px;
    background-color : #fff7f7;
    border-radius : 50%;
    display : flex;
    align-items : center;
    justify-content : center;
    position : absolute;
    top : 0;
    bottom : 0;
    left : ${props => props.direction === "left" && "10px"};
    right : ${props => props.direction === "right" && "10px"};
    margin : auto;
    cursor : pointer;
    opacity : 0.5;
    z-index : 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display : flex;
    transition : all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    align-items : center;
    background-color : #${props => props.bg};
`;

const ImgContainer = styled.div`
    height : 100%;
    flex : 1;
`;

const Image = styled.img`
    padding-left : 5px;
    padding-top : 5px;
    padding-bottom : 5px;
    height : 100%;
    background-color : transparent;
`;

const InfoContainer = styled.div`
    flex : 1;
    padding : 50px;
`;

const Title = styled.h1`
    align-items : center;
    font-size : 70px;
`;

const Desc = styled.p`
    margin : 50px 0px;
    font-size : 20px;
    font-weight : 500;
    letter-spacing : 3px;
`;

const Button = styled.button`
    padding : 10px;
    font-size : 20px;
    background-color : transparent;
    cursor : pointer;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
    },
    '& .MuiDialogActions-root': {
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const Slider = () => {
    // const [slideIndex, setSlideIndex] = useState(0);
    let slideIndex = 0    
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(sliderItems[0]);

    const handleClick = (direction) => {
        if (direction === "left") {
            // setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
            console.log("b4 left:" + slideIndex);
            slideIndex = (slideIndex > 0 ? slideIndex - 1 : 2);
            setItem(sliderItems[slideIndex]);
            console.log("left:" + slideIndex);
        } else {
            // setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
            console.log("b4 right:" + slideIndex);
            slideIndex = (slideIndex < 2 ? slideIndex + 1 : 0);
            setItem(sliderItems[slideIndex]);
            console.log("right:" + slideIndex);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {/* {sliderItems.map((item) => ( */}
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Button onClick={handleClickOpen}>
                            VIEW DETAILS
                        </Button>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                {item.title}
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    {item.modal}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </InfoContainer>
                </Slide>
                {/* ))} */}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider;