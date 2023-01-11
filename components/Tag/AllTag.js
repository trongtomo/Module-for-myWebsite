import React from "react";
import Link from "next/link";
export default function AllTag({ posts }) {
  const allTags = posts.reduce((allTags, post) => {
    post.attributes.tags.data.forEach((tag) => {
      if (allTags[tag.attributes.name]) {
        allTags[tag.attributes.name]++;
      } else {
        allTags[tag.attributes.name] = 1;
      }
    });
    return allTags;
  }, {});
  return (
    <div>
      {Object.entries(allTags).map(([name, count]) => (
        <Link
          key={name}
          href="/tags/[tag]"
          as={`/tags/${name}`}
        >
          <span>
            {name}
            ({count})
            &nbsp;
          </span>
        </Link>
      ))}
    </div>
  );
}
