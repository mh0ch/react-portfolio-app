import React, { useState, useEffect, useRef } from 'react';
import '../styles/Sila.scss';

const BouncingImage = ({ src, alt }) => {
    const imageRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const velocityRef = useRef({
        vx: (Math.random() - 0.5) * 2, // Speed control
        vy: (Math.random() - 0.5) * 2, // Speed control
    });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const image = imageRef.current;
        if (!image) return;

        const container = image.parentElement;
        if (!container) return;

        let animationFrameId;

        const update = () => {
            // Wait until the image has loaded and has dimensions
            if (!image.clientWidth || !image.clientHeight) {
                animationFrameId = requestAnimationFrame(update);
                return;
            }

            if (!isInitialized) {
                // This runs once to set the initial random position
                const initialX = Math.random() * (container.clientWidth - image.clientWidth);
                const initialY = Math.random() * (container.clientHeight - image.clientHeight);
                setPosition({ x: initialX, y: initialY });
                setIsInitialized(true);
            } else {
                // This runs on every frame after initialization
                setPosition(prevPosition => {
                    let { x, y } = prevPosition;
                    let { vx, vy } = velocityRef.current;

                    // Bounce off walls
                    if (x + vx < 0 || x + vx + image.clientWidth >= container.clientWidth) {
                        vx = -vx;
                    }
                    if (y + vy < 0 || y + vy + image.clientHeight >= container.clientHeight) {
                        vy = -vy;
                    }

                    velocityRef.current = { vx, vy };
                    return { x: x + vx, y: y + vy };
                });
            }
            animationFrameId = requestAnimationFrame(update);
        };

        // Start the animation loop
        animationFrameId = requestAnimationFrame(update);

        // Clean up the loop when the component unmounts
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInitialized]); // Effect now only depends on initialization state

    return (
        <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="sila-image"
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                visibility: isInitialized ? 'visible' : 'hidden' // Hide until positioned
            }}
        />
    );
};


const Sila = () => {
  const containerRef = useRef(null);
  const images = [
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.46 (1).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.46 (2).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.46 (3).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.46.jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.47 (1).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.47 (2).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.47 (3).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.47 (4).jpeg',
    '/hinge/WhatsApp Image 2026-07-09 at 19.17.47.jpeg',
  ];

  useEffect(() => {
    const setHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight * 2}px`;
      }
    };
    
    setHeight();
    window.addEventListener('resize', setHeight);

    return () => window.removeEventListener('resize', setHeight);
  }, []);

  return (
    <div className="sila-container" ref={containerRef}>
      <div className="sila-text-box">
        <p>
          Hey sila, im michael, welcome to my page. I dont have an active instagram, so i made this really quick. Feel free to take a look around and scroll down. I dont wanna expose my number here on the internet, but you can ask my bestie julian on hinge
        </p>
      </div>
      {images.map((image, index) => (
        <BouncingImage
          key={index}
          src={process.env.PUBLIC_URL + image}
          alt={`michi ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Sila;
