import React from "react";
import axios from "axios";
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
  const res = await axios.get("http://localhost:1337/api/blog-posts");
  const posts = await res.data.data;
  const paths = posts.map((post) => {
    return { params: { id: post.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `http://localhost:1337/api/blog-posts/${params.id}`
  );
  const posts = await res.data.data;
  const html = await serialize(posts.attributes.content);
  return {
    props: {
      post: {
        title: posts.attributes.title,
        content: html,
      },
    },
  };
}
