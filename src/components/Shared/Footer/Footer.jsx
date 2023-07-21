import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { FaGithub, FaLinkedin,FaTwitter,FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col ">
        <FaLaptopCode className='text-5xl text-blue-400' />
          <p className='bg-gradient-to-r from-blue-700  to-blue-400 text-transparent bg-clip-text'>AAA Technology <br />Made & Designed by <a href='https://github.com/nabiursiddique' target='blank'>Nabiur Siddique</a></p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/nabiursiddique" target='blank'><FaGithub className='text-2xl hover:text-sky-500'></FaGithub></a>
            <a href="https://www.facebook.com/nabiur.siddique.official/" target='blank'><FaFacebook className='text-2xl hover:text-blue-400'></FaFacebook></a>
            <a href='https://twitter.com/NabiurSiddique' target='blank'><FaTwitter className='text-2xl hover:text-blue-400'></FaTwitter></a>
            <a href="https://www.linkedin.com/in/nabiur-siddique/" target='blank'><FaLinkedin className='text-2xl hover:text-blue-400'></FaLinkedin></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;