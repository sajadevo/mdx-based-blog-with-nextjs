// @components
import Link from "next/link";

// @utils
import fs from "node:fs";
import matter from "gray-matter";

interface Post {
  title: string;
  description: string;
  slug: string;
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-2xl px-8 py-16">
      <h1 className="text-2xl font-semibold text-black sm:text-4xl">Blog</h1>
      <div className="mt-6 space-y-6">
        {posts.map((post, index) => (
          <Link
            href={post.slug}
            key={index}
            className="block cursor-pointer rounded-xl border border-gray-200 px-5 py-4 hover:bg-gray-200/25"
          >
            <h2 className="mb-2 text-lg font-semibold text-black">
              {post.title}
            </h2>
            <p className="text-balance text-base text-gray-700">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function getBlogPosts() {
  const posts = [];
  const basePath = process.cwd(); // Get the current working directory
  const contentDirectory = fs.readdirSync("content"); // Read the content directory

  // Loop through the content directory and get the content of each mdx file
  for (const post of contentDirectory) {
    const filePath = `${basePath}/content/${post}`; // Get each mdx file path
    const rawContent = await fs.promises.readFile(filePath, "utf-8"); // Read the content of each mdx file

    // Parse the content of each mdx file using gray-matter
    const { data } = matter(rawContent);

    // Push the parsed data to the posts array
    posts.push({
      ...data,
      slug: post.replace(".mdx", ""), // Set a slug of each post based on the file name on the content directory
    });
  }

  return posts as Post[];
}
