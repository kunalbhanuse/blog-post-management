import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CalendarDays, User2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const API_URI = import.meta.env.VITE_API_URL;

function ViewBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/blog/${id}`);
      setBlog(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f9fc]">
        <p className="text-slate-500 text-lg">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f9fc]">
        <p className="text-red-500 text-lg">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f9fc] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Back Button */}
        <Link to="/">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-slate-200 bg-white"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="h-[250px] w-full object-cover sm:h-[350px]"
          />

          <div className="space-y-5 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                {blog.category}
              </Badge>

              {blog.status === "Published" ? (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Published
                </Badge>
              ) : (
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Draft
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              {blog.title}
            </h1>

            <p className="text-base leading-7 text-slate-600">
              {blog.shortDescription}
            </p>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-2">
                <User2 size={16} />
                <span>{blog.authorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div>
                <span>{blog.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Tag size={18} className="text-violet-600" />
            <h2 className="text-lg font-semibold text-slate-950">Tags</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {blog.tags?.map((tag, index) => (
              <Badge
                key={index}
                className="rounded-full bg-slate-100 px-4 py-1 text-slate-700 hover:bg-slate-100"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-950">
            Blog Content
          </h2>

          <div className="whitespace-pre-line text-[16px] leading-8 text-slate-700">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
