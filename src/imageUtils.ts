export const generateImageWithCaption = (imageSrc: string, caption: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
  
      image.onload = () => {
        const canvasWidth = image.width;
        const canvasHeight = image.height;
  
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
  
        if (context) {
          // Draw the image onto the canvas
          context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          
          // Set the text properties
          context.fillStyle = 'white';
          context.font = 'bold 30px Arial';
          context.textAlign = 'center';
          
          // Split the caption into multiple lines if necessary
          const lines = caption.split('\n');
          const lineHeight = 40; // Adjust the line height as needed
          const yStart = canvasHeight / 2 - (lines.length - 1) * lineHeight / 2; // Center the text vertically
  
          lines.forEach((line, index) => {
            context.fillText(line, canvasWidth / 2, yStart + index * lineHeight);
          });
  
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject('Canvas context is not available');
        }
      };
  
      image.onerror = () => {
        reject('Image failed to load');
      };
  
      image.src = imageSrc;
    });
  };
  