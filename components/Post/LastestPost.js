import Link from "next/link";
import { useEffect, useInsertionEffect, useState } from "react";

export default function LastestPost({ posts }) {
  const [latestPost, setLatestPost] = useState([]);
  useEffect(() => {
    setLatestPost(posts.slice(0, 5));
  }, [posts]);

  function renderLastestPost() {
    return (
      latestPost &&
      latestPost.map((post, i) => (
        <Link key={i} href={`/posts/${post.id}`}>
          <div className="card">
            <h3>{post.attributes.title}</h3>
            <p>{post.attributes.description}</p>
          </div>
        </Link>
      ))
    );
  }
  return <div>{renderLastestPost()}</div>;
}
