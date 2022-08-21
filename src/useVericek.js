import React from "react";
import useVericek from "./useVericek";

function App() {

  const [yapilacaklar] = useVericek("https://jsonplaceholder.typicode.com/todos");
  const [fotolar] = useVericek("https://jsonplaceholder.typicode.com/photos");

  return (
    <>
      <h1>YAPILACAKLAR</h1>
      {yapilacaklar &&
        yapilacaklar.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}

      <h1>FOTOĞRAFLAR</h1>
      {fotolar &&
        fotolar.map((item) => {
          return <p key={item.id}>
            <img src={item.thumbnailUrl} alt={item.title} />
          </p>;
        })}
    </>
  );


}

export default App;
