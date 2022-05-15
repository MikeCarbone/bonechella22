import Head from 'next/head'


const DESCRIPTION = 'The Post-Pandemic Pool Party of the Year'
const TITLE = 'BONECHELLA'
const IMAGE = '/bonechella_22-min.jpg'
const URL = 'https://bonechella.com'

export default function Layout (props) {
  return (
    <>
      <Head>
        <title>BONECHELLA</title>
        <meta name="description" content="Party of the summer." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Krona+One&family=Nanum+Brush+Script&display=swap" rel="stylesheet" />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:url" content={URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      <main>
        <div className="bg"></div>
        <img className="clouds" draggable={false} layout="fill" src="/clouds.png" />
        {props.children}
      </main>
      <footer>
        <div className="logo-cont">
          <img alt="Powered by Gatsby" className="logo" src="/Gatsby.png" />
          <img alt="Carbonology Interactive logo" className="logo" src="/carbon.png" />
        </div>
        <p>&copy; Carbonology Interactive LLC {new Date().getFullYear()}</p>
      </footer>
      <style jsx>{`
        main {
          border: 25px solid black;
          min-height: 100vh;
          height: 100%;
          padding: 50px;
          position: relative;
          overflow: hidden;
        }

        .bg {
          position: fixed;
          background: rgb(255,143,0);
          background: linear-gradient(0deg, rgba(255,143,0,1) 0%, rgba(255,183,109,1) 46%, rgba(255,109,147,1) 100%);
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          z-index: -15;
        }

        .clouds {
          animation: move 8s infinite alternate-reverse linear;
          position: absolute;
          top: 0;
          left: 0;
          opacity: .14;
          overflow: hidden;
          height: 50vh;
          width: 100%;
          min-width: 250vw;
          z-index: -5;
        }

        @keyframes move {
          from {
            transform: scale(1.5) translateX(-150px);
          }

          to {
            transform: scale(1.5) translateX(150px);
          }
        }

        footer {
          color: white;
          background-color: black;
          font-weight: lighter;
          width: 100%;
        }

        .logo-cont {
          align-items: center;
          display: flex;
          justify-content: space-evenly;
          width: 100%;
        }

        .logo {
          height: 100%;
          max-width: 200px;
          width: 30%;
        }
        footer p {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          color: gray;
          font-size: 0.75rem;
          text-align: center;
          padding: 50px;
          letter-spacing: 0px;
        }

        @media (max-width: 800px) {
          main {
            border: 5px solid black;
            padding: 25px 5px;
          }

        }
      `}</style>
    </>
  )
}
