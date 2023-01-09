import Link from "next/link";
//all post
export default function AllPost({ posts }) {
  // const [pageIndex, setPageIndex] = useState(1);
  // const data= await axios.get(
  //   `http://localhost:1337/api/blog-posts?_page=${pageIndex}&_limit=`
  // );
  return (
    posts &&
    posts.map((post) => (
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
    ))
  );
}
