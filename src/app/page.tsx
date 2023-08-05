"use client";

import Image from "next/image";
import img1 from "@/assets/img-1.png";
import img2 from "@/assets/img-2.png";
import img3 from "@/assets/img-3.png";
import { useEffect } from "react";

export default function Home() {
  const setScrollbar = () => {
    const htmlElement = document.documentElement;
    const percentOfScreenheightScrolled =
      htmlElement.scrollTop / htmlElement.clientHeight;
    htmlElement.style.setProperty(
      "--scroll",
      Math.min(percentOfScreenheightScrolled * 100, 100).toString(),
    );
  };


  useEffect(() => {
    if (window != undefined) {
      const observer = new IntersectionObserver(entries => {
        for (let i = entries.length - 1; i >= 0; i--) {
          const entry = entries[i];
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            document.querySelectorAll("[data-img]").forEach(img => {
              img.classList.remove("show");
            });
            const img = document.querySelector(entry.target.dataset.imgToShow as string);
            img?.classList.add("show");
            break;
          }
        }
        console.log(entries[0].isIntersecting)
      });
      setScrollbar();
      window.addEventListener("scroll", setScrollbar);
      document.querySelectorAll("[data-img-to-show]").forEach(section => {
        observer.observe(section)
      })
    }
  }, []);

  return (
    <main>
      <div className='imgs'>
        <Image
          src={img1}
          data-img
          id='img-1'
          className='top-section-img show'
          alt=''
          />
        <Image alt='' src={img2} data-img id='img-2' />
        <Image alt='' src={img3} data-img id='img-3' />
          {/*
      */}
      </div>
      <section className='top-section full-screen-section'>
        <div className='left'>
          <h1>Build Better Backends</h1>
          <p>
            The only platform that gives AI the ability to autonomously build
            web services.
          </p>
        </div>
        <div className='right'></div>
      </section>
      <section className='full-screen-section first-main-section'>
        <h1>Completely Visual</h1>
        <p>Never touch the command line, from provision to production.</p>
        <div data-img-to-show='#img-1'></div>
      </section>
      <section className='full-screen-section'>
        <h1>Full Stack</h1>
        <p>
          Never manage infrastructure again. One click gets you: a database,
          APIs, deployments, hosting, etc.
        </p>
        <div data-img-to-show='#img-2'></div>
      </section>
      <section className='full-screen-section'>
        <h1>Launch Faster</h1>
        <p>Logical can get systems to market in minutes instead of weeks.</p>
        <div data-img-to-show='#img-3'></div>
      </section>
    </main>
  );
}
