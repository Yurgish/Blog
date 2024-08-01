import { addHashtags } from "../../utils/post.utils";

interface TagsProps {
    tags: string[];
}

const Tags = ({ tags }: TagsProps) => {
    return (
        <div className="flex gap-2">
            {tags &&
                addHashtags(tags).map((tag, index) => (
                    <div
                        key={index}
                        className="text-green text-sm border-green border px-[18px] py-1 rounded-full max-md:text-xs"
                    >
                        {tag}
                    </div>
                ))}
        </div>
    );
};

export default Tags;
