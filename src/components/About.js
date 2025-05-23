import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

import './styles/About.scss';
import Footer from './Footer';
import SceneLoader from './SceneLoader';

function MichiModel({ ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/Michi_3D_smiling.glb')

    useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh position={[0, -0.6, 0]} rotation={[0, -2, 0]} scale={[1.1, 1.1, 1.1]} geometry={nodes.michi_smiling.geometry} material={materials['Michi_FINAL_MAT.002']} />
        </group>
    )
}

const About = ({ theme, min781, aboutHintEnabled, setAboutHintEnabled }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className={'About' + ' ' + theme}>
            <div className='Wrapper'>

                <div className='Portrait'>
                    {!loading && aboutHintEnabled && <span className='Hint'>rotate me!</span>}
                    <div className='CanvasWrapper' onPointerUp={() => setAboutHintEnabled(false)}>
                        {loading && <SceneLoader theme={theme} />}
                        <Canvas dpr={window.devicePixelRatio}>
                            <OrbitControls autoRotate dampingFactor={0.3} enablePan={false} enableZoom={false} autoRotateSpeed={-0.5} />

                            <Suspense fallback={null}>
                                <ambientLight intensity={0.9} />
                                <MichiModel setLoading={setLoading} />
                            </Suspense>
                        </Canvas>
                    </div>

                </div>
                <div className='Bio' >
                    {!min781 &&
                        <div className='PullBarWrapper'>
                            <div className='PullBar' />
                        </div>
                    }
                    <h1>
                        Hi ✌️ I'm Michael
                    </h1>

                    <h3>
                        Work Experience
                    </h3>
                    <p>
                        full stack developer at <a href='https://vrisch.com' target='_blank' rel="noreferrer">vrisch</a>, Vienna
                        <br />
                        webGL/webXR developer at <a href='https://ravespace.io' target='_blank' rel="noreferrer">RAVE.SPACE</a>, Berlin
                        <br />
                        interaction developer at <a href='https://www.re-spaces.com' target='_blank' rel="noreferrer">Responsive Spaces</a>, Linz
                        <br />
                        3D design intern at <a href='https://www.crazyeye.at' target='_blank' rel="noreferrer">Crazy Eye</a>, Vienna
                    </p>

                    <h3>
                        Current Reads
                    </h3>
                    <p>
                        <span className="Book">I who have never known men</span> by Jacqueline Harpman
                        <br />
                        <span className="Book">Confessions of a Mask</span> by Yukio Mishima
                        <br />
                        <span className="Book">Star Maker</span> by Olaf Stapledon
                    </p>

                    <h3>
                        Favourite Animal
                    </h3>
                    <p>
                        Literally any insect... 🦋🐝🐞🦟🐜🪲
                    </p>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    )
}

export default About