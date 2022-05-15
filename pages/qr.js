

export default function qr () {


    return (
        <>
            <div className="cont">
                <Copy tiny mono>Event by 88 Rising</Copy>
                <VertSpace small />
                <h1>Flying to Tampa Bay</h1>
                <VertSpace big />
                <Copy inline>6:05PM</Copy>
                <Copy inline>&nbsp;/ Location of event?</Copy>
                <VertSpace />
                <VertSpace />
                {/* should be big */}
                <div className="profile">
                    <Cont center>
                        <img className="pic" src="/me.png" />
                        <Cont center>
                            <Copy large mono center>Mike Carbone</Copy>
                        </Cont>
                        <Cont center>
                            <VertSpace med />
                            <Tags tags={[
                                { title: 'vip' },
                                { title: 'family' },
                                { title: 'cool' }
                            ]}/>
                        </Cont>
                    </Cont>
                </div>

                <VertSpace />
                <VertSpace />
                <div className="qr">
                    <p>qr code</p>
                </div>

                <VertSpace />
                <VertSpace />
                <VertSpace />
                <Copy instructions>Please present this ticket when requested. Valid only at the time and place specified on the ticket. Some other legal jargon. What else is usually in this fine print? I'm honestly not really sure, which is why I'm struggling to write this. Shame.</Copy>

                <VertSpace />
                <Copy tiny mono>Powered by BOOM TOWN</Copy>
            </div>
            <style jsx>{`
                .cont {
                    border: 1px solid gray;
                    border-radius: 5px;
                    max-width: 650px;
                    margin: 100px auto 0 auto;
                    padding: 75px;
                }

                .pic {
                    border-radius: 50%;
                    display: block;
                    height: 100px;
                    margin: 0 auto;
                    object-fit: cover;
                    object-position: center;
                    width: 100px;
                }

                .qr {
                    background-color: white;
                    height: 150px;
                    width: 150px;
                    margin: 0 auto;
                }

                .qr p {
                    color: black;
                    text-align: center;
                    padding: 45px;
                }
          
            `}</style>
            <GlobalStyleOverride />
        </>
    )
}




const VertSpace = props => {
    let className = 'vert-space';

    if (props.big)   { className += ' vert-space--big' }
    if (props.med)   { className += ' vert-space--med' }
    if (props.small) { className += ' vert-space--small' }

    return (
        <>
            <div className={className}></div>
            <style jsx>{`
                .vert-space {
                    background-color: transparent;
                    height: 50px;
                    width: 100%;
                }

                .vert-space--big {
                    height: 30px;
                }

                .vert-space--med {
                    height: 16px;
                }

                .vert-space--small {
                    height: 10px;
                }
            `}</style>
        </>
    )
}


const GlobalStyleOverride = props => {
    return (
        <style global={true} jsx>{`
        html {
            background-color: black;
            color: white;
        }
        `}</style>
    )
}


const Copy = props => {
    let className = 'copy'
    if (props.tiny)     { className += ' copy--tiny' }
    if (props.small)    { className += ' copy--small' }
    if (props.med)      { className += ' copy--med' }
    if (props.mono)     { className += ' copy--mono' }
    if (props.inline)   { className += ' copy--inline' }
    if (props.center)   { className += ' copy--center' }
    if (props.big)      { className += ' copy--big' }
    if (props.large)      { className += ' copy--large' }
    if (props.instructions) { className += ' copy--instructions' }

    if (props.color) { className += ' copy--custom-color' }

    return (
        <>
            <p className={className}>{props.children}</p>
            <style jsx>{`
                .copy {
                    color: white;
                    font-size: 1rem;
                }

                .copy--tiny {
                    color: gray;
                    font-size: 0.65rem;
                }

                .copy--small {
                    font-size: 0.85rem;
                }

                .copy--med {
                    font-size: 1.15rem;
                }

                .copy--big {
                    font-size: 2.0rem;
                }

                .copy--large {
                    font-size: 3.0rem;
                }

                .copy--mono {
                    font-family: monospace;
                }

                .copy--inline {
                    display: inline-block;
                }

                .copy--center {
                    text-align: center;
                }

                .copy--instructions {
                    font-size: 0.75rem;
                    color: gray;
                    font-weight: lighter;
                }


                /* Keep last */
                .copy--custom-color {
                    color: ${props.color};
                }
            `}</style>
        </>
    )
}

const Cont = props => {
    let className = 'cont';
    if (props.center) { className += ' cont--center' }

    return (
        <>
            <div className={className}>{props.children}</div>
            <style jsx>{`
                .cont--center {
                    margin: 0 auto;
                }
            `}</style>
        </>
    )
}

const Tags = props => {
    return (
        <>
            <div className="cont">
                {props.tags.map((tag, i) => {
                    return (
                        <div className="tag">
                            <Copy mono tiny center color="black">{tag.title}</Copy>
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
                .cont {
                    display: flex;
                    justify-content: center;
                }

                .tag {
                    background-color: #9185ff;
                    border-radius: 15px;
                    padding: 5px 3px;
                    min-width: 75px;
                    margin: 0 3px;
                    text-transform: uppercase;
                }
            `}</style>
        </>
    )
}