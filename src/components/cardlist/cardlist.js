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

  let newItems = items.map(
    (item) => item.name[0].toUpperCase() + item.name.slice(1)
    // (item) => {
    //   const newItemName = item.name[0].toUpperCase() + item.name.slice(1);
    //   item.name = newItemName;
    //   {...item,newItemName }
    // }
    //////////////////////
    // (item) => {
    //   let newItem = Object.entries(item);
    //   console.log(newItem);
    // }
  );
  console.log(newItems);
  // const ItemsToUC = (items) => {
  //   let newItems = [];
  //   for (let i = 0; i < items.length; i++) {
  //     items[i] = items.name[0].toUpperCase() + items.name.slice(1);
  //     newItems.push(items[i]);
  //   }
  //   return newItems;
  // };
  // let newItems = ItemsToUC(items);
  // console.log(newItems);

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
          {items.map((item) => (
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
