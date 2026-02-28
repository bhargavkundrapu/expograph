import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const socialItems = [
  { name: "Instagram", href: "#", label: "Follow us on Instagram", delay: "0.1s" },
  { name: "YouTube", href: "#", label: "Subscribe on YouTube", delay: "0.2s" },
  { name: "LinkedIn", href: "#", label: "Connect on LinkedIn", delay: "0.3s" },
];

const Card = () => {
  const [showSocialPanel, setShowSocialPanel] = useState(false);

  return (
    <StyledWrapper>
      <div className="card-panel-wrap">
        <div className="parent">
          <div className="card">
            <div className="logo">
              <span className="circle circle1" />
              <span className="circle circle2" />
              <span className="circle circle3" />
              <span className="circle circle4" />
              <span className="circle circle5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="svg">
                  <path id="Path_6" data-name="Path 6" d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" transform="translate(0 0)" />
                  <path id="Path_7" data-name="Path 7" d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
                  <path id="Path_8" data-name="Path 8" d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
                </svg>
              </span>
            </div>
            <div className="glass" />
            <div className="content">
              <span className="title">ExpoGraph</span>
              <span className="text">Master Vibe Coding, Prompt Engineering & AI Agents — starting at ₹99</span>
            </div>
            <div className="bottom">
              <div className="social-buttons-container">
                <button type="button" className="social-button social-button1">
                  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg">
                    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                  </svg>
                </button>
                <button type="button" className="social-button social-button2">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </button>
                <button type="button" className="social-button social-button3">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
              <div className="view-more">
                <button type="button" className="view-more-button" onClick={() => setShowSocialPanel((v) => !v)}>
                  View more
                </button>
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          </div>
        </div>

        {showSocialPanel && (
          <SocialPanel>
            <div className="social-panel-glass" />
            <button type="button" className="social-panel-close" onClick={() => setShowSocialPanel(false)} aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <div className="social-panel-content">
              <span className="social-panel-title">Join the Vibe</span>
              <span className="social-panel-sub">Follow ExpoGraph for tips, wins & career growth.</span>
              <div className="social-panel-items">
                {socialItems.map((item, i) => (
                  <a key={item.name} href={item.href} className="social-panel-item" style={{ animationDelay: item.delay }}>
                    <span className="social-panel-item-icon">
                      {i === 0 && (
                        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg"><path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" /></svg>
                      )}
                      {i === 1 && (
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      )}
                      {i === 2 && (
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      )}
                    </span>
                    <span className="social-panel-item-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </SocialPanel>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  contain: layout style;
  isolation: isolate;

  .parent {
    width: 290px;
    height: 300px;
    perspective: 1000px;
    transform-origin: center center;
    flex-shrink: 0;
  }

  /* Scale card down to fit viewport on small screens */
  @media (max-width: 340px) {
    .parent {
      transform: scale(0.75);
    }
  }
  @media (min-width: 341px) and (max-width: 380px) {
    .parent {
      transform: scale(0.85);
    }
  }
  @media (min-width: 381px) and (max-width: 420px) {
    .parent {
      transform: scale(0.95);
    }
  }
  @media (max-height: 380px) {
    .parent {
      transform: scale(0.65);
    }
  }
  @media (max-height: 380px) and (min-width: 381px) {
    .parent {
      transform: scale(0.75);
    }
  }

  .card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(0, 255, 214) 0%, rgb(8, 226, 96) 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(5, 71, 17, 0) 40px 50px 25px -40px, rgba(5, 71, 17, 0.2) 0px 25px 25px -5px;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.349) 0%, rgba(255, 255, 255, 0.815) 100%);
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: all 0.5s ease-in-out;
  }

  .content {
    padding: 100px 60px 0px 30px;
    transform: translate3d(0, 0, 26px);
  }

  .content .title {
    display: block;
    color: #00894d;
    font-weight: 900;
    font-size: 20px;
  }

  .content .text {
    display: block;
    color: rgba(0, 137, 78, 0.7647058824);
    font-size: 15px;
    margin-top: 20px;
  }

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #00c37b;
    font-weight: bolder;
    font-size: 12px;
    cursor: pointer;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #00c37b;
    stroke-width: 3px;
    max-height: 15px;
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 30px;
    aspect-ratio: 1;
    padding: 5px;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(5, 71, 17, 0.5) 0px 7px 5px -5px;
    cursor: pointer;
  }

  .bottom .social-buttons-container .social-button:first-child {
    transition: transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s;
  }

  .bottom .social-buttons-container .social-button:nth-child(2) {
    transition: transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s;
  }

  .bottom .social-buttons-container .social-button:nth-child(3) {
    transition: transform 0.2s ease-in-out 0.8s, box-shadow 0.2s ease-in-out 0.8s;
  }

  .bottom .social-buttons-container .social-button .svg {
    width: 15px;
    fill: #00894d;
  }

  .bottom .social-buttons-container .social-button:hover {
    background: black;
  }

  .bottom .social-buttons-container .social-button:hover .svg {
    fill: white;
  }

  .bottom .social-buttons-container .social-button:active {
    background: rgb(255, 234, 0);
  }

  .bottom .social-buttons-container .social-button:active .svg {
    fill: black;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(100, 100, 111, 0.2) -10px 10px 20px 0px;
    background: rgba(0, 249, 203, 0.25);
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    transition-delay: 0.4s;
  }

  .logo .circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .logo .circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .logo .circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
  }

  .logo .circle5 .svg {
    width: 20px;
    fill: white;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(5, 71, 17, 0.2) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
  }

  .card-panel-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
    perspective: 1200px;
  }
`;

const panelSlideIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(800px) rotateY(25deg) translateX(80px) translateZ(-80px);
  }
  to {
    opacity: 1;
    transform: perspective(800px) rotateY(-8deg) translateX(0) translateZ(0);
  }
`;

const itemSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(30px, 0, -20px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const SocialPanel = styled.div`
  position: relative;
  width: 280px;
  min-height: 300px;
  border-radius: 50px;
  background: linear-gradient(135deg, rgb(0, 255, 214) 0%, rgb(8, 226, 96) 100%);
  box-shadow: rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.15) 0 25px 30px 0;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-left: -20px;
  flex-shrink: 0;
  animation: ${panelSlideIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  .social-panel-glass {
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-left-radius: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.8) 100%);
    transform: translate3d(0, 0, 25px);
    pointer-events: none;
  }

  .social-panel-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #00894d;
    cursor: pointer;
    display: grid;
    place-content: center;
    z-index: 5;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: rgba(5, 71, 17, 0.3) 0 4px 10px -2px;
  }
  .social-panel-close:hover {
    background: white;
    transform: scale(1.1) translateZ(10px);
  }
  .social-panel-close svg {
    width: 16px;
    height: 16px;
  }

  .social-panel-content {
    position: relative;
    z-index: 2;
    padding: 56px 24px 24px 24px;
    transform: translate3d(0, 0, 26px);
  }

  .social-panel-title {
    display: block;
    color: #00894d;
    font-weight: 900;
    font-size: 22px;
    margin-bottom: 6px;
  }

  .social-panel-sub {
    display: block;
    color: rgba(0, 137, 78, 0.8);
    font-size: 13px;
    margin-bottom: 24px;
    line-height: 1.4;
  }

  .social-panel-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .social-panel-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-decoration: none;
    color: #00894d;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    transform-style: preserve-3d;
    animation: ${itemSlideIn} 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    box-shadow: rgba(5, 71, 17, 0.2) 0 6px 12px -4px;
  }
  .social-panel-item:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translate3d(0, 0, 12px);
    box-shadow: rgba(5, 71, 17, 0.35) -4px 12px 16px -4px;
  }
  .social-panel-item:active {
    background: rgb(255, 234, 0);
    color: #000;
  }
  .social-panel-item .social-panel-item-icon .svg {
    fill: #00894d;
    width: 22px;
    height: 22px;
  }
  .social-panel-item:hover .social-panel-item-icon .svg {
    fill: #00894d;
  }
  .social-panel-item:active .social-panel-item-icon .svg {
    fill: #000;
  }

  .social-panel-item-label {
    flex: 1;
  }
`;

export default Card;
