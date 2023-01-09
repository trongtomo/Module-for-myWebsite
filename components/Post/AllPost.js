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
        `http://localhost:1337/api/blog-posts?_page=${pageIndex}&_limit=${pageSize}`
      );
      // assign variable from object
      const {
        meta: { pagination },
      } = res.data;
      // Math.ceil 15/5 =3
      setPageCount(Math.ceil(pagination.total / pageSize));
    }
    fetchData();
  }, [pageIndex]);
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
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
