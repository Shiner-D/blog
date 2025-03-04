import React, { useEffect, useState } from "react";
import bookStyle from "./bookShelf.module.css";

const BookShelf = () => {

  const [coverImg, setCoverImg] = useState<string>("");
  const [titleImg, setTitleImg] = useState<string>("");
  const [threeDImg, setThreeDImg] = useState<string>("");

  useEffect(() => {
    import("@/assets/images/cover.jpeg").then((module) => {
      setCoverImg(module.default);
    });
    import("@/assets/images/title.png").then((module) => {
      setTitleImg(module.default);
    });
    import("@/assets/images/hero.png").then((module) => {
      setThreeDImg(module.default);
    })
  })
  const books = [
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
    {
      src: {
        cover: coverImg,
        title: titleImg,
        threeD: threeDImg,
      },
    },
  ];
  return (
    <div className="flex items-center flex-wrap justify-start relative">
      {books.map((book, index) => (
        <div key={index} className={bookStyle.card}>
          {Object.keys(book.src).map((key) => (
            <img
              className={`${bookStyle[key]}`}
              src={book.src[key]}
              key={key}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BookShelf;