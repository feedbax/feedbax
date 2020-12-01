/** @jsx jsx */

import { useState } from "react"

import Background from "~components/frontpage/Background"
import Title from "~components/frontpage/Title"
import EventLogin from "~components/frontpage/EventLogin"
import SeeMore from "~components/frontpage/SeeMore"
import YourTool from "~components/frontpage/YourTool"
import Benefits from "~components/frontpage/Benefits"

import Layout from "~components/Layout"
import Logo from "~components/Logo"
import Footer from "~components/Footer"

import { jsx, css } from "@emotion/react"
import { colors } from "~theme"

import { useCallback } from "react"
import { navigate } from "gatsby"

const isProduction = process.env.GATSBY_ACTIVE_ENV === "production"

export default function Home() {
  const eventCodeState = useState<string>("")
  const [eventCode] = eventCodeState

  const onLogin = useCallback(
    () => navigate(isProduction ? `/${eventCode}` : `/join/${eventCode}`),
    [eventCode]
  )

  return (
    <Layout>
      <div css={stylesFront}>
        <Background />

        <div className="content">
          <Logo styles={{ marginTop: "30px" }} />

          <div>
            <Title />

            <EventLogin onLogin={onLogin} eventCodeState={eventCodeState} />
          </div>

          <SeeMore />
        </div>

        <div css={stylesMore}>
          <YourTool />
          <Benefits />
        </div>

        <Footer />
      </div>
    </Layout>
  )
}

const stylesMore = css`
  position: relative;
  padding: 20px;
  padding-top: 100px;
  box-sizing: border-box;
`

const stylesFront = css`
  position: relative;

  height: 80vw;
  min-height: 100vh;
  min-height: calc(100vh + 0.25 * 100vw);
  min-height: calc((var(--vh, 1vh) * 100) + 0.25 * 100vw);

  background-color: ${colors.third};

  & * {
    z-index: 1;
  }

  & .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
`
