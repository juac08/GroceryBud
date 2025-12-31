import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Footer from "./footer";
import { motion } from "framer-motion";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const nextItem = list[0]?.title || "Add your first item";
  return (
    <main className="page">
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <section className="section-center shell">
        <header className="hero">
          <span className="eyebrow">GroceryBud</span>
          <motion.h1
            className="heading"
            initial={{ x: "-300px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-300px", opacity: 0 }}
            transition={{ ease: "anticipate" }}
          >
            Calmly curate your next grocery run.
          </motion.h1>
          <p className="lede">
            Keep your staples in one polished place, then glide through the
            aisles without second guessing.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-label">Items queued</span>
              <span className="stat-value">{list.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Next pick</span>
              <span className="stat-pill">{nextItem}</span>
            </div>
          </div>
        </header>

        <form className="grocery-form panel" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <div className="form-row">
            <div className="input-wrap">
              <label className="input-label" htmlFor="grocery">
                What do you need?
              </label>
              <input
                id="grocery"
                type="text"
                className="grocery"
                placeholder="Cold brew, oranges, fresh basil..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{
                scale: 1.05,
              }}
            >
              {isEditing ? "Update" : "Add item"}
            </motion.button>
          </div>
        </form>

        {list.length > 0 ? (
          <div className="grocery-container panel">
            <div className="container-head">
              <div>
                <p className="eyebrow subtle">Your list</p>
                <h3>Items ready to shop</h3>
              </div>
              <motion.button
                className="clear-btn"
                onClick={clearList}
                whileHover={{
                  scale: 1.05,
                }}
                initial={{ x: "-300px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-300px", opacity: 0 }}
                transition={{ ease: "circInOut" }}
              >
                Clear list
              </motion.button>
            </div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
          </div>
        ) : (
          <div className="empty-state panel">
            <p className="eyebrow subtle">Start fresh</p>
            <p className="empty-copy">
              Add what you need and we will keep it tidy until you are ready to
              shop.
            </p>
          </div>
        )}
        <Footer />
      </section>
    </main>
  );
}

export default App;
