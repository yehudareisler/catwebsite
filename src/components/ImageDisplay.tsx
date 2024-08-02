import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageDisplay.css';

interface ImageDisplayProps {
  generatedImage: string | null;
  generatedText: string;
  carouselItems: string[];
  isGenerated: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImage, generatedText, carouselItems, isGenerated }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  const quotes = ["quote1", "quote2", "quote3"]; // Add more quotes if needed

  return (
    <>
      {isGenerated ? (
        <div className="generated-image-container">
          <img className="d-block w-100 generated-image" src={generatedImage!} alt="Generated Image" />
        </div>
      ) : (
        <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100 carousel-image" src={item} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <div className="quote-display">
        <h4>{isGenerated ? generatedText : quotes[activeIndex]}</h4>
      </div>
    </>
  );
};

export default ImageDisplay;
