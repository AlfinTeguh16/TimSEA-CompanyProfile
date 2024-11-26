"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Content {
  type: "text" | "video" | "youtube" | "link" | "file" | "header" | "list";
  value: string | string[];
}

interface Blog {
  title: string;
  content: Content[];
}

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();

          // Filter content to exclude blobs
          const filteredContent = data.content.filter((item: Content) => {
            if (item.type === "list" && Array.isArray(item.value)) {
              return true; // Keep valid lists
            }
            return (
              typeof item.value === "string" &&
              !item.value.startsWith("blob:") // Exclude blobs
            );
          });

          setBlog({ ...data, content: filteredContent });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-16">
      <h1 className="text-xl md:text-5xl w-full flex justify-center mx-auto font-bold mb-6">
        {blog.title}
      </h1>
      <div className="space-y-6">
        {blog.content.map((item, index) => (
          <div key={index} className="mb-4">
            {item.type === "text" && (
              <p className="w-full text-justify">{item.value}</p>
            )}

            {item.type === "header" && (
              <h1 className="w-full text-justify text-2xl font-bold">
                {item.value}
              </h1>
            )}

            {item.type === "file" && typeof item.value === "string" && (
              <Image
                src={item.value}
                width={500}
                height={300}
                alt={`Image ${index}`}
                className="rounded-md flex justify-center mx-auto w-full"
              />
            )}

            {item.type === "video" && typeof item.value === "string" && (
              <video
                controls
                className="w-full rounded-md flex justify-center mx-auto"
              >
                <source src={item.value} type="video/mp4" />
              </video>
            )}

            {item.type === "youtube" && typeof item.value === "string" && (
              <iframe
                src={`https://www.youtube.com/embed/${new URL(item.value).searchParams.get(
                  "v"
                )}`}
                className="w-full h-64 rounded-md"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}

            {item.type === "link" && typeof item.value === "string" && (
              <a
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {item.value}
              </a>
            )}

            {item.type === "list" && Array.isArray(item.value) && (
              <ul className="list-disc pl-5 space-y-2">
                {item.value.map((listItem, listIndex) => (
                  <li key={listIndex} className="text-justify">
                    {listItem}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
