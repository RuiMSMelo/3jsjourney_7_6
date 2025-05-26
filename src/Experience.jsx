import { useFrame } from '@react-three/fiber'
import {
    ContactShadows,
    RandomizedLight,
    AccumulativeShadows,
    SoftShadows,
    BakeShadows,
    useHelper,
    OrbitControls,
} from '@react-three/drei'
import { useControls, button } from 'leva'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience() {
    const directionalLightRef = useRef()
    const cubeRef = useRef()

    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime
        // cubeRef.current.position.x = 2 + Math.sin(time)
        cubeRef.current.rotation.y += delta * 0.4
    })

    const { shadowsColor, shadowsOpacity, shadowsBlur } = useControls(
        'Contact Shadow',
        {
            shadowsColor: '#1039a0',
            shadowsOpacity: { value: 0.4, min: 0, max: 1, step: 0.01 },
            shadowsBlur: { value: 2.8, min: 0, max: 10, step: 0.01 },
        }
    )

    return (
        <>
            {/* <BakeShadows /> */}
            {/* <SoftShadows size={25} samples={10} focus={0} /> */}
            {/* <AccumulativeShadows
                color='#316d39'
                opacity={0.8}
                frames={Infinity}
                position={[0, -0.99, 0]}
                scale={10}
                temporal
                blend={100}
            >
                <RandomizedLight
                    amount={4}
                    radius={0.5}
                    ambient={0.5}
                    intensity={3}
                    position={[1, 2, 3]}
                    bias={0.001}
                />{' '}
            </AccumulativeShadows> */}

            <ContactShadows
                position={[0, -0.99, 0]}
                scale={10}
                resolution={512}
                far={5}
                color={shadowsColor}
                opacity={shadowsOpacity}
                blur={shadowsBlur}
                // frames={1} -> TO BAKE THE SHADOWS TO THE 1ST FRAME
            />

            <Perf position='top-left' />

            <OrbitControls makeDefault />

            <directionalLight
                ref={directionalLightRef}
                position={[1, 2, 3]}
                intensity={4.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={1.5} />

            <mesh castShadow position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color='orange' />
            </mesh>

            <mesh castShadow ref={cubeRef} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color='mediumpurple' />
            </mesh>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow' />
            </mesh>
        </>
    )
}
