import React from "react";

export type HeaderProps = {
  onPageAnchorClicked: (page: string) => void;
};

export default function Header(props: HeaderProps) {
  return (
    <header id="main-id" className="header">
      <nav>
        <h1>LOGO</h1>
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageAnchorClicked("projects");
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#add-new-project-anchor"
              onClick={(e) => {
                //e.preventDefault();
                //props.onPageAnchorClicked("createProject");
              }}
            >
              Add Project
            </a>
          </li>
          <li>
            <a
              href="#contact-anchor"
              onClick={(e) => {
                //e.preventDefault();
                //props.onPageAnchorClicked("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
