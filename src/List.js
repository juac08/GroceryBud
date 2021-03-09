import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item,i) => {
        const { id, title } = item;
        return (
          <AnimatePresence>
          <motion.article className='grocery-item' key={id}>
            <motion.p
            initial={{ y: "-300px", opacity: 0 }}
              animate={{ y: 0, opacity: 1,}}
              exit={{ x: "-300px", opacity: 0 }}
              transition={{ease:'circInOut',delay:i*.025}} className='title'>{title}</motion.p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
               
              >
                <FaEdit  />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </motion.article>
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default List;
