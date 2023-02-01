import Head from "next/head";
import React from "react";
import AllTag from "../../components/Tag/AllTag";
const { request } = require("graphql-request");
export default function allTag({ posts }) {
  return (
    <div>
      <Head>
        <title>Tags</title>
      </Head>
      <AllTag posts={posts} />
    </div>
  );
}
export async function getStaticProps() {
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
  posts.filter((post) =>
    post.attributes.tags.data.map((tag) => tag.attributes.name)
  );
  return {
    props: {
      posts,
    },
  };
}
