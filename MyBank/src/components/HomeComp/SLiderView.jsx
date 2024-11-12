import React from "react";
import Slider from "react-slick";
import { Box, Stack, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import Image2 from "../../assets/img1.jpg";
import Image1 from "../../assets/img2.jpg";
import Image3 from "../../assets/img3.jpg";
import Image4 from "../../assets/img4.jpg";
import Image5 from "../../assets/img5.jpg";
import Image6 from "../../assets/img6.jpg";
import { ArrowLeft, ArrowRight } from "phosphor-react";

const Images_labels = [
  { id: 2, img: Image2, label: "Achieve more life goals with BPI" },
  { id: 1, img: Image1, label: "Holidays are more festive with BPI" },
  {
    id: 3,
    img: Image3,
    label: "Buils a brighter future with sustainable banking choices",
  },
  { id: 4, img: Image4, label: "Get more out of life with BPI Rewards Cards" },
  { id: 5, img: Image5, label: "Mas magandang bukas, saan man sa mundo" },
  { id: 6, img: Image6, label: "Experience more with the BPI app" },
];

const SLiderView = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable auto sliding
        autoplaySpeed: 3000, // Set auto slide speed (in milliseconds)
        arrows: true, // Show arrows
        nextArrow: <SampleNextArrow />, // Custom next arrow
        prevArrow: <SamplePrevArrow />, // Custom previous arrow
      };
  return (
    <>
 {/* <Box sx={{ position: "relative", width: "100%", overflow: "hidden" ,clipPath: "polygon(0 87%, 100% 98%, 100% 0, 0% 0)"}}>
      <Slider {...settings}>
        {Images_labels.map((item) => (
          <Box key={item.id} sx={{ position: "relative", }}>
            <img
              src={item.img}
              alt={item.label}
              style={{ width: "100%", display: "block", borderRadius: "0px 0px 100px 0px", }}
            />
            <Stack
              sx={{
                position: "absolute",
                right: "18%",
                top: "42%",
                transform: "translateY(-50%)",
                textAlign: "left", // Change to left to align text
                width: "50%", // Fixed width for labels
                maxWidth: "540px", // Optional: limit max width
                whiteSpace: "normal", // Allow wrapping
                overflow: "hidden", // Hide overflow
                textOverflow: "ellipsis", // Ellipsis for overflow text
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "39px", // Reduced font size for better wrapping
                  lineHeight: "39px",
                }}
              >
                {item.label}
              </Typography>
              <Box display={"flex"} justifyContent={"flex-start"} sx={{ marginTop: 2 }}>
                <Button
                component={Link}
                to='/maintain'
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#b11116",
                    borderRadius: "4px",
                    fontSize: "16px",
                    lineHeight: "20px",
                    padding: "12px",
                  }}
                  endIcon={<ArrowRight />}
                >
                  LEARN MORE
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
      </Slider>
      <style>
        {`
          .slick-prev:before, .slick-next:before {
            content: ''; 
            font-size: 0;
          }
       `}
      </style>
    </Box> */}


    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" ,clipPath: "polygon(0 87%, 100% 98%, 100% 0, 0% 0)"}}>
    <Slider {...settings}>
      {Images_labels.map((item) => (
        <Box key={item.id} sx={{ position: "relative", }}>
          <img
            src={item.img}
            alt={item.label}
            style={{ width: "100%", display: "block", borderRadius: "0px 0px 100px 0px", }}
          />
          <Stack
            sx={{
              position: "absolute",
              right:isMediumScreen ? '5%' : "18%",
              top: "42%",
              transform: "translateY(-50%)",
              textAlign: "left", // Change to left to align text
              width: isMediumScreen ? "58%" :"50%", // Fixed width for labels
              maxWidth: isMediumScreen ? '350px' :"740px", // Optional: limit max width
              maxWidth: isSmallScreen ? '190px' :"340px", 
              maxWidth: isLargeScreen ? '190px' :"340px", 
              whiteSpace: "normal", // Allow wrapping
              overflow: "hidden", // Hide overflow
              textOverflow: "ellipsis", // Ellipsis for overflow text
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                // padding: "8px",
                paddingX:isMediumScreen ? '2px' : '8px',
                paddingY:isMediumScreen ? '2px' : '8px',
                borderRadius: "4px",
                fontSize: isMediumScreen ? '14px' : "39px", // Reduced font size for better wrapping
                fontSize: isLargeScreen ? '12px' : "39px", // Reduced font size for better wrapping
                lineHeight: isMediumScreen ? '14px' : "39px",
              }}
            >
              {item.label}
            </Typography>
            <Box display={"flex"} justifyContent={"flex-start"} sx={{ marginTop: 2 }}>
              <Button
              component={Link}
              to='/maintain'
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#b11116",
                  borderRadius: "4px",
                  fontSize: isMediumScreen ? "9px" : "16px",
                  fontSize: isLargeScreen ? "8px" : "16px",
                  lineHeight: "20px",
                  padding:isMediumScreen ? '5px' : "12px",
                  padding:isLargeScreen ? '3px' : "10px",
                }}
                endIcon={<ArrowRight style={{fontSize:isMediumScreen ? '10px' : ""}} />}
              >
                LEARN MORE
              </Button>
            </Box>
          </Stack>
        </Box>
      ))}
    </Slider>
    <style>
      {`
        .slick-prev:before, .slick-next:before {
          content: ''; /* remove default icons */
          font-size: 0; /* remove any size conflicts */
        }
      `}
    </style>
  </Box>
    </>
  );
};

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          background: "#fff", // Button background color
          borderRadius: "4px", // Circular button
          position: "absolute",
          right: "10px", // Position on the right
          top: "45%",
          transform: "translateY(-55%)",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ArrowRight size={28} color="#b11116" />
      </div>
    );
  };
  
  // Custom Previous Arrow Component
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          background: "#fff", // Button background color
          borderRadius: "4px", // Circular button
          position: "absolute",
          left: "10px", // Position on the left
          top: "45%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ArrowLeft size={24} color="#b11116" />
      </div>
    );
  };

export default SLiderView;
