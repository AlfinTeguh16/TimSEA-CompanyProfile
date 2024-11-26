"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: { type: string; value: string }[];
}

const BlogCard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (blogs.length === 0) {
    return <div className="hidden">No blogs available</div>;
  }

  return (
    <>
      <h1 className="px-4 md:px-20 xl:px-20 font-bold text-white text-3xl xl:text-5xl">
        Blog
      </h1>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const image = blog.content.find((item) => item.type === "file")?.value;
            const text = blog.content.find((item) => item.type === "text")?.value || "";

            return (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <div className="rounded-[50px] bg-white h-[500px] w-[20rem] overflow-hidden">
                  {image ? (
                    <Image
                      src={image}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-[50px]"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <div>
                    <div className="p-4">
                        <h2 className="text-lg md:text-xl font-bold">{blog.title}</h2>
                    </div>
                    <div className="p-4 flex bottom-0">
                        <p>{truncateText(text, 200)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogCard;
