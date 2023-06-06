import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ProjectsTitle from "../../components/ProjectsTitle/ProjectsTitle";
import Gallery from "../../components/Gallery/Gallery";
import About from "../../components/About/About";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {

    window.scrollTo({top: 0})
    
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    });

    return (
        <>
            <LoadingScreen />
            <About />
            <ProjectsTitle />
            {/* <Gallery /> */}
        </>
    );
};

export default Index;
