import Head from "next/head";
import React from "react";
// import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
const { request } = require("graphql-request");
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <MDXRemote {...post.content} />
    </div>
  );
}

export async function getStaticPaths() {
  const endpoint = "http://localhost:1337/graphql";
  const query = `
  query {
    blogPosts {
      data {
        id
        attributes {
          title
          description
          slug
          content
          tags {
            data {
              attributes{
                name
              }
              
            }
          }
          author {
            data {
              attributes{
                  name
              }
            }
          }
          media {
            data {
              attributes {
                formats
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
  `;
  const res = await request(endpoint, query);
  const posts = res.blogPosts.data;
  const paths = posts.map((post) => {
    return { params: { id: post.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const endpoint = "http://localhost:1337/graphql";
  const query = `
  query {
    blogPosts {
      data {
        id
        attributes {
          title
          description
          slug
          content
          tags {
            data {
              attributes{
                name
              }
              
            }
          }
          author {
            data {
              attributes{
                  name
              }
            }
          }
          media {
            data {
              attributes {
                formats
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
  `;
  const variable = {
    id: params.id,
  };
  const res = await request(endpoint, query, variable);
  console.log(res);
  const post = res.blogPosts.data;
  const html = await serialize(post.attributes.content);
  return {
    props: {
      post: {
        title: post.data.attributes.title,
        content: html,
      },
    },
  };
}
