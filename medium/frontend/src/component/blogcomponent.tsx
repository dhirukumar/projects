import { Link } from "react-router-dom";

export const Blogcomponent = ({name, date, title, content, id}: BlogcomponentProps) => {
    return (
        // from here the id of each blog is passed to the blog component
        <Link to={`/blog/${id}`}>
            <div className="p-6 mb-4 border rounded-lg hover:shadow-lg transition-shadow duration-200 max-w-4xl cursor-pointer">
                <div className="flex items-center space-x-2 mb-4">
                    <Avatar name={name} />
                    <div className="font-medium">{name}</div>
                    <div className="text-slate-500">· {date}</div>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                    {title}
                </h2>

                <div className="text-gray-600 mb-4">
                    {content.slice(0, 100) + "..."}
                </div>

                <div className="text-sm text-slate-400">
                    {`${Math.ceil(content.length/100)} min read`}
                </div>
            </div>
        </Link>
    );
};

export type BlogcomponentProps = {
    id: string;
    name: string;
    date: string;
    title: string;
    content: string;
}

export function Avatar({name, size="small"}: {name: string, size?: "max"|"small"}) {
    const ssizes = size === "max" ? "h-12 w-12" : "h-8 w-8";
    return (
        <div className={`relative inline-flex items-center justify-center ${ssizes} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
    );
}