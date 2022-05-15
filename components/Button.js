export default function Button (props) {
    return (
        <>
            <button type={props.type} onClick={props.onClick}>{props.children}</button>
            <style jsx>{`
                button {
                    border: 3px solid black;
                    border-radius: 5px;
                    background-color: transparent;
                    color: black;
                    cursor: pointer;
                    font-family: 'Krona One', sans-serif;
                    display: block;
                    margin: ${props.margin ? props.margin : '0'};
                    padding: 10px 20px;
                    font-size: 1.25rem;
                    transition: all .2s ease-in;
                }

                button:hover {
                    transform: translateX(-4px) translateY(-4px);
                    transition: all .2s ease-in;
                }
            `}</style>
        </>
    )
}
