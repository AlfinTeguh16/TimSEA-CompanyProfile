"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PiTrash } from "react-icons/pi";

interface Content {
  type:
    | "text"
    | "image"
    | "video"
    | "youtube"
    | "link"
    | "header"
    | "subheader"
    | "list"
    | "media-note"
    | "file"
    | "banner";
  value: string | string[];
  file?: File;
}

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Content[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addContent = (type: Content["type"]) => {
    const defaultValue = type === "list" ? [] : "";
    setContent([...content, { type, value: defaultValue }]);
  };

  const handleTextChange = (index: number, value: string) => {
    const updatedContent = [...content];
    updatedContent[index].value = value;
    setContent(updatedContent);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    const updatedContent = [...content];
    updatedContent[index].value = URL.createObjectURL(file);
    updatedContent[index].file = file;
    setContent(updatedContent);
  };

  const handleListChange = (index: number, itemIndex: number, value: string) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value[itemIndex] = value;
      setContent(updatedContent);
    }
  };

  const addListItem = (index: number) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value.push("");
      setContent(updatedContent);
    }
  };

  const removeListItem = (index: number, itemIndex: number) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value.splice(itemIndex, 1);
      setContent(updatedContent);
    }
  };

  const removeContent = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const submitBlog = async () => {
    const formData = new FormData();
    formData.append("title", title);

    content.forEach((item, index) => {
      if (item.file) {
        const key = item.type === "banner" ? "file_banner" : `file_${index}`;
        formData.append(key, item.file);
      } else {
        formData.append(`content_${index}`, JSON.stringify(item));
      }
    });

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Blog created successfully!");
        setTitle("");
        setContent([]);
      } else {
        alert("Failed to create blog.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto h-full">
      <h1 className="text-2xl font-bold mb-4 mt-16">Create Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-xl p-2 w-full mb-4"
      />

      <div>
        {content.map((item, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded-lg shadow-sm flex flex-col gap-4"
          >
            {["text", "header", "subheader", "media-note"].includes(item.type) && (
              <input
                type="text"
                placeholder={`Enter ${item.type}`}
                value={item.value as string}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="border rounded-xl p-2 w-full"
              />
            )}

            {["image", "banner", "video"].includes(item.type) && (
              <div className="flex flex-col">
                <input
                  type="file"
                  accept={item.type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  className="border rounded-xl p-2 w-full"
                />
                {item.value && (
                  <Image
                    src={item.value as string}
                    width={200}
                    height={100}
                    alt="Preview"
                    className="w-fit h-fit rounded-md mt-3"
                  />
                )}
              </div>
            )}

            {item.type === "list" && (
              <div className="flex flex-col gap-2">
                {(item.value as string[]).map((listItem, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={listItem}
                      placeholder={`List item ${itemIndex + 1}`}
                      onChange={(e) =>
                        handleListChange(index, itemIndex, e.target.value)
                      }
                      className="border rounded-xl p-2 w-full"
                    />
                    <button
                      onClick={() => removeListItem(index, itemIndex)}
                      className="bg-red-600 text-white rounded-md px-3 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addListItem(index)}
                  className="bg-blue-600 text-white rounded-full px-4 py-2"
                >
                  Add List Item
                </button>
              </div>
            )}

            <button
              onClick={() => removeContent(index)}
              className="bg-red-600 text-white rounded-md px-4 py-2 self-end"
            >
              <PiTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {["text", "header", "subheader", "image", "banner", "list", "media-note"].map(
          (type) => (
            <button
              key={type}
              onClick={() => addContent(type as Content["type"])}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full px-4 py-2"
            >
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          )
        )}
      </div>

      <button
        onClick={submitBlog}
        className="bg-blue-600 text-white rounded-full px-4 py-3 font-semibold"
      >
        Submit Blog
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreateBlog), { ssr: false });
