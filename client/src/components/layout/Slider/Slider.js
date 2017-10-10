import React, { Component } from 'react';

import {
  Carousel,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
  Container,
} from 'mdbreact';

const Slider = () => (
  <div className="text-center">
    <Carousel activeItem={1} length={3} showControls showIndicators={false} className="z-depth-1">
      <CarouselInner>
        <CarouselItem itemId="1">
          <View>
            <img className="d-block w-100" src="https://imgur.com/JNaMVZ5.jpg" alt="theMamaClub" />
            <Mask overlay="black-light" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive">Visit Mama Stop</h3>
            <p>
              Get updates on your baby's development, decode your pregnancy symptoms and meet up
              with other moms.
            </p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem itemId="2">
          <View>
            <img className="d-block w-100" src="https://imgur.com/ZO8cbP1.jpg" alt="Second slide" />
            <Mask overlay="black-strong" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive">GET CONSULTING</h3>
            <p>Want to ask out moms things you don't know?</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem itemId="3">
          <View>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/Yrsxv8o.jpg"
              alt="Third slide"
            />
            <Mask overlay="black-slight" />
          </View>
          <CarouselCaption>
            <h3 className="h3-responsive">MAMA's RESTAURANT</h3>
            <p>Enjoy delicious cake and drinks</p>
          </CarouselCaption>
        </CarouselItem>
      </CarouselInner>
    </Carousel>
  </div>
);

export default Slider;
