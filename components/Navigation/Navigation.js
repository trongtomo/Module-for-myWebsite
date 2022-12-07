import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div className="nav">
      <p className="logo">
        <strong>CoderBlog</strong>
      </p>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/posts">All Post</Link>
      </div>
    </div>
  );
}
