"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PiTrash } from "react-icons/pi";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

interface Content {
  type: "text" | "image" | "video" | "youtube" | "link" | "header" | "list" | "file";
  value: string | string[];
  file?: File;
}

const EditBlog: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchWithAuth(`/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const addContent = (type: Content["type"]) => {
    const newContent =
      type === "list" ? { type, value: [] } : { type, value: "" };
    setContent([...content, newContent]);
  };

  const handleTextChange = (
    index: number,
    value: string,
    type: Content["type"]
  ) => {
    const updatedContent = [...content];
    if (type === "text") {
      updatedContent[index].value = value;
    }
    setContent(updatedContent);
  };
  
  
  

  const handleListChange = (
    index: number,
    value: string,
    itemIndex: number
  ) => {
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

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    const updatedContent = [...content];
    updatedContent[index].value = URL.createObjectURL(file);
    updatedContent[index].file = file;
    setContent(updatedContent);
  };

  const removeContent = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const submitEdit = async () => {
    try {
      // Siapkan data JSON untuk dikirim ke backend
      const payload = {
        title,
        content,
      };
  
      const response = await fetchWithAuth(`/api/blogs/${id}`, {
        method: "PUT", // Sesuaikan dengan metode di backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Blog updated successfully!");
        router.push(`/blogs/${id}`);
      } else {
        // Tangani error dari respons
        const error = await response.json();
        console.error("Error:", error);
        alert(error?.message || "Failed to update blog.");
      }
    } catch (error) {
      // Tangani error jaringan atau masalah lainnya
      console.error("Error submitting blog:", error);
      alert("An error occurred.");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto h-full">
      <h1 className="text-2xl font-bold mb-4 mt-16">Edit Blog</h1>

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
            {item.type === "text" && (
              <textarea
                placeholder="Enter text"
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
                placeholder="Enter header text"
                value={item.value as string}
                onChange={(e) =>
                  handleTextChange(index, e.target.value, item.type)
                }
                className="border font-bold rounded-xl p-2 w-full"
              />
            )}
            {item.type === "list" && (
              <div className="flex flex-col gap-4 w-full">
                {(item.value as string[]).map((listItem, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={listItem}
                      onChange={(e) =>
                        handleListChange(index, e.target.value, itemIndex)
                      }
                      className="border rounded-xl p-2 w-full"
                    />
                    <button
                      onClick={() => removeListItem(index, itemIndex)}
                      className="bg-red-600 hover:bg-red-700 w-fit text-white rounded-md p-3"
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
                    className="bg-red-600 hover:bg-red-700 w-fit text-white rounded-xl p-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            {item.type === "file" && (
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
            <button
              onClick={() => removeContent(index)}
              className="bg-red-600 hover:bg-red-700 w-fit rounded-xl text-white p-3"
            >
              <PiTrash />
            </button>
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
      </div>

      <button
        onClick={submitEdit}
        className="mt-4 bg-blue-600 rounded-full text-white px-4 py-3  font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EditBlog), { ssr: false });
