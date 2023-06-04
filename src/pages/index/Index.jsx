import React, { useEffect, useRef } from "react";
import styles from "./Index.module.css";
import gsap from "gsap";

const Index = () => {
    const surname = ["S", "A", "B", "A", "L", "O"];
    const charRefs = useRef([]);

    useEffect(() => {
        
        const chars = charRefs.current;
        const timeline = gsap.timeline();

        timeline
        
        .to(chars, {
            duration: 1,
            delay: 0.5,
            y: "0",
            stagger: 0.05
        })

        .to(chars, {
            duration: 1,
            delay: 0.7,
            y: "-200%",
            stagger: -0.1,
        })

        .to(mainRef.current, {
            y: "-100%",
            duration: 1.5,
            ease: "power2.out"
        }, "<0.5");

    }, []);

    const loadingRef = useRef(null);
    const mainRef = useRef(null);

    return (
        <>
            <section id={styles.loading} className="page" ref={loadingRef}>
                {surname.map((char, index) => (
                    <p
                        key={index}
                        ref={(element) => (charRefs.current[index] = element)}
                        className={styles.letter}
                    >
                        {char}
                    </p>
                ))}
            </section>
            <section id={styles.main} className="page" ref={mainRef}>
                <p id="hello">Hello</p>
            </section>
        </>
    );
};

export default Index;
