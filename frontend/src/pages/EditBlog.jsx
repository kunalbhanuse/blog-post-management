import { blogUpdateSchema } from "../schema/updateSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URI = `http://localhost:8000`;
function CreateBlog() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,

        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      };

      const response = await axios.post(`${API_URI}/api/blog`, formattedData);

      console.log(response.data);

      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9fc] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
            <Plus />
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Create New Post
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Fill in the details to publish your blog post
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-sm sm:px-6 md:px-8">
          <h2 className="border-b border-slate-200 pb-4 text-lg font-semibold text-slate-950">
            Basic Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-6">
            {message && (
              <div className="rounded-md bg-green-100 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Title
                </label>
                <Input
                  className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                  type="text"
                  placeholder="Enter post title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Author Name
                </label>
                <Input
                  className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                  type="text"
                  placeholder="Enter author name"
                  {...register("authorName")}
                />
                {errors.authorName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.authorName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-950">
                Email Address
              </label>
              <Input
                className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                type="text"
                placeholder="author@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-5">
              <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold text-slate-950">
                Classification
              </h2>

              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-slate-950">
                    Category
                  </label>
                  <Input
                    className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                    type="text"
                    {...register("category")}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-slate-950">
                    Tags
                  </label>
                  <Input
                    className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                    type="text"
                    placeholder="Comma-separated tags"
                    {...register("tags")}
                  />
                  {errors.tags && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tags.message}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    Separate tags with commas
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Status
                </label>
                <Select
                  className=""
                  onValueChange={(value) => setValue("status", value)}
                >
                  <SelectTrigger className="w-full h-11 rounded-md border-gray-200 text-base shadow-none sm:h-12 ">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold text-slate-950">
                Media
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Thumbnail URL
                </label>
                <Input
                  className="h-11 rounded-md border-slate-200 shadow-none focus-visible:ring-violet-500"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("thumbnail")}
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold text-slate-950">
                Content
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Short Description
                </label>
                <textarea
                  className="min-h-[110px] w-full resize-none rounded-md border border-slate-200 p-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500"
                  placeholder="Brief summary of the post"
                  {...register("shortDescription")}
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-950">
                  Post Content
                </label>
                <textarea
                  className="min-h-[220px] w-full resize-none rounded-md border border-slate-200 p-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500"
                  placeholder="Write your full blog post content here"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-slate-200 px-6 font-medium"
              >
                Cancel
              </Button>

              <Button className="h-11 rounded-md bg-violet-600 px-6 font-medium text-white hover:bg-violet-700">
                Publish Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
