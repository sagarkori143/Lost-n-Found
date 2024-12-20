"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
export interface ItemProp {
  collegeEmail: string;
  dateAdded: string;
  dateLostFound: string;
  description: string;
  email: string;
  imageUrls: string[];
  phone: string;
  photoURL: string;
  rollNo: string;
  status: string;
  title: string;
  type: string;
  username: string;
  whatsapp: string;
  __v: number;
  _id: string;

}
interface Prop {
  item: ItemProp;
  index: number;
}

const ItemCard = ({ item, index }: Prop) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    // Time calculator:
    const calculateTimeAgo = (dateString: string): string => {
      const now = new Date();
      const date = new Date(dateString);
      const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} minutes ago`;
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} hours ago`;
      } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days} days ago`;
      }
    };
    setTime(calculateTimeAgo(item.dateAdded));
  }, [])

  return (
    <StyledWrapper>
      <div className="card box-border overflow-hidden">
        <div className="card-image box-border max-h-[200px] lg:max-h-[300px] flex items-center justify-center overflow-hidden w-[100%] h-[100%] rounded bg-gray-100">
          <Image
            height={100}
            width={100}
            alt=""
            src={item.imageUrls[0]}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex flex-col">
        <p className="card-title">{item.title}</p>
        <p className="card-body">
          {item.description}
        </p>
        </div>
        <p className="footer">Reported by <span className="by-name">{item.username} </span><span className="date">{time}</span></p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    padding: 20px;
    width: 100%;
    min-height: 200px;
    border-radius: 20px;
    background: #212121;
    box-shadow: 5px 5px 8px #1b1b1b,
               -5px -5px 8px #272727;
    transition: 0.4s;
  }

  .card:hover {
    translate: 0 -10px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #b2eccf;
    margin: 15px 0 0 10px;
  }

  .card-image {
    min-height: 170px;
    background-color: #313131;
    border-radius: 15px;
    background: #313131;
    box-shadow: inset 5px 5px 3px #2f2f2f,
              inset -5px -5px 3px #333333;
  }

  .card-body {
    margin: 13px 0 0 10px;
    color: rgb(184, 184, 184);
    font-size: 15px;
  }

  .footer {
    float: right;
    margin: 28px 0 0 18px;
    font-size: 13px;
    color: #b3b3b3;
  }

  .by-name {
    font-weight: 700;
  }`;

export default ItemCard;