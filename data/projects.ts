import type { StaticImageData } from "next/image"
import memoriaImg from "@/public/images/projects/memoria.png"
import oxyleafImg from "@/public/images/projects/oxyleaf.png"

export type Project = {
    slug: string,
    title: string,
    subtitle: string,
    description: string,
    href?: string,
    image?: { src : StaticImageData, alt: string}
}


export const projects = [
    {
        slug: "oxyleaf",
        title: "Oxyleaf™",
        subtitle: "Bio-inspired tech boosts urban air quality and regenerates city ecosystems.",
        description:
            "Oxyleaf™ is a research and technology initiative focused on developing bio-inspired environmental systems for improving urban air quality and ecological resilience. By combining environmental science, engineering and intelligent monitoring technologies, the project explores new solutions for urban environments capable of reducing pollution, enhancing natural regeneration processes and supporting healthier cities.",
        href: "https://www.iite.eu/oxyleaf",
        image: { src: oxyleafImg, alt: "Oxyleaf™ urban tree in a palm-lined city square" },
    },
    {
        slug: "memoria",
        title: "Memoria™",
        subtitle: "Multimodal data platform accelerating neurodegenerative-disease research.",
        description:
            "Memoria™ is a research initiative building a multimodal data platform for neurodegenerative-disease research. It integrates and harmonizes fragmented clinical, neuropsychological, neuroimaging, fluid-biomarker and genetic data into research-ready datasets, and applies multimodal AI to identify disease subtypes and progression patterns — supporting precision medicine for conditions such as Alzheimer's disease.",
        href: "https://www.iite.eu/memoria",
        image: { src: memoriaImg, alt: "Researcher reviewing a brain scan next to an MRI room" },
    },
    {
        slug: "terra",
        title: "Terra™",
        subtitle: "Environmental monitoring and sustainable land systems for resilient landscapes and urban ecosystems.",
        description:
            "Terra™ is a research initiative focused on environmental systems, sustainable land management and intelligent monitoring of natural resources. The project develops technologies and analytical models to better understand and manage soil, water and ecological processes, supporting more resilient landscapes and sustainable urban and territorial planning.",
    },
] satisfies Project[];
