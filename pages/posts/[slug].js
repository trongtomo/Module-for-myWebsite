import Head from "next/head";
import Link from "next/link";
import React from "react";
// import axios from "axios";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
const { request } = require("graphql-request");
export default function Post({ post }) {
  return (
    <div>
      <Head>
        <title>{[post.title].join("")}</title>
        <br />
      </Head>
      <header>{post.description}</header>
      <post>
        <main>
          <header></header>
          <content>
            <MDXRemote {...post.content} />
          </content>
          {post.tags.map((tag) => (
            <Link key={tag} href="/tags/[tag]" as={`/tags/${tag}`}>
              <span style={{ color: "blue" }}>{tag} &nbsp;</span>
            </Link>
          ))}
          <footer>{post.author}</footer>
        </main>
      </post>
    </div>
  );
}

export async function getStaticPaths() {
  const endpoint = "http://127.0.0.1:1337/graphql";
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
    return { params: { slug: post.attributes.slug.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const endpoint = "http://127.0.0.1:1337/graphql";
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
    slug: params.slug,
  };
  const res = await request(endpoint, query, variable);
  const posts = res.blogPosts.data;
  const post = posts.find((p) => p.attributes.slug === params.slug);
  const html = await serialize(post.attributes.content, {
    mdxOptions: { development: false },
  });
  //1 post has many tag
  const tags = post.attributes.tags.data.map((tag) => tag.attributes.name);
  return {
    props: {
      post: {
        title: post.attributes.title,
        content: html,
        description: post.attributes.description,
        author: post.attributes.author.data.attributes.name,
        tags: tags,
      },
    },
  };
}
