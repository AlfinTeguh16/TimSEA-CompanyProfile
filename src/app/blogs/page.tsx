"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PiTrash } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  const deleteBlog = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } else {
        const error = await response.json();
        alert(`Failed to delete blog: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs found</div>;
  }

  return (
    <div className="p-4 pt-16 md:pt-20">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <Link href={`/blogs/create`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-row">
          <FiEdit3 className="size-5 mr-3"/> <p>Create Blog</p>
        </button>
      </Link>
      <div>
        {blogs.map((blog) => (
          <div key={blog._id} className="mb-4 flex items-center justify-between">
            <div
              className="flex cursor-pointer font-semibold hover:underline my-2 p-4 border rounded-xl w-full"
              onClick={() => router.push(`/blogs/${blog._id}`)}>
              {blog.title}
            </div>

            <div className="flex gap-2 px-2">
              <Link href={`/blogs/${blog._id}/edit`}>
                <button className="bg-slate-600 hover:bg-slate-700 text-white p-4 rounded-lg">
                  <FaRegEdit/>
                </button>
              </Link>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg">
                <PiTrash/>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BlogList;
