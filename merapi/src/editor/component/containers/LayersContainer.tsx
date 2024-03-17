import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../RootEditor";

const LayersContainer = (props: ContainerProps) => {

    const { config } = useRoot();

    config.layerManager = {
        appendTo: '.container-layers',
    }

    return (
        <div className="container-layers" id={props.id} ></div>
    )
}

export default LayersContainer;