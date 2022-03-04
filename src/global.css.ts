import { textColor, borderBlack } from "./rootStyledComponents";
import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
@font-face {
  font-family: "geometrix";
  src: url("./fonts/geomatrix-font/GeomatrixLight-9Yrm2.ttf");
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: "geometrix";
  src: url("./fonts/geomatrix-font/Geomatrix-8MYjn.ttf");
  font-weight: 200;
  font-style: normal;
}
@font-face {
  font-family: "geometrix";
  src: url("./fonts/geomatrix-font/GeomatrixMedium-1G4Zv.ttf");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "geometrix";
  src: url("./fonts/geomatrix-font/GeomatrixBlack-51Rmv.ttf");
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: "geometrix";
  src: url("./fonts/geomatrix-font/GeomatrixBold-6YBZ1.ttf");
  font-weight: 700;
  font-style: normal;
}

.fg-light {
  font-family: "geometrix";
  font-weight: 100;
}
.fg-reg {
  font-family: "geometrix";
  font-weight: 200;
}
.fg-medium {
  font-family: "geometrix";
  font-weight: 500;
}
.fg-bold {
  font-family: "geometrix";
  font-weight: 700;
}
.fg-black {
  font-family: "geometrix";
  font-weight: 900;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  font-family: "geometrix", sans-serif;
}
#root {
  margin: 0 auto;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
  background-color: transparent;
}
a:hover {
  color: inherit;
}
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.badge {
  min-height: auto;
  min-width: auto;
  display: block;
}
p, span {
  color: ${textColor};
}
.pd-t-8 {
  padding-top: 8px;
}
.mt-4 {
  margin-top: 4px;
}
.mt-8 {
  margin-top: 8px;
}
`;
