import React, { useRef, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './TextInput.css'; // Import the CSS file

interface TextInputProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  generatedImage: string | null;
  generatedText: string;
}

const TextInput: React.FC<TextInputProps> = ({ text, onTextChange, onGenerate, generatedImage, generatedText }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      if (textAreaRef.current.scrollHeight > 5 * 20) { // 5 rows with a line height of 20px
        textAreaRef.current.style.height = `${5 * 20}px`;
        textAreaRef.current.style.overflowY = 'auto';
      } else {
        textAreaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [text]);

  const shareImage = () => {
    if (navigator.share && generatedImage) {
      fetch(generatedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'image.png', { type: blob.type });
          navigator.share({
            title: 'Check out this image!',
            files: [file],
          }).catch(error => console.error('Error sharing image:', error));
        });
    } else {
      console.log('Web Share API not supported or image not generated.');
    }
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this quote!',
        text: generatedText,
      }).catch(error => console.error('Error sharing quote:', error));
    } else {
      console.log('Web Share API not supported.');
    }
  };

  return (
    <Row className="my-4">
      <div className="text-input-container">
        <div className="textarea-wrapper">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Enter text"
            value={text}
            onChange={onTextChange}
            ref={textAreaRef}
            style={{ resize: 'none', maxHeight: '100px', lineHeight: '20px' }}
          />
          <div className="d-flex justify-content-center mt-2">
            <Button size="lg" onClick={onGenerate}>Generate</Button>
          </div>
        </div>
        <div className="buttons-wrapper">
          <Button size="sm" className="mb-2" onClick={shareImage}>Share Image</Button>
          <Button size="sm" onClick={shareQuote}>Share Quote</Button>
        </div>
      </div>
    </Row>
  );
};

export default TextInput;
