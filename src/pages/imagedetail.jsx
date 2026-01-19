import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ImageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`https://picsum.photos/id/${id}/info`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [id]);

  if (!image) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{image.author}</h2>
      <img src={image.download_url} width="400" />
      <p>ID: {image.id}</p>
    </div>
  );
}

export default ImageDetails;
