import { useState, useEffect } from "react";
import { FetchItems } from "../../services/itemsAPI";
import s from "./cardlist.module.css";

import Card from "../card/card";

export default function CardList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    FetchItems()
      .then((request) => {
        return setItems(request);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={s.cardListContainer}>
      <ul className={s.cardLists}>
        {items.map((item) => (
          <li key={item.name}>
            <Card
              name={item.name}
              category={item.category}
              price={item.price}
            />
          </li>
        ))}
      </ul>
      <button className={s.listBtn} type="button">
        Buy cheapest
      </button>
    </div>
  );
}
