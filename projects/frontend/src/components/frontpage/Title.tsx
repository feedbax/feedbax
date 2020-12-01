/** @jsx jsx */

import "react"

import { jsx, css } from "@emotion/react"
import { between } from "polished"
import { colors } from "~theme"

export default function Title() {
  return <div css={stylesTitle}>feedb.ax</div>
}

const fontSize = between("82px", "210px", "300px", "1400px")

const createShadow = (min: number, max: number) => {
  const px1p = between(`${min}px`, `${max}px`, "300px", "1400px")
  const px1n = between(`${-min}px`, `${-max}px`, "300px", "1400px")
  const px2p = between(`${min + 1}px`, `${max + 1}px`, "300px", "1400px")
  const px2n = between(`${-(min + 1)}px`, `${-(max + 1)}px`, "300px", "1400px")

  return `
    ${px1n} ${px1n} 0px ${colors.second}, 
    ${px1p} ${px1p} 0px ${colors.first},
    ${px2n} ${px2n} 0px ${colors.third},
    ${px2p} ${px2p} 0px ${colors.third}
  `
}

const stylesTitle = css`
  position: relative;

  font-family: "Klinic Slab";
  font-style: normal;
  font-weight: normal;
  font-size: ${fontSize};

  text-align: center;
  color: ${colors.third};

  text-shadow: ${createShadow(2, 4)};

  margin-top: 50px;
`
