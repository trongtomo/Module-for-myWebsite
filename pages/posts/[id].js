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

  const paths = res.data.data.map((post) => {
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
  const html = await serialize(res.data.data.attributes.content);
  return {
    props: {
      post: {
        title: res.data.data.attributes.title,
        content: html,
      },
    },
  };
}
