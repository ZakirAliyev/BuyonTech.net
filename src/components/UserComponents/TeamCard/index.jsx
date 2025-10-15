import React from 'react'
import professor from '/src/assets/professor.png'
import './index.scss'
const TeamCard = () => {
    return (
        <div id="teamCard">
            <div className="imageBox">
                <img src={professor} alt="" />
            </div>
            <div className="absoluteBox">
                <div className="absoluteBoxInside">
                    <h2>
                        Elvar Aghamaliev
                    </h2>
                    <p>
                        Founder
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
