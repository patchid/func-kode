"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("blogs")
        .select("id, slug, title, excerpt, image, author, date")
        .order("date", { ascending: false });
      setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-4 mb-8">
        <span className="inline-block animate-bounce">
          <Image src="/landing/logo.png" alt="Raccoon Mascot" width={48} height={48} />
        </span>
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white text-center">func(Kode) Blog</h1>
        <p className="text-brand-green text-center">Tips, stories, and guides for coders and creators.</p>
      </div>
      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-muted-foreground">No blogs found.</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.slug} className="bg-white dark:bg-card rounded-lg shadow border border-border p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Image src={blog.image || "/landing/logo.png"} alt={blog.title} width={40} height={40} className="rounded-full" />
                <div>
                  <h2 className="text-xl font-semibold text-brand-blue dark:text-white">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground">By {blog.author} • {blog.date}</p>
                </div>
              </div>
              <p className="text-foreground mt-2">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`} className="text-brand-green hover:underline text-sm font-semibold mt-2 self-end">Read more →</Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}