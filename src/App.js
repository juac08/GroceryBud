import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import Footer from'./footer'
import { motion } from 'framer-motion';
import Images from './Images/Ocean-2.5s-1680px.svg'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}
      >
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
<div className='svgimg'>
<img  src={Images} alt="ocean"/>
</div>
        <motion.h3 
        className='heading' 
        initial={{ x: "-300px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-300px", opacity: 0 }}
              transition={{ease:'anticipate'}}
              >Items</motion.h3>
        
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <motion.button type='submit' className='submit-btn'
          whileHover={{
                  scale: 1.3,
                  boxShadow: "0px 0px 15px #ca9c9c",
                  textShadow: "0px 0px 15px #b83455",
                }}
          >
            {isEditing ? 'edit' : 'submit'}
          </motion.button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <motion.button className='clear-btn' onClick={clearList}
          whileHover={{
                  scale: 1.3,
                  boxShadow: "0px 0px 15px #ca9c9c",
                  textShadow: "0px 0px 15px #b83455",
                }}
                initial={{ x: "-300px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-300px", opacity: 0 }}
              transition={{ease:'circInOut'}}>
            clear items
          </motion.button>
        </div>
      )}
      <Footer/>
    </section>
  );
}

export default App;
