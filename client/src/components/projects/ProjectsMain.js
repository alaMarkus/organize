import React from 'react'

import'./projectsmain.css'
import ProjectsMenu from './ProjectsMenu'
import PartsMenu from './PartsMenu'

const PartsMain = () => {

    return (
        <div className="parts-main-container">
            <ProjectsMenu>
                <PartsMenu />
            </ProjectsMenu>
        </div>
    )
}

export default PartsMain;


