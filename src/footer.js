import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='footer'>
      <div className='footer__brand'>
        <span className='footer__dot' />
        <div>
          <p className='footer__title'>GroceryBud</p>
          <p className='footer__note'>Curated by Junaid Ahmad • {date}</p>
        </div>
      </div>
      <ul className='footer__links'>
        <li>
          <a href='https://www.facebook.com/junaid4u.ahmad' className='social-icon hi2'>
            <i className='fab fa-facebook'></i>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/juac08' className='social-icon hi2'>
            <i className='fab fa-linkedin'></i>
          </a>
        </li>
        <li>
          <a href='https://github.com/juac08' className='social-icon hi2'>
            <i className='fab fa-github'></i>
          </a>
        </li>
        <li>
          <a href='https://www.instagram.com' className='social-icon hi2'>
            <i className='fab fa-instagram'></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
