import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export interface BlogPostCardProps {
  id: string;
  img: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  author: {
    img: string;
    name: string;
  };
  image: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  tag,
  title,
  desc,
  date,
  author,
  image,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Link href={`/posts/${id}`}>
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Badge variant="secondary" className="mb-2">
              {tag}
            </Badge>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{desc}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={author.img} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{author.name}</span>
            </div>
            <span className="text-sm text-gray-500">{date}</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BlogPostCard;
