import React from "react";
import { ExperienceProps } from "../../../types";

export default function Experience(props: ExperienceProps) {
	return (
		<article className="experience-card">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</article>
	);
}
