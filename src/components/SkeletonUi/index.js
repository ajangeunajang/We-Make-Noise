"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function SkeletonUi({ src, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="filmcover">
      {!imageLoaded && <div className="skeleton" />}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="film-image"
        data-loaded={imageLoaded}
        onLoadingComplete={() => setImageLoaded(true)}
      />
    </div>
  );
}