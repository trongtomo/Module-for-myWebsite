import Link from "next/link";
import { useEffect, useState } from "react";

//lastest post
export default function LastestPost({ posts }) {
  const [latestPost, setLatestPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (posts) {
      setLatestPost(posts.slice(0, 5));
      setIsLoading(false);
    }
  }, [posts]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  function renderLastestPost() {
    if (latestPost.length > 0) {
      return (
        latestPost &&
        latestPost.map((post) => (
          <Link key={post.id} href="/posts/[id]" as={`/posts/${post.id}`}>
            <div className="card">
              <h3>{post.attributes.title}</h3>
              <p>{post.attributes.description}</p>
            </div>
          </Link>
        ))
      );
    }
  }
  return <div>{renderLastestPost()}</div>;
}
