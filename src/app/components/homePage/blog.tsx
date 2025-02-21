"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineSwipeLeft } from "react-icons/md";
import "swiper/css";
import axios from "axios";

// 🛠️ BASE_URL untuk gambar
const BASE_URL = "http://127.0.0.1:8120/storage/";

// 🛠️ Interface untuk Blog
interface BlogContent {
  type: string;
  value: string;
}

interface Blog {
  _id: string;
  title: string;
  content: BlogContent[];
  banner: string;
}

// 🛠️ Custom Hook untuk Fetch Data
const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8120/api/articles", {
          headers: { Accept: "application/json" },
        });

        if (res.status !== 200) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = res.data;
        console.log("Fetched articles:", data);

        if (data.success && Array.isArray(data.data.data)) {
          setBlogs(data.data.data);
        } else {
          throw new Error("Invalid data format received from API.");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

const BlogCard: React.FC = () => {
  const { blogs, loading, error } = useFetchBlogs();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">No blogs available</p>
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

      {/* Swiper Section */}
      <div className="p-6 max-w-7xl mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogs.map((blog) => {
            const image = blog.banner ? `${BASE_URL}${blog.banner}` : null;
            const title = blog.title || "Untitled Blog";

            return (
              <SwiperSlide key={blog._id} className="p-4">
                <Link href={`/blogs/${blog._id}`} passHref>
                  <div className="md:hidden rounded-[35px] bg-white h-[550px] w-full overflow-hidden shadow-lg transition-transform ease-out duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl">
                    {image ? (
                      <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={200}
                        unoptimized={true}
                        className="w-full h-[400px] object-cover rounded-t-3xl"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                      </div>
                    )}
                    <div className="px-4 py-4">
                      <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <p className="text-white md:hidden flex w-full justify-center align-middle my-auto pt-4 opacity-50">
          Swipe <MdOutlineSwipeLeft className="text-xl font-bold" />
        </p>
      </div>

      {/* Grid Section */}
      <div className="p-6 max-w-7xl mx-auto hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => {
            const image = blog.banner ? `${BASE_URL}${blog.banner}` : null;
            const title = blog.title || "Untitled Blog";

            return (
              <Link href={`/blogs/${blog._id}`} key={blog._id} passHref>
                <div className="rounded-[35px] bg-white h-[550px] w-full overflow-hidden shadow-lg transition-transform ease-out duration-300 hover:scale-105 hover:shadow-2xl">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={400}
                      height={200}
                      unoptimized={true}
                      className="w-full h-[400px] object-cover rounded-t-3xl"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <div className="px-4 py-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
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