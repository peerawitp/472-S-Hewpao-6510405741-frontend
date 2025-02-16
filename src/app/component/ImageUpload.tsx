"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange: (images: File[]) => void;
}

const ImageUpload = ({ maxImages = 15, onImagesChange }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length >= maxImages) {
        alert(`You can upload up to ${maxImages} images.`);
        return;
      }

      // Filter duplicate files
      const newFiles = acceptedFiles

      if (newFiles.length === 0) {
        alert("Duplicate files are not allowed.");
        return;
      }

      const remainingSlots = maxImages - images.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);

      const processedFiles = filesToAdd.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      const updatedImages = [...images, ...processedFiles];

      setImages(updatedImages);
      onImagesChange(updatedImages);
    },
    [images, maxImages, onImagesChange]
  );

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      const updatedImages = prev.filter((_, i) => i !== index);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {images.map((file, index) => (
          <div key={index} className="relative w-[150px] h-[150px] group">
            <div className="absolute inset-0 rounded-md overflow-hidden border border-gray-300">
              <img
                src={file.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-white text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xl hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <div
            {...getRootProps()}
            className="hover:border-blue-500 w-[150px] h-[150px] border-2 border-dashed border-blue0 rounded-md flex flex-col items-center justify-center cursor-pointer p-4 transition-colors"
          >
            <input {...getInputProps()} />
            <svg
              className="w-8 h-8 text-blue-700 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V16M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-gray-700 font-medium text-center">
              Click or Drop images here
            </p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {images.length}/{maxImages} images
      </p>
    </div>
  );
};

export default ImageUpload;
