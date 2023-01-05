import Link from "next/link";

//all post
export default function AllPost({ posts }) {
  return (
    posts &&
    posts.map((post) => (
      <Link key={post.attributes.slug} href="/posts/[slug]" as={`/posts/${post.attributes.slug}`}>
        <div className="card">
          <h3>{post.attributes.title}</h3>
          <p>{post.attributes.description}</p>
        </div>
      </Link>
    ))
  );
}
