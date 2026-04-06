import { marked } from "marked";

export default function BlockPreview({ block }) {
  const { type, data } = block;

  if (type === "header") {
    return <h1>{data.text}</h1>;
  }

  if (type === "markdown") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: marked(data.raw) }}
      ></div>
    );
  }

  if (type === "image") {
    return <img src={data.url} />;
  }

  return null;
}