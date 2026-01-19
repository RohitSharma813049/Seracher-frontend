import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate(); // ✅ REQUIRED

  useEffect( () => {
    fetch("https://picsum.photos/v2/list?limit=200")
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // no reload
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Image Search</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by author..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

  {/* <button onClick={() => navigate(`/image/${img.id}`)}>
  View Details
</button> */}

      </form>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {image
          .filter((img) =>
            img.author.toLowerCase().includes(name.toLowerCase())
          )
          .map((img) => (
            <div
              key={img.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "220px",
              }}
            >
              <img src={img.download_url} width="200" />
              <p>{img.author}</p>


              <button onClick={() => navigate(`/image/${img.id}`)}>
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
