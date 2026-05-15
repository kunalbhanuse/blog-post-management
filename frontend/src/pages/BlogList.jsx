import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

function BlogList() {
  let API_URI = `http://localhost:8000`;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalBlogs, setTotalBlogs] = useState(0);

  let limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const startRecord = (page - 1) * limit + 1;

  const endRecord = Math.min(page * limit, totalBlogs);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URI}/api/blogs?page=${page}&limit=${limit}&search=${search}`,
      );

      setBlogs(response.data.data.blogs);
      setTotalPages(response.data.data.pagination.totalPages);
      setTotalBlogs(response.data.data.pagination.totalBlogs);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const handlExportToCsv = async () => {
    window.open(`${API_URI}/api/blogs/export/csv`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URI}/api/blog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f9fc] p-3 box-border sm:p-4 md:p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="border border-gray-200 rounded-lg bg-white flex flex-col gap-4 justify-between items-start px-4 py-5 shadow-sm sm:px-6 sm:py-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
              Blog Post Manager
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Manage and organize your blog posts
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <Button
              className="h-11 w-full flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm px-5 rounded-md transition-colors font-semibold sm:h-12 sm:w-auto"
              onClick={handlExportToCsv}
            >
              <FileDown size={16} />
              Export CSV
            </Button>

            <Button className="h-11 w-full bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-5 rounded-md shadow-sm transition-colors font-semibold sm:h-12 sm:w-auto">
              <Plus size={16} />
              Add Post
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-4 mt-5 p-4 bg-white rounded-lg shadow-sm border border-gray-200 md:mt-6 lg:flex-row lg:items-center">
          <div className="w-full flex-1">
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full h-11 rounded-md border-gray-200 px-4 text-base shadow-none placeholder:text-gray-400 focus-visible:ring-violet-500 sm:h-12"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto">
            <Select className="" onValueChange={(value) => setSearch(value)}>
              <SelectTrigger className="w-full h-11 rounded-md border-gray-200 text-base shadow-none sm:h-12 lg:w-[150px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select className="" onValueChange={(value) => setSearch(value)}>
              <SelectTrigger className="w-full h-11 rounded-md border-gray-200 text-base shadow-none sm:h-12 lg:w-[170px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:mt-6">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-[#f6fbfe] hover:bg-[#f6fbfe] border-gray-200">
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    ID
                  </TableHead>
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    Title
                  </TableHead>
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    Author
                  </TableHead>
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    Category
                  </TableHead>
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    Status
                  </TableHead>
                  <TableHead className="h-14 px-4 font-bold text-gray-950 sm:px-6">
                    Created
                  </TableHead>
                  <TableHead className="h-14 px-4 text-right font-bold text-gray-950 sm:px-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {blogs.map((blog, i) => (
                  <TableRow
                    key={blog._id}
                    className="h-[72px] border-gray-200 even:bg-[#f8fdff] hover:bg-violet-50/40"
                  >
                    <TableCell className="px-4 text-gray-500 sm:px-6">
                      {i + 1}
                    </TableCell>

                    <TableCell className="px-4 font-medium text-gray-950 sm:px-6">
                      {blog.title}
                    </TableCell>

                    <TableCell className="px-4 text-gray-800 sm:px-6">
                      {blog.authorName}
                    </TableCell>

                    <TableCell className="px-4 text-gray-800 sm:px-6">
                      {blog.category}
                    </TableCell>

                    <TableCell className="px-4 sm:px-6">
                      {blog.status === "Published" ? (
                        <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300">
                          Published
                        </Badge>
                      ) : (
                        <Badge className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-300">
                          Draft
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="px-4 text-gray-500 sm:px-6">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="px-4 text-right sm:px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-md hover:bg-gray-100"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/view/${blog._id}`)}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/edit/${blog._id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDelete(blog._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-500">
              Showing {startRecord} to {endRecord} of {totalBlogs} records
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="h-10 rounded-md border-gray-200 bg-white px-4 shadow-sm"
              >
                Prev
              </Button>

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={page === index + 1 ? "default" : "outline"}
                  onClick={() => setPage(index + 1)}
                  className={
                    page === index + 1
                      ? "h-10 w-10 rounded-md bg-violet-600 p-0 font-semibold text-white shadow-sm hover:bg-violet-700"
                      : "h-10 w-10 rounded-md border-gray-200 bg-white p-0 font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                  }
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="h-10 rounded-md border-gray-200 bg-white px-4 shadow-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
