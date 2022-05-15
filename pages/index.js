import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '@/components/Layout'
import Button from '@/components/Button'

export default function Home() {
  return (
    <>
      <Layout>
        <div className="cont">
          <p className="bt">BOOM TOWN</p>
          <p className="p">PRESENTS</p>
          <img className="text" alt="Bonechella" draggable={false} src="/bonechella-text.svg" />
          <img className="year" draggable={false} src="/2022.svg" />
          {/* <img className="subtitle" draggable={false} src="/2bone2chella.svg" /> */}
          <img className="date" draggable={false} src="/date.svg" />
          <Link href={'/join'}>
            <Button margin="0 auto">GET AN INVITE</Button>
          </Link>
          <picture draggable="false">
            <source  className="hot-dog" srcSet="/glizzy-edited.webp" type="image/webp" />
            <img   className="hot-dog" src="/glizzy-edited.png" type="image/png" alt="" />
          </picture>

        </div>

      </Layout>
      <style jsx>{`
        main {
          height: 100%;
        }

        .text {
          display: block;
          margin: 0 auto -75px auto;
          width: 75%;
        }

        .year {
          display: block;
          margin: -205px auto 0 auto;
          width: 25%;
        }

        .subtitle {
          display: block;
          margin: -30px auto 0 auto;
          width: 15%;
        }

        .date {
          display: block;
          margin: 0px auto 25px auto;
          width: 15%;
        }

        .hot-dog {
          margin: 50px auto 0 auto;
          display: block;
          max-width: 50%;
          width: auto;
        }

        .bt {
          text-align: center;
          font-size: 22px;
          letter-spacing: 10px;
          opacity: 0.5;
        }

        .p {
          text-align: center;
          font-size: 14px;
          letter-spacing: 3px;
          opacity: 0.5;
          margin: 10px 0 0 0;
        }

        @media (max-width: 800px) {
            .text {
              margin: 20px auto 0 auto;
              width: 100%;
            }

            .date {
              width: 50%;
            }

            .bt {
              font-size: 14px;
            }

            .p {
              font-size: 10px;
            }

            .hot-dog {
              max-width: 90%;
            }
        }
      `}</style>
    </>
  )
}
