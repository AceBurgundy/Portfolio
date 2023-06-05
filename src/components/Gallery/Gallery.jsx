import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Gallery.module.css"

const Gallery = () => {
    
    const galleryRef = useRef(null);

    useEffect(() => {

        const images = galleryRef.current.querySelectorAll("div");

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: images, // Use current property of imageRef
                scrub: true,
            },
        });

        timeline.to(images, {
            duration: 1,
            stagger: 0.5,
            y: -700,
            scrub: true,
        });

    });

    return (
        <section id={styles.gallery} className="page" ref={galleryRef}>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
        </section>
    );
};

export default Gallery;
