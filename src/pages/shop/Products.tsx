import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  linkColor,
  accent as accentColor,
  accent,
} from "../../rootStyledComponents";
import { StarFilled } from "@ant-design/icons";
import { ButtonLink } from "../../components/buttons/ButtonLink";
import { useState } from "react";
import Modal from "./MyModal";

interface ProductsProps {
  id: number;
  to: string;
  img: string;
  imgSecondary: string;
  title: string;
  price: number;
  description: string;
  [key: string]: any;
}

export const Products = ({
  id,
  to,
  img,
  imgSecondary,
  title,
  price,
  description,
  listLayout,
  colorway,
}: ProductsProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <CardHolder className="center">
      <CardDefault listLayout={listLayout}>
        <Link className="card-img-container" to={to}>
          <CardImgRatio>
            <CardImg>
              <CardTags />
              <img src={img} alt={title} />
              <img className="img-secondary" src={imgSecondary} alt={title} />
            </CardImg>
          </CardImgRatio>
        </Link>
        <CardInfo>
          <Badge className="badge">
            <Rating>
              <Icon aria-hidden="true" />
              <Icon aria-hidden="true" />
              <Icon aria-hidden="true" />
              <Icon aria-hidden="true" />
              <Icon aria-hidden="true" />
            </Rating>
          </Badge>
          <Link className="card-title" to={to}>
            {title}
          </Link>
          <CardPrice>
            <span>${price}</span>
          </CardPrice>
          <CardDescription listLayout={listLayout}>
            {description}
          </CardDescription>
          <div className="card-button center">
            <ButtonLink
              as={Button}
              onClick={showModal}
              className="button"
              to={to}
            >
              Add to cart
            </ButtonLink>
            <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              name={title}
              price={price}
              imgUrl={imgSecondary}
              thumbUrl={imgSecondary}
              colorway={colorway}
              id={id}
            />
          </div>
        </CardInfo>
      </CardDefault>
    </CardHolder>
  );
};

const CardHolder = styled.div`
  & {
    padding: 0px 6px;
  }
  .center {
    justify-content: center;
    text-align: center;
  }
  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }
  :hover .card-button {
    opacity: 1;
  }
  @media (max-width: 768px) {
    padding: 0 48px;
  }
`;

const CardDefault = styled.div<{ listLayout: boolean }>`
  :hover::before {
    display: block;
  }
  ::before {
    position: absolute;
    height: calc(100% + 16px);
    width: calc(100% + 16px);
    top: -8px;
    left: -8px;
    content: "";
    background: white;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.08);
    z-index: -1;
    display: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  :hover {
    z-index: 9;
  }
  & {
    position: relative;
    display: ${({ listLayout }) => (listLayout ? "flex" : "inline-block")};
    column-gap: 12px;
    width: 100%;
    margin-bottom: 12px;
    background-color: white;
  }
  .card-img-container {
    overflow: hidden;
    position: relative;
    display: block;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 100%;
  }
  a {
    color: ${linkColor};
  }
  a:not(.button):hover {
    color: ${accentColor};
  }
`;
const CardImgRatio = styled.div`
  padding-top: 133.33%;
  width: 100%;
  position: relative;
  border-radius: 0px;
  overflow: hidden;
`;
const CardImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  // img 1
  ${CardDefault}:hover & img {
    transform: scale(1.2);
  }
  & img {
    height: 100%;
    width: 100%;
    transition: all 0.4s ease;
    object-fit: contain;
  }

  & img:first-of-type {
    opacity: 0;
  }
  // img 2

  ${CardDefault}:hover & img:first-of-type {
    opacity: 1;
    z-index: 999;
  }
  ${CardDefault}:hover & .img-secondary {
    opacity: 0;
  }
  ${CardDefault} & .img-secondary {
    position: absolute;
    left: 0px;
    top: 0px;
  }
`;
const CardTags = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  max-width: 50%;
  z-index: 1;
`;
const CardInfo = styled.div`
  text-align: left;
  margin: 8px 0px;
  font-size: 16px;
  .card-title {
    text-decoration: none;
    display: block;
    margin-bottom: 8px !important;
    white-space: normal;
    font-weight: 700;
    color: #123026;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-white-space: nowrap;
    overflow: hidden;
  }

  .card-button {
    margin-top: 8px;
    opacity: 0;
  }

  @media only screen and (max-width: 768px) {
    font-size: 14px;
    & ${ButtonLink} {
      width: 100%;
      padding-left: 4px;
      padding-right: 4px;
    }
    .card-button {
      opacity: 1;
    }
  }

  @media (hover: hover) {
    & ${ButtonLink} {
      background-color: #000;
      color: #ffffff;
      cursor: pointer;
      animation-name: none !important;
    }
  }

  ${ButtonLink}:hover {
    background-color: #000;
    opacity: 1;
  }

  ${ButtonLink} {
    line-height: 1em;
    text-transform: initial;
    padding: 11px 34px;
    max-width: 100%;
    transition: all 0.15s;
    animation-duration: 1s;
    background-color: ${accent};
  }
`;
const Badge = styled.span`
  margin-bottom: 4px !important;
  text-align: left !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  ::after {
    clear: both;
  }
  ::before,
  ::after {
    content: " ";
    display: table;
  }
`;
const Rating = styled.span`
  margin: 0 3px 0 0;
`;
const Icon = styled(StarFilled)`
  font-size: 100%;
  position: relative;
  top: 1px;
  width: 2em;
  height: 2em;
`;

const CardPrice = styled.span`
  font-weight: 500;
  display: block;
  :focus {
    outline: 0;
  }
`;

const CardDescription = styled(CardInfo)<{ listLayout: boolean }>`
  display: ${({ listLayout }) => (listLayout ? "block" : "none")};
`;

const Button = styled.button``;
