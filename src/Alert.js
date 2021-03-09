import React, { useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';


const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1500);
    return () => clearTimeout(timeout);
  });
  return (
<AnimatePresence>
  <motion.p 
  initial={{ y: "-300px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-300px", opacity: 0 }}
              transition={{ease:'easeInOut', duration:.5}}
  className={`alert alert-${type}`}>{msg}</motion.p>
  </AnimatePresence>
  )};

export default Alert;
