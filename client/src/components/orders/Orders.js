import React from 'react'
import BatchMenu from './BatchMenu'
import projectsMenu from '../projects/ProjectsMenu'

import './orders.css'
import ProjectsMenu from '../projects/ProjectsMenu';

const Orders = () =>{
    return (
        <div>
            <ProjectsMenu>
                <BatchMenu />
            </ProjectsMenu>
        </div>
    )
}


export default Orders