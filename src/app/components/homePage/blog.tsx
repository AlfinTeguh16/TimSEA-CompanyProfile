"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";

interface Blog {
  _id: string;
  title: string;
  content: { type: string; value: string }[];
}

const BlogCard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs: Status", res.status);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No blogs available</p>
      </div>
    );
  }

  return (
    <Element name="blog">
      <div>
      <h1 className="px-4 md:px-20 xl:px-20 font-bold text-white text-3xl xl:text-5xl">
        Article
      </h1>
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {blogs.map((blog) => {
            const image = blog.content.find((item) => item.type === "file")?.value;
            const title = blog.title || "Untitled Blog";

            return (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <div className="rounded-[50px] bg-white h-[500px] w-[20rem] overflow-hidden shadow-lg transition-all ease-out duration-500 hover:duration-200 hover:shadow-2xl hover:z-20 hover:scale-105">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={400}
                      height={200}
                      className="w-full h-80 object-cover rounded-t-[50px]"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <div className="px-4 py-4">
                    <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Element>
  );
};

export default BlogCard;
