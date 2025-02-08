// @components
import { MDXRemote } from "next-mdx-remote/rsc";

// @utils
import remarkGfm from "remark-gfm";
import fs from "node:fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get the slug from the URL (e.g., /my-first-post)
  const { slug } = await params;

  // Read the content of the MDX file using the readMdxFile function
  const source = await readMdxFile(slug);

  return (
    <div className="mx-auto max-w-2xl px-8 py-16">
      <article className="prose">
        <MDXRemote
          source={source}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </div>
  );
}

async function readMdxFile(slug: string) {
  const basePath = process.cwd(); // Get the current working directory
  const filePath = `${basePath}/content/${slug}.mdx`; // Set the mdx file path

  // Check if the mdx file exists, if not, return a 404 page
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Read the content of the mdx file asynchronously
  const rawContent = await fs.promises.readFile(filePath, "utf-8");

  // Parse the content of the mdx file using gray-matter
  const { content } = matter(rawContent);

  return content;
}
