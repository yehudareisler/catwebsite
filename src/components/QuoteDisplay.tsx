import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface QuoteDisplayProps {
  generatedText: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ generatedText }) => (
  <Row className="my-4">
    <Col>
      <h4>{generatedText}</h4>
    </Col>
  </Row>
);

export default QuoteDisplay;
