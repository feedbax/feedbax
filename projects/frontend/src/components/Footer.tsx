/** @jsx jsx */

import "react";
import { useTranslation } from "~i18n";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import { Link } from "gatsby";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div css={stylesFooter}>
      <div className="title">feedb.ax</div>
      <div className="copy">&copy; 2019 - 2020 feedb.ax by 365STEPS</div>
      <Link to="/legal/privacy-policy" className="links">
        {t("generic", "footer")}
      </Link>
    </div>
  );
}

const stylesFooter = css`
  position: relative;
  padding: 30px;
  text-align: center;

  font-family: "Klinic Slab Book";
  font-style: normal;

  color: ${colors.third};
  background-color: ${colors.fourth};

  .title {
    font-weight: bold;
    font-size: ${between("36px", "60px", "300px", "1400px")};
    margin-bottom: 10px;
  }

  .copy,
  .links {
    font-weight: normal;
    font-size: ${between("12px", "20px", "300px", "1400px")};
    color: ${colors.third};

    &:visited {
      color: ${colors.third};
    }
  }
`;
