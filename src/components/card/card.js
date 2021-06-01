import { useState } from "react";
import s from "./card.module.css";
import Modal from "../modal/modal";

export default function Card({ item }) {
  const [showModal, setShowmodal] = useState(false);
  const toggleModal = () => {
    setShowmodal(!showModal);
  };

  return (
    <>
      <div className={s.cardContainer}>
        <span className={s.category}>{item.category}</span>
        <h1 className={s.name}>{item.name}</h1>
        <div className={s.priceContainer}>
          <div className={s.priceBox}>
            <p className={s.currency}>$</p>
            <span className={s.price}>{item.price}</span>
          </div>
          <button
            className={s.itemBtn}
            type="button"
            onClick={(e) => toggleModal()}
          >
            BUY
          </button>
        </div>
      </div>
      {showModal && <Modal onClose={toggleModal} item={item} />}
    </>
  );
}
