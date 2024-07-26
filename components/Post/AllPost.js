import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AllPost({ posts }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState();
  const pageSize = 5;
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://127.0.0.1:1337/api/blog-posts?_page=${pageIndex}&_limit=${pageSize}`
      );
      // assign variable from object
      const {
        meta: { pagination },
      } = res.data;
      // Math.ceil 6/5 =2 || 15/5 =3 meaning 15 post to display 5 post in 3 page
      setPageCount(Math.ceil(pagination.total / pageSize));
    }
    fetchData();
  }, [pageIndex]);
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // get posts from parent then slice
  const currentPage = posts.slice(startIndex, endIndex);
  return (
    <>
      {currentPage &&
        currentPage.map((post) => (
          <Link
            key={post.attributes.slug}
            href="/posts/[slug]"
            as={`/posts/${post.attributes.slug}`}
          >
            <div className="card">
              <h3>{post.attributes.title}</h3>
              <p>{post.attributes.description}</p>
              <p>
                {post.attributes.tags && post.attributes.tags.data
                  ? post.attributes.tags.data.map((tag) => (
                      <Link
                        key={tag.attributes.name}
                        href="/tags/[tag]"
                        as={`/tags/${tag.attributes.name}`}
                      >
                        <span style={{ color: "blue" }}>
                          {tag.attributes.name}
                          &nbsp;
                        </span>
                      </Link>
                    ))
                  : null}
              </p>
            </div>
          </Link>
        ))}
      <div>
        <button
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {""}
          Previous
        </button>
        <button
          disabled={pageIndex === pageCount}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          {""}
          Next
        </button>
        <span>{`${pageIndex} of ${pageCount}`}</span>
      </div>
    </>
  );
}
