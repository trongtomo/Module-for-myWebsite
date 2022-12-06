import React from "react";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <MDXRemote {...post.content} />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/blog-posts");
  const posts = await res.json();

  const paths = posts.data.map((post) => {
    return { params: { slug: post.attributes.urlSlug } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/blog-posts/${params.slug}`
  );
  const posts = await res.json();
  return {
    props: { post },
  };
}
