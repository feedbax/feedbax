/** @jsx jsx */

import React from "react";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

export default function EventLogin({ eventCodeState, onLogin }: Props) {
  const [eventCode, setEventCode] = eventCodeState;

  return (
    <div css={stylesEventLogin}>
      <input
        className="text"
        type="text"
        placeholder="Event-Code"
        value={eventCode}
        onChange={e => setEventCode(e.target.value)}
      />

      <input
        className="button"
        type="submit"
        value="Los geht’s"
        onClick={onLogin}
      />
    </div>
  );
}

const createShadow = (min: number, max: number) => {
  const px1p = between(`${min}px`, `${max}px`, "300px", "1400px");
  const px1n = between(`${-min}px`, `${-max}px`, "300px", "1400px");
  const px2p = between(`${min + 1}px`, `${max + 1}px`, "300px", "1400px");
  const px2n = between(`${-(min + 1)}px`, `${-(max + 1)}px`, "300px", "1400px");

  return `
    ${px1n} ${px1n} 0px #FF7D65, 
    ${px1p} ${px1p} 0px #3A5568,
    ${px2n} ${px2n} 0px #FFFFFF,
    ${px2p} ${px2p} 0px #FFFFFF
  `;
};

const stylesEventLogin = css`
  position: relative;
  display: block;

  width: 300px;

  margin: 0 auto;
  margin-top: 20px;

  box-shadow: ${createShadow(2, 4)};

  & .text,
  & .button {
    border-radius: 0 !important;
    -webkit-appearance: none;

    display: inline-block;
    position: relative;
    box-sizing: border-box;

    width: 100%;
    height: 56px;

    border: 0;
    outline: 0;

    padding: 0;
    margin: 0;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: 26px;

    display: flex;
    align-items: center;
    text-indent: 36px;
  }

  & .text {
    color: ${colors.first};
    border: 2px solid ${colors.third};
    background-color: ${colors.third};

    &:focus {
      border: 2px solid ${colors.second};
    }

    &::placeholder {
      color: ${colors.first};
      opacity: 0.8;
    }
  }

  & .button {
    color: ${colors.third};
    background: ${colors.first};
    cursor: pointer;

    border: 2px solid ${colors.first};

    &:hover {
      background: ${colors.first};
    }

    &:focus {
      border: 2px solid ${colors.second};
    }
  }
`;

type UseState<S> = [S, React.Dispatch<React.SetStateAction<S>>];

type Props = {
  onLogin: () => void;
  eventCodeState: UseState<string>;
};
