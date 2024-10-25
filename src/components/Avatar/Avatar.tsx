import React from "react";

import "./Avatar.css";

interface Props {
    alt: string,
    src: string,
}

const Avatar = ({alt, src}: Props) => {
    return(
        <>
            <img className="icon-image" alt={alt} src={src}/>
        </>
    )
}

export default Avatar;