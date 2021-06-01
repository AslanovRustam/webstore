import React, { useState } from "react";
import { createPortal } from "react-dom";
import s from "./modal.module.css";
import { ReactComponent as CloseSVG } from "../../images/x.svg";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, item }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const buyItem = (e) => {
    console.log(`name: ${name}, number: ${number}`);
    onClose();
  };

  return createPortal(
    <div className={s.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={s.formtStyle}>
        <div className={s.closeIconContainer} onClick={onClose}>
          <CloseSVG className={s.closeIcon} />
        </div>
        <div className={s.cardContainer}>
          <span className={s.category}>{item.category}</span>
          <h1 className={s.name}>{item.name}</h1>
          <div className={s.priceContainer}>
            <p className={s.currency}>$</p>
            <span className={s.price}>{item.price}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className={s.formInput}
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              autoFocus
              value={name}
              required
              onChange={handleChangeName}
            />
          </label>
          <label>
            <input
              className={s.formInput}
              type="number"
              required
              id="number"
              placeholder="Number"
              name="number"
              value={number}
              onChange={handleChangeNumber}
            />
          </label>
          <button className={s.formBtn} type="submit" onClick={() => buyItem()}>
            Order
          </button>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
