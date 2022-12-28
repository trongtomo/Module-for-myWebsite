import Link from "next/link";

//all post
export default function AllPost({ posts }) {
  return (
    posts &&
    posts.map((post) => (
      <Link key={post.id} href="/posts/[id]" as={`/posts/${post.id}`}>
        <div className="card">
          <h3>{post.attributes.title}</h3>
          <p>{post.attributes.description}</p>
        </div>
      </Link>
    ))
  );
}
