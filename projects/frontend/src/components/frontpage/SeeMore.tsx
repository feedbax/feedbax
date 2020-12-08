/** @jsx jsx */

import "react";
import { useTranslation } from "~i18n";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

export default function SeeMore() {
  const { t } = useTranslation();

  return (
    <div css={stylesSeeMore}>
      <span>{t("frontpage", "see-more")}</span>
      <div />
    </div>
  );
}

const stylesSeeMore = css`
  position: relative;

  margin-top: 80px;
  height: 124px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & span {
    flex: 0 1 auto;

    background: ${colors.third};
    padding: 2px 6px;
    border-radius: 20px;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    text-align: center;

    color: ${colors.first};
  }

  & div {
    display: block;
    position: absolute;

    top: 38px;
    left: calc(50% - 2px);

    height: 180px;
    width: 2px;

    background: ${colors.first};
    border-right: 2px solid ${colors.third};
    border-radius: 2px;
  }
`;
