import React from "react";

const Map = ({ query }) => {
  let url;
  if (!query) {
    url =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyCyddp2vs8JJfytLxDy5t3tQswv1TT1WwE&q=Bering+Strait";
  } else {
    url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCyddp2vs8JJfytLxDy5t3tQswv1TT1WwE&q=${query.replace(
      " ",
      "+"
    )}`;
  }

  return (
    <div className="card mb-2">
      <div className="card-header p-2 m-0">
        <h5 className=""> Location: </h5>
      </div>
      <div className="card-img">
        <iframe
          width="100%"
          height="400px"
          id="gmap_canvas"
          src={url}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
