/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/rich-text-editor";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import Image from "next/image";

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (data: BlogPost) => void;
}

interface BlogPost {
  id?: string;
  image: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  author: {
    img: string;
    name: string;
  };
  content: string;
  powerBiEmbed?: string;
  min_read?: number;
}

export function BlogPostForm({ post, onSubmit }: BlogPostFormProps) {
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm<BlogPost>({
    defaultValues: post || {
      image: "",
      tag: "",
      title: "",
      desc: "",
      date: new Date().toISOString().split("T")[0],
      author: {
        img: "",
        name: "",
      },
      content: "",
      min_read: 0,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "blog_images"
        );
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        setValue("image", data.secure_url);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
      setUploading(false);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (post?.id) {
        await updateDoc(doc(db, "posts", post.id), data);
        toast.success("Post updated successfully");
      } else {
        await addDoc(collection(db, "posts"), data);
        toast.success("Post created successfully");
      }
      onSubmit(data);
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="image">Cover Image</Label>
        <Input type="file" onChange={handleImageUpload} accept="image/*" />
        {uploading && <p>Uploading...</p>}
        {post?.image && (
          <Image
            src={post.image}
            alt="Post"
            className="mt-2 h-32 w-32 object-cover"
            width={30}
            height={30}
          />
        )}
      </div>
      <div>
        <Label htmlFor="tag">Tag</Label>
        <Input id="tag" {...register("tag", { required: true })} />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} />
      </div>
      <div>
        <Label htmlFor="desc">Description</Label>
        <Textarea id="desc" {...register("desc", { required: true })} />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          {...register("date", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="authorName">Author Name</Label>
        <Input
          id="authorName"
          {...register("author.name", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="authorImg">Author Image URL</Label>
        <Input id="authorImg" {...register("author.img", { required: true })} />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor content={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      <div>
        <Label htmlFor="min_read">How many minutes read?</Label>
        <Input id="min_read" {...register("min_read")} />
      </div>
      <div>
        <Label htmlFor="powerBiEmbed">Power BI Embed URL (optional)</Label>
        <Input id="powerBiEmbed" {...register("powerBiEmbed")} />
      </div>
      <Button type="submit">Save Post</Button>
    </form>
  );
}
