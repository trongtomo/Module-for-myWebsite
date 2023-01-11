import React from "react";

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
        <p key={name}>
          {name} ({count})
        </p>
      ))}
    </div>
  );
}
