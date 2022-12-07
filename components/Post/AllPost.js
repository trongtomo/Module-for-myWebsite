import Link from "next/link";

export default function AllPost({ posts }) {
  return (
    posts &&
    posts.map((post, i) => (
      <Link key={i} href={`/posts/${post.id}`}>
        <div className="card">
          <h3>{post.attributes.title}</h3>
          <p>{post.attributes.description}</p>
        </div>
      </Link>
    ))
  );
}
