import Head from "next/head";
const { request } = require("graphql-request");
import Link from "next/link";
export default function Tag({ posts, tag }) {
  return (
    <div>
      <Head>
        <title>{[tag].join("")}</title>
      </Head>
      {posts.map((post) => (
        <Link
          key={post.attributes.slug}
          href="/posts/[slug]"
          as={`/posts/${post.attributes.slug}`}
        >
          <div className="card">
            <h3>{post.attributes.title}</h3>
            <p>{post.attributes.description}</p>
          </div>
        </Link>
      ))}
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
  const allTags = posts.reduce((allTags, post) => {
    post.attributes.tags.data.forEach((tag) => {
      if (allTags.includes(tag.attributes.name)) {
        return;
      } else {
        allTags.push(tag.attributes.name);
      }
    });
    return allTags;
  }, []);
  const paths = allTags.map((tag) => {
    return {
      params: { tag },
    };
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
  const variables = { tag: params.tag };
  const res = await request(endpoint, query, variables);
  const posts = res.blogPosts.data;
  const filteredPosts = posts.filter((post) =>
    post.attributes.tags.data.find((tag) => tag.attributes.name === params.tag)
  );
  return {
    props: {
      posts: filteredPosts,
      tag: params.tag,
    },
  };
}
