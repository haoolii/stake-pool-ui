import React from 'react';

import haoJpeg from '../assets/hao.jpeg';

interface Props {
    
}

export const Home = (props: Props) => {
    return (
        <div className="rounded-full overflow-hidden shadow-stone-200">
            <img width="250" height="250" alt='logo' src={haoJpeg}/>
        </div>
    )
}
