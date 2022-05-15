import Layout from '../components/Layout'
import VertSpace from '../components/VertSpace'

export default function Rules(){

    return (
        <>
            <Layout>
                <Wrapper>
                    <h1>THE RULEZ OF BONECHELLA</h1>
                    <VertSpace />
                    <p>- NO MOTHERFUCKIN GLASS BOTTLES (they break n hurt feet)</p>
                    <VertSpace med />
                    <p>- everywhere in the house except the bathroom is OFF LIMITS</p>
                    <VertSpace med />
                    <p>- you puke, you clean it</p>
                    <VertSpace med />
                    <p>- if you puke you're sleeping outside in the tent</p>
                    <VertSpace med />
                    <p>- no weed or drugs allowed on the property</p>
                    <VertSpace med />
                    <p>- all +1s have to be signed up on the site to come</p>
                    <VertSpace med />
                    <p>- no disrespect</p>
                    <VertSpace med />
                    <p>- mike or any of the carbones can kick you out at any time</p>
                </Wrapper>
            </Layout>
        </>
    )
}


const Wrapper = (props) => {

    return (
        <>
            <div>
                {props.children}
            </div>
            <style jsx>{`
                div {
                    max-width: 800px;
                    margin: 200px auto 0 auto;
                }

                @media (max-width: 800px) {
                    div {
                        margin: 50px auto 0 auto;
                        padding: 5px;
                    }
                }
            `}</style>
        </> 
    )
}