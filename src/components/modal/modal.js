import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import s from "./modal.module.css";
import { ReactComponent as CloseSVG } from "../../images/x.svg";
import { ReactComponent as ErrorSVG } from "../../images/error.svg";
import { ReactComponent as Arrow } from "../../images/arrow-right.svg";

const modalRoot = document.querySelector("#modal-root");
let cx = classNames.bind(s);

export default function Modal({ onClose, item }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [numberDirty, setNumberDirty] = useState(false);
  const [nameError, setNameError] = useState("This field in required");
  const [numberError, setNumberError] = useState("This field in required");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || numberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, numberError]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
    let onlyLetters = /^[a-zA-Z]*$/.test(e.currentTarget.value);
    if (!onlyLetters) {
      setNameError("Only letters allowed");
    } else if (!e.currentTarget.value.length) {
      setNameError("This field in required");
    } else {
      setNameError("");
    }
  };

  const handleChangeNumber = (e) => {
    setNumber(e.currentTarget.value);
    let onlyNumbers = /^[0-9]+$/.test(e.currentTarget.value);
    if (!onlyNumbers) {
      setNumberError("Only numbers allowed");
    } else if (e.currentTarget.value.length < 12) {
      setNumberError("Should contain 12 characters");
    } else {
      setNumberError("");
    }
  };
  const handleFocusNameError = () => {
    if (nameError) {
      setName("");
    } else return;
  };
  const handleFocusNumberError = () => {
    if (numberError) {
      setNumber("");
    } else return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const buyItem = (e) => {
    console.log(`name: ${name}, number: ${number}`);
    onClose();
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "number":
        setNumberDirty(true);
        break;
    }
  };
  let classNamesName = cx("formInput:hover", "formInput:focus", "formInput", {
    formInputError: nameError,
  });
  let classNamesNumber = cx("formInput:hover", "formInput:focus", "formInput", {
    formInputError: numberError,
  });

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
              // className={s.formInput}
              className={classNamesName}
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              //   autoFocus
              value={name}
              required
              onBlur={(e) => blurHandler(e)}
              onChange={handleChangeName}
              onFocus={() => handleFocusNameError()}
            />
            {nameDirty && nameError && (
              <>
                <div className={s.formError}>{nameError}</div>
                <div className={s.errorIconContainer}>
                  <ErrorSVG className={s.errorIcon} />
                </div>
              </>
            )}
          </label>
          <label>
            <input
              className={classNamesNumber}
              type="text"
              required
              id="number"
              placeholder="Number"
              name="number"
              value={number}
              onBlur={(e) => blurHandler(e)}
              onChange={handleChangeNumber}
              onFocus={() => handleFocusNumberError()}
            />
            {numberDirty && numberError && (
              <>
                <div className={s.formError}>{numberError}</div>
                <div className={s.errorIconNumberContainer}>
                  <ErrorSVG className={s.errorIcon} />
                </div>
              </>
            )}
          </label>
          {formValid ? (
            <button
              className={s.formBtn}
              type="submit"
              onClick={() => buyItem()}
            >
              Order
            </button>
          ) : (
            <button
              style={{ cursor: "not-allowed" }}
              disabled
              className={s.formBtn}
              type="submit"
              onClick={() => buyItem()}
            >
              Order <Arrow className={s.btnArrow} />
            </button>
          )}
        </form>
      </div>
    </div>,
    modalRoot
  );
}

// export default function Modal({ onClose, item }) {
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [nameDirty, setNameDirty] = useState(false);
//   const [numberDirty, setNumberDirty] = useState(false);
//   const [nameError, setNameError] = useState("This field in required");
//   const [numberError, setNumberError] = useState("This field in required");
//   const [formValid, setFormValid] = useState(false);

//   useEffect(() => {
//     if (nameError || numberError) {
//       setFormValid(false);
//     } else {
//       setFormValid(true);
//     }
//   }, [nameError, numberError]);

//   const handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       onClose();
//     }
//   };

//   const handleChangeName = (e) => {
//     setName(e.currentTarget.value);
//     let onlyLetters = /^[a-zA-Z]*$/.test(e.currentTarget.value);
//     if (!onlyLetters) {
//       setNameError("Only letters allowed");
//     } else if (!e.currentTarget.value.length) {
//       setNameError("This field in required");
//     } else {
//       setNameError("");
//     }
//   };

//   const handleChangeNumber = (e) => {
//     setNumber(e.currentTarget.value);
//     let onlyNumbers = /^[0-9]+$/.test(e.currentTarget.value);
//     if (!onlyNumbers) {
//       setNumberError("Only numbers allowed");
//     } else if (e.currentTarget.value.length < 12) {
//       setNumberError("Should contain 12 characters");
//     } else {
//       setNumberError("");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const buyItem = (e) => {
//     console.log(`name: ${name}, number: ${number}`);
//     onClose();
//   };
//   const blurHandler = (e) => {
//     switch (e.target.name) {
//       case "name":
//         setNameDirty(true);
//         break;
//       case "number":
//         setNumberDirty(true);
//         break;
//     }
//   };

//   return createPortal(
//     <div className={s.Modal__backdrop} onClick={handleBackdropClick}>
//       <div className={s.formtStyle}>
//         <div className={s.closeIconContainer} onClick={onClose}>
//           <CloseSVG className={s.closeIcon} />
//         </div>
//         <div className={s.cardContainer}>
//           <span className={s.category}>{item.category}</span>
//           <h1 className={s.name}>{item.name}</h1>
//           <div className={s.priceContainer}>
//             <p className={s.currency}>$</p>
//             <span className={s.price}>{item.price}</span>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <label>
//             <input
//               className={s.formInput}
//               type="text"
//               id="name"
//               placeholder="Name"
//               name="name"
//               //   autoFocus
//               value={name}
//               required
//               onBlur={(e) => blurHandler(e)}
//               onChange={handleChangeName}
//             />
//             {nameDirty && nameError && (
//               <div className={s.formError}>{nameError}</div>
//             )}
//           </label>
//           <label>
//             <input
//               className={s.formInput}
//               type="text"
//               required
//               id="number"
//               placeholder="Number"
//               name="number"
//               value={number}
//               onBlur={(e) => blurHandler(e)}
//               onChange={handleChangeNumber}
//             />
//             {numberDirty && numberError && (
//               <div className={s.formError}>{numberError}</div>
//             )}
//           </label>
//           {formValid ? (
//             <button
//               className={s.formBtn}
//               type="submit"
//               onClick={() => buyItem()}
//             >
//               Order
//             </button>
//           ) : (
//             <button
//               style={{ cursor: "not-allowed" }}
//               disabled
//               className={s.formBtn}
//               type="submit"
//               onClick={() => buyItem()}
//             >
//               Order <Arrow className={s.btnArrow} />
//             </button>
//           )}
//         </form>
//       </div>
//     </div>,
//     modalRoot
//   );
// }
