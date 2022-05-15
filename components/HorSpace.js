const HorSpace = props => {
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

export default HorSpace
