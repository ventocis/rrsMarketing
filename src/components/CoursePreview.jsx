import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

export default function CoursePreview({ slug }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Check if images exist for this slug
    const checkImages = async () => {
      const imageUrls = [];
      let imageIndex = 1;
      
      // Check for images 01.jpg, 02.jpg, 03.jpg, etc. or SVG equivalents
      while (imageIndex <= 5) { // Limit to 5 images
        const jpgUrl = `/assets/course-previews/${slug}/${imageIndex.toString().padStart(2, '0')}.jpg`;
        const svgUrl = `/assets/course-previews/${slug}/${imageIndex.toString().padStart(2, '0')}.svg`;
        
        try {
          // Try JPG first, then SVG as fallback
          let response = await fetch(jpgUrl, { method: 'HEAD' });
          if (response.ok) {
            imageUrls.push(jpgUrl);
          } else {
            // Try SVG
            response = await fetch(svgUrl, { method: 'HEAD' });
            if (response.ok) {
              imageUrls.push(svgUrl);
            } else {
              break; // Stop if neither exists
            }
          }
        } catch (error) {
          // Silently continue on error - don't crash the component
          break;
        }
        imageIndex++;
      }
      
      setImages(imageUrls);
    };

    if (slug) {
      checkImages().catch(error => {
        // Prevent any uncaught promise rejections
        setImages([]);
      });
    }
  }, [slug]);

  // Reset currentImage when images change
  useEffect(() => {
    if (images.length > 0 && currentImage >= images.length) {
      setCurrentImage(0);
    }
  }, [images]); // Removed currentImage to prevent infinite loop

  // Don't render if no images exist
  if (images.length === 0) {
    return null;
  }

  // Extra safety check - ensure we have a valid image URL
  if (!images[currentImage] || typeof images[currentImage] !== 'string') {
    return null;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mt-12 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Course preview</h2>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
        <div className="relative">
          {/* Image area with fixed aspect ratio */}
          <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[currentImage] || ''}
              alt={`Course preview ${currentImage + 1} of ${images.length}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <Button
              size="sm"
              color="light"
              onClick={prevImage}
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              size="sm"
              color="light"
              onClick={nextImage}
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Dot indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImage ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Image counter */}
        <div className="text-center mt-2 text-sm text-gray-500">
          {currentImage + 1} of {images.length}
        </div>
      </div>
    </section>
  );
}
