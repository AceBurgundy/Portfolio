import MouseFollower from "../MouseFollower/MouseFollower";
import React, { useEffect, useRef } from "react";
import styles from "./ProjectsTitle.module.css";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProjectsTitle = () => {
    const projectTitleString = "Works";
    const projectTitleChars = useRef([]);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.to(titleRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "25% bottom",
            },
            y: 0,
            duration: 1,
        });

        gsap.to(
            projectTitleChars.current,
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "50% bottom"
                },
                duration: 2,
                y: "0",
                stagger: 0.05,
            },
            "<0"
        );
    });

    return (
        <>
            <section id={styles.section} className="page" ref={sectionRef}>
                <MouseFollower boundTo={sectionRef}/>
                <div id={styles.title} ref={titleRef}>
                    <header id={styles.header} data-size="15px" data-color="green">
                        <p>2021</p>
                        <div id={styles.line}></div>
                        <p>Current</p>
                    </header>
                    {projectTitleString.split("").map((char, index) => (
                        <Link
                            to="/code"
                            className={styles.projectTitle}
                            key={index}
                            ref={(element) =>
                                (projectTitleChars.current[index] = element)
                            }
                        >
                            {char}
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ProjectsTitle;
