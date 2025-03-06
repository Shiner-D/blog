import React, { useEffect, useState } from "react";
import bookStyle from "./bookShelf.module.css";
import { TextRevealCard } from "@/components/ui/text-reveal-card";

import redBook from "@/assets/images/redBook.png";
import redBook1 from "@/assets/images/redBook1.png";
import vite from "@/assets/images/vite.jpg";
import vite1 from "@/assets/images/vite1.png";
import ts from "@/assets/images/ts.jpg";
import ts1 from "@/assets/images/ts1.png";
import rely from "@/assets/images/rely.jpg";
import rely1 from "@/assets/images/rely1.png";
import network from "@/assets/images/network.jpg";
import network1 from "@/assets/images/network1.png";
import func from "@/assets/images/func.jpg";
import func1 from "@/assets/images/func1.png";
import es6 from "@/assets/images/es6.jpg";
import es61 from "@/assets/images/es61.png";
import engineering from "@/assets/images/engineering.jpg";
import engineering1 from "@/assets/images/engineering1.png";

const BookShelf = () => {
  const books = [
    {
      src: {
        cover: redBook,
        // title: titleImg,
        threeD: redBook1,
      },
    },
    {
      src: {
        cover: vite,
        // title: titleImg,
        threeD: vite1,
      },
    },
    {
      src: {
        cover: ts,
        // title: titleImg,
        threeD: ts1,
      },
    },
    {
      src: {
        cover: rely,
        // title: titleImg,
        threeD: rely1,
      },
    },
    {
      src: {
        cover: network,
        // title: titleImg,
        threeD: network1,
      },
    },
    {
      src: {
        cover: func,
        // title: titleImg,
        threeD: func1,
      },
    },
    {
      src: {
        cover: es6,
        // title: titleImg,
        threeD: es61,
      },
    },
    {
      src: {
        cover: engineering,
        // title: titleImg,
        threeD: engineering1,
      },
    },
  ];
  return (
    <div className="h-full w-full">
      <div className="flex justify-center">
        <TextRevealCard
          text="我的书架"
          revealText="技术与思想的交互"
          className="text-center mt-[60px] bg-[#190904e8]"
        ></TextRevealCard>
      </div>
      <div className="h-[calc(100%-160px)] w-full flex items-center flex-wrap justify-start relative">
        {books.map((book, index) => (
          <div key={index} className={`${bookStyle.card}`}>
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
    </div>
  );
};

export default BookShelf;
