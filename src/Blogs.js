import axios from "axios";
import { useState } from "react";

function Blogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await axios.post("https://gaitmon.onrender.com/blogs", {
  title,
  content
});

    alert("Saved!");
  };

  return (
    <div className="doctor-container">
      <h2>Upload Blog Page ✍️</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write blog..."
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default Blogs;