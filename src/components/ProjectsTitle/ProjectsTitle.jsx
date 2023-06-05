import React, { useEffect, useRef } from "react";
import styles from "./ProjectsTitle.module.css";
import gsap from "gsap";

const ProjectsTitle = () => {
    const projectTitleString = "Works";
    const projectTitleChars = useRef([]);
    const selectedProjectsTitleRef = useRef(null)

    useEffect(() => {

        const timeline = gsap.timeline()
        
        timeline
        
            .to(selectedProjectsTitleRef.current, {
                duration: 1,
                y: 0,
            })
            
            .to(
                projectTitleChars.current,
                {
                    duration: 0.8,
                    y: "0",
                    stagger: 0.05,
                },
                "<0"
            );
    });

    return (
        <section
            className="page"
            style={{ backgroundColor: "yellow", height: "110vh" }}
        >
            <div
                id={styles.selected_projects_title}
                ref={selectedProjectsTitleRef}
            >
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
    );
};

export default ProjectsTitle;
