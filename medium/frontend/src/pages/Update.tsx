import { Appbar } from "../component/appbar";
import { Useblog } from "../hooks/cushooks";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../component/base-url";

export const Update = () => {
    const { id } = useParams();
    const { blog, loading: blogLoading } = Useblog({ id });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (blog) {
            setTitle(blog.title); //firest this will set the title
            setContent(blog.content); //second this will set the content
        }
    }, [blog]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            await axios.put(
                `${base_url}/api/v1/blog/${id}`,
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate(`/blog/${id}`);
        } catch (err) {
            console.error("Failed to update post:", err);
            setError("Failed to update post. Please Update your blog.");
        } finally {
            setLoading(false);
        }
    };

    if (blogLoading) {
        return (
            <div>
                <Appbar write="yes" />
                <div className="mt-4 flex justify-center">
                    <div className="animate-pulse space-y-4 w-full max-w-screen-lg px-4">
                        <div className="h-16 bg-gray-200 rounded-lg w-full"></div>
                        <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar write="yes" />
            <div className="mt-4 flex justify-center w-full">
                <div className="max-w-screen-lg w-full px-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            id="title"
                            rows={2}
                            className="w-full h-16 text-3xl px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="Title"
                            value={title} //this will sprade the title
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        
                        <div className="w-full bg-white">
                            <div className="px-4 py-2">
                                <textarea
                                    id="editor"
                                    rows={15}
                                    className="w-full h-64 text-xl text-gray-800 p-4 focus:outline-none resize-none"
                                    placeholder="Write your story..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">
                              {error}  
                            </div>
                        )}

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate(`/blog/${id}`)}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}; 