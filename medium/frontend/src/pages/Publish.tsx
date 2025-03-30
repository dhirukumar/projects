import { Appbar } from "../component/appbar";
import { useCreatePost } from "../hooks/cushooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { createPost, loading, error } = useCreatePost();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost({ title, content });
            navigate("/blog");
        } catch (err) {
            console.error("Failed to create post:", err);
        }
    };

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
                            value={title}
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

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Publishing..." : "Publish"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
