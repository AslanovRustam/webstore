import s from "./card.module.css";

export default function Card({ name, category, price }) {
  return (
    <div className={s.cardContainer}>
      <span className={s.category}>{category}</span>
      <h1 className={s.name}>{name}</h1>
      <div className={s.priceContainer}>
        <div className={s.priceBox}>
          <p className={s.currency}>$</p>
          <span className={s.price}>{price}</span>
        </div>
        <button className={s.itemBtn} type="button">
          BUY
        </button>
      </div>
    </div>
  );
}
