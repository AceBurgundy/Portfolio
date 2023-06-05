import React, { useEffect, useRef } from "react";
import styles from "./Index.module.css";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

const Index = () => {
    const surname = "Sam";
    const firstNameRefs = useRef([]);
    const message = "Sabalo";
    const projectTitleString = "Works"
    const lastNameChars = useRef([]);
    const projectTitleChars = useRef([])
    const loadingRef = useRef(null);
    const galleryRef = useRef(null);
    const selectedProjectsTitleRef = useRef(null)

    useEffect(() => {
        const firstNameLetters = firstNameRefs.current;
        const lastNameLetters = lastNameChars.current;
        const timeline = gsap.timeline();
        gsap.registerPlugin(ScrollTrigger);

        timeline

            .to(firstNameLetters, {
                duration: 0.8,
                delay: 1,
                y: "0",
                stagger: 0.05,
            })

            .to(
                firstNameLetters,
                {
                    duration: 2,
                    delay: 0.4,
                    y: "-100%",
                    stagger: -0.1,
                }
            )
            .to(
                loadingRef.current,
                {
                    duration: 1.5,
                    height: "0",
                }, "<0"
            )
            .to(
                lastNameLetters,
                {
                    duration: 1,
                    y: "0",
                    stagger: 0.1,
                },
                "<0"
            )
            .to(loadingRef.current, {
                display: "none",
            })
            .to(selectedProjectsTitleRef.current, {
                duration: 1,
                y: 0
            })
            .to(projectTitleChars.current, {
                duration: 0.8,
                y: "0",
                stagger: 0.05,
            }, "<0")

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const images = galleryRef.current.querySelectorAll("div");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: images, // Use current property of imageRef
                scrub: true,
            },
        });

        tl.to(images, {
            duration: 1,
            stagger: 0.5,
            y: -700,
            scrub: true,
        });
    }, []);

    const mainRef = useRef(null);

    return (
        <>
            <section id={styles.loading} className="page" ref={loadingRef}>
                {surname.split("").map((char, index) => (
                    <p
                        key={index}
                        ref={(element) => (firstNameRefs.current[index] = element)}
                        className={styles.letter}
                    >
                        {char}
                    </p>
                ))}
            </section>
            <section id={styles.main} className="page" ref={mainRef}>
                <div id={styles.about_container}>
                    <p className={styles.about_item}>I am a freelance digital designer and web developer, specializing in creating responsive full-stack web applications that adapt seamlessly across devices.</p>
                    <p className={styles.about_item}>I possess expertise in crafting desktop applications that offer a seamless user experience and efficient functionality.</p>
                    <p className={styles.about_item}>Developing aesthetically pleasing solutions that prioritize functionality and deliver a beautiful user interface.</p>
                </div>
                <div>
                    {message.split("").map((char, index) => (
                        <p
                            className={styles.surname}
                            key={index}
                            ref={(element) =>
                                (lastNameChars.current[index] = element)
                            }
                        >
                            {char}
                        </p>
                    ))}
                </div>
            </section>
            <section className="page"
                style={{ backgroundColor: "yellow" , height: "110vh"}}
            >
                <div id={styles.selected_projects_title} ref={selectedProjectsTitleRef}>
                    {projectTitleString.split("").map((char, index) => (
                        <p
                            className={styles.projectTitle}
                            key={index}
                            ref={(element) =>
                                (projectTitleChars.current[index] = element)
                            }
                        >
                            {char}
                        </p>
                    ))}
                </div>
            </section>
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
            <section
                className="page"
                style={{ backgroundColor: "red" }}
            ></section>
        </>
    );
};

export default Index;
