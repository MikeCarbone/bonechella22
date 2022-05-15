const LoadingCover = props => {

    return (
        <>
            <div className="cover">p</div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 1; }

                    to { opacity: 0; }
                }
                .cover {
                    animation: fadeIn 1s ease-in 0s forwards;
                    background-color: black;
                    height: 100vh;
                    opacity: 1;
                    overflow: hidden;
                    position: fixed;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    z-index: 1000;
                }
            `}</style>
        </>
    )
}

export default LoadingCover
