import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import ImageDisplay from './components/ImageDisplay';
import TextInput from './components/TextInput';
import cat1 from './images/cat1.jpg';
import cat2 from './images/cat2.jpg';
import cat3 from './images/cat3.jpg';
import { generateImageWithCaption } from './imageUtils';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [carouselItems, setCarouselItems] = useState<string[]>([cat1, cat2, cat3]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(cat1);
  const [generatedText, setGeneratedText] = useState<string>('quote1');  // Initialize with the first quote
  const [isGenerated, setIsGenerated] = useState<boolean>(false);  // State to check if image is generated

  useEffect(() => {
    // Update the generated image and text based on the active carousel item
    if (!isGenerated) {
      setGeneratedImage(carouselItems[0]);
      setGeneratedText('quote1');
    }
  }, [carouselItems, isGenerated]);

  const handleGenerate = async () => {
    const newText = `"${text}" -meow`; // Set the generated text to be the input text surrounded by quotes and appended with -meow
    try {
      const newImageSrc = await generateImageWithCaption(cat1, newText); // Use cat1 as a placeholder for generated image
      setGeneratedImage(newImageSrc);
      setGeneratedText(newText);
      setIsGenerated(true);  // Set the state to true to show the generated image
    } catch (error) {
      console.error('Error generating image with caption:', error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleHeaderClick = () => {
    setIsGenerated(false);  // Reset the state to false to show the carousel
  };

  return (
    <Container>
      <Header onHeaderClick={handleHeaderClick} />
      <ImageDisplay
        generatedImage={generatedImage}
        generatedText={generatedText}
        carouselItems={carouselItems}
        isGenerated={isGenerated}
      />
      <TextInput
        text={text}
        onTextChange={handleTextChange}
        onGenerate={handleGenerate}
        generatedImage={generatedImage}
        generatedText={generatedText}
      />
    </Container>
  );
};

export default App;
