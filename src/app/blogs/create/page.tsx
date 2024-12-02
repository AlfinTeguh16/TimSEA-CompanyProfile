"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PiTrash } from "react-icons/pi";
import { fetchWithAuth } from "../../utils/fetchWithAuth"; // Sesuaikan path sesuai struktur project

interface Content {
  type: "text" | "image" | "video" | "youtube" | "link" | "header" | "subheader" | "list" | "media-note" | "file" | "banner";
  value: string | string[]; // List menggunakan array string
  file?: File;
}

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>(""); // Blog title
  const [content, setContent] = useState<Content[]>([]); // Blog content array
  const [isClient, setIsClient] = useState(false); // Hydration guard

  useEffect(() => {
    setIsClient(true); // Ensure this is only executed on the client
  }, []);

  // Adding new field
  const addContent = (type: Content["type"]) => {
    if (type === "list") {
      setContent([...content, { type, value: [] }]); // Default value for list is an empty array
    } else {
      setContent([...content, { type, value: "" }]);
    }
  };

  const handleTextChange = (
    index: number,
    value: string,
    type: Content["type"]
  ) => {
    const updatedContent = [...content];

    if (type === "text") {
      // Split text into paragraphs
      const paragraphs = value.split("\n").filter((line) => line.trim() !== "");
      updatedContent.splice(
        index,
        1,
        ...paragraphs.map((p) => ({ type: "text" as const, value: p }))
      );
    } else {
      // Update directly for other types
      updatedContent[index].value = value;
    }

    setContent(updatedContent);
  };

  // Handle list changes
  const handleListChange = (index: number, value: string, itemIndex: number) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value[itemIndex] = value; // Update specific list item
      setContent(updatedContent);
    }
  };

  const addListItem = (index: number) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value.push(""); // Add new empty list item
      setContent(updatedContent);
    }
  };

  const removeListItem = (index: number, itemIndex: number) => {
    const updatedContent = [...content];
    if (Array.isArray(updatedContent[index].value)) {
      updatedContent[index].value.splice(itemIndex, 1); // Remove specific list item
      setContent(updatedContent);
    }
  };

  // Handle file upload
  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    const updatedContent = [...content];
    updatedContent[index].value = URL.createObjectURL(file); // Generate preview URL
    updatedContent[index].file = file; // Save file for submission
    setContent(updatedContent);
  };

  // Remove content field
  const removeContent = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  // Submit data


  const submitBlog = async () => {
    const formData = new FormData();
    formData.append("title", title);

    content.forEach((item, index) => {
      if (item.file) {
        formData.append(`file_${index}`, item.file);
      }
      formData.append(
        `content_${index}`,
        JSON.stringify({ type: item.type, value: item.value })
      );
    });

    try {
      const response = await fetchWithAuth("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Blog created successfully!");
        setTitle("");
        setContent([]);
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Failed to create blog.");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred.");
    }
  };


  if (!isClient) {
    return null; // Ensure SSR mismatch is avoided
  }

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
            className="mb-4 border p-4 rounded-lg shadow-sm flex flex-col gap-4">
            {item.type === "text" && (
              <textarea
                placeholder="Enter text (use Enter for new paragraph)"
                value={item.value as string}
                onChange={(e) =>
                  handleTextChange(index, e.target.value, item.type)
                }
                className="border rounded-xl p-2 w-full"
              />
            )}
            {item.type === "header" && (
              <input
                type="text"
                placeholder="Enter text header"
                value={item.value as string}
                onChange={(e) =>
                  handleTextChange(index, e.target.value, item.type)
                }
                className="border font-bold rounded-xl p-2 w-full"
              />
            )}
            {item.type === "subheader" && (
              <input
                type="text"
                placeholder="Enter text subheader"
                value={item.value as string}
                onChange={(e) =>
                  handleTextChange(index, e.target.value, item.type)
                }
                className="border font-semibold rounded-xl p-2 w-full"
              />
            )}
            {item.type === "media-note" && (
              <input
                type="text"
                placeholder="Enter text media-note"
                value={item.value as string}
                onChange={(e) =>
                  handleTextChange(index, e.target.value, item.type)
                }
                className="border font-semibold rounded-xl p-2 w-full"
              />
            )}
            {item.type === "list" && (
              <div className="flex flex-col gap-4 w-full">
                {(item.value as string[]).map((listItem, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={listItem}
                      placeholder={`List item ${itemIndex + 1}`}
                      onChange={(e) =>
                        handleListChange(index, e.target.value, itemIndex)
                      }
                      className="border rounded-xl p-2 w-full"
                    />
                    <button
                      onClick={() => removeListItem(index, itemIndex)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => addListItem(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
                  >
                    Add List Item
                  </button>
                  <button
                    onClick={() => removeContent(index)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {item.type === "banner" && (
              <div className="flex flex-col">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files?.[0] || null)
                  }
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

            {item.type === "image" && (
              <div className="flex flex-col">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files?.[0] || null)
                  }
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
            {item.type === "video" && (
              <div className="flex flex-col">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files?.[0] || null)
                  }
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
            {item.type !== "list" && (
              <button
                onClick={() => removeContent(index)}
                className="bg-red-600 hover:bg-red-700 rounded-xl mx-1 h-fit w-fit my-auto text-white p-4"
              >
                <PiTrash />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => addContent("text")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Text
        </button>
        <button
          onClick={() => addContent("header")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Header
        </button>
        <button
          onClick={() => addContent("subheader")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add SubHeader
        </button>
        <button
          onClick={() => addContent("image")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Image
        </button>
        <button
          onClick={() => addContent("video")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Video
        </button>
        <button
          onClick={() => addContent("media-note")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Media Note
        </button>
        <button
          onClick={() => addContent("youtube")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add YouTube Link
        </button>
        <button
          onClick={() => addContent("link")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add URL Link
        </button>
        <button
          onClick={() => addContent("list")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add List
        </button>
        <button
          onClick={() => addContent("banner")}
          className="bg-transparent border rounded-full hover:bg-blue-500 text-gray-600 hover:text-white px-4 py-2"
        >
          Add Banner
        </button>
      </div>

      <button
        onClick={submitBlog}
        className="mt-4 bg-blue-600 rounded-full text-white px-4 py-3 font-semibold"
      >
        Submit Blog
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreateBlog), { ssr: false });
