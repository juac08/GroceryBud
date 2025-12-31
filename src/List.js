import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      <AnimatePresence>
        {items.map((item, index) => {
          const { id, title } = item;
          const order = String(index + 1).padStart(2, "0");
          return (
            <motion.article
              layout
              className="grocery-item modern-card"
              key={id}
              style={{ boxShadow: "rgba(15, 23, 42, 0.06) 0px 10px 30px 0px" }}
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0 }}
              whileHover={{
                scale: 1.025,
                boxShadow: "rgba(37, 99, 235, 0.14) 0px 16px 40px 0px",
              }}
              transition={{ ease: "circInOut", delay: index * 0.025 }}
            >
              <div className="item-meta">
                <span className="item-index">{order}</span>
                <p className="title">{title}</p>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeItem(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default List;
