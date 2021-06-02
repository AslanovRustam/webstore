import { useState, useEffect } from "react";
import { FetchItems } from "../../services/itemsAPI";
import s from "./cardlist.module.css";
import Modal from "../modal/modal";

import Card from "../card/card";

export default function CardList() {
  const [items, setItems] = useState([]);
  const [showModal, setShowmodal] = useState(false);

  useEffect(() => {
    FetchItems()
      .then((request) => {
        return setItems(request);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleModal = () => {
    setShowmodal(!showModal);
  };

  let newItems = items.map((item) => {
    return {
      name: item.name[0].toUpperCase() + item.name.slice(1),
      category: item.category,
      price: item.price,
    };
  });

  const Chiepest = (items) => {
    let min = items[0];
    for (let i = 0; i < items.length; i++) {
      if (items[i].price < items[0].price) {
        min = items[i];
      }
    }
    return min;
  };
  const min = Chiepest(items);

  return (
    <>
      <div className={s.cardListContainer}>
        <ul className={s.cardLists}>
          {newItems.map((item) => (
            <li key={item.name}>
              <Card
                item={item}
                toggleModal={toggleModal}
                showModal={showModal}
              />
            </li>
          ))}
        </ul>
        <button
          className={s.listBtn}
          type="button"
          onClick={(e) => toggleModal()}
        >
          Buy cheapest
        </button>
      </div>
      {showModal && <Modal onClose={toggleModal} item={min} />}
    </>
  );
}
