import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {
    Stage,
    Lightformer,
    Environment,
    Sky,
    ContactShadows,
    RandomizedLight,
    AccumulativeShadows,
    SoftShadows,
    BakeShadows,
    useHelper,
    OrbitControls,
} from '@react-three/drei'
import { useControls, button } from 'leva'
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
            shadowsColor: '#4b2709',
            shadowsOpacity: { value: 0.6, min: 0, max: 1, step: 0.01 },
            shadowsBlur: { value: 2.8, min: 0, max: 10, step: 0.01 },
        }
    )
    // const { sunPosition } = useControls('Sun', {
    //     sunPosition: { value: [1, 2, 3] },
    // })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
        useControls('environment map', {
            envMapIntensity: { value: 1, min: 0, max: 12 },
            envMapHeight: { value: 7, min: 0, max: 100 },
            envMapRadius: { value: 28, min: 10, max: 1000 },
            envMapScale: { value: 100, min: 10, max: 1000 },
        })

    const scene = useThree((state) => state.scene)
    useEffect(() => {
        scene.environmentIntensity = envMapIntensity
    }, [envMapIntensity])

    return (
        <>
            {/* <Environment
                // files={[
                //     './environmentMaps/2/px.jpg',
                //     './environmentMaps/2/nx.jpg',
                //     './environmentMaps/2/py.jpg',
                //     './environmentMaps/2/ny.jpg',
                //     './environmentMaps/2/pz.jpg',
                //     './environmentMaps/2/nz.jpg',
                // ]}
                // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
                preset='sunset'
                intensity={envMapIntensity}
                ground={{
                    height: envMapHeight,
                    radius: envMapRadius,
                    scale: envMapScale,
                }}
            > */}
            {/* <Lightformer
                    position-z={-5}
                    scale={5}
                    color='red'
                    intensity={10}
                    form='ring'
                /> */}
            {/* <mesh position-z={-5} scale={10}>
                    <planeGeometry />
                    <meshBasicMaterial color={[10, 0, 0]} />
                </mesh> */}
            {/* </Environment> */}
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
            {/* <ContactShadows
                position={[0, 0, 0]}
                scale={10}
                resolution={512}
                far={5}
                color={shadowsColor}
                opacity={shadowsOpacity}
                blur={shadowsBlur}
                // frames={1} -> TO BAKE THE SHADOWS TO THE 1ST FRAME
            /> */}
            <Perf position='top-left' />
            <OrbitControls makeDefault />
            {/* <directionalLight
                ref={directionalLightRef}
                position={sunPosition}
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
            <ambientLight intensity={1.5} /> */}
            {/* <Sky sunPosition={sunPosition} /> */}
            {/* <mesh castShadow position-x={-2} position-y={1}>
                <sphereGeometry />
                <meshStandardMaterial color='orange' />
            </mesh>

            <mesh
                castShadow
                ref={cubeRef}
                position-x={2}
                scale={1.5}
                position-y={1}
            >
                <boxGeometry />
                <meshStandardMaterial color='mediumpurple' />
            </mesh> */}
            {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow' />
            </mesh> */}
            {/* STAGE */}
            {/* STAGE */}
            {/* STAGE */}
            <Stage
                shadows={{
                    type: 'contact',
                    opacity: 0.6,
                    blur: 1,
                }}
                environment='sunset'
                preset='portrait'
                intensity={envMapIntensity}
            >
                <mesh castShadow position-x={-2} position-y={1}>
                    <sphereGeometry />
                    <meshStandardMaterial color='orange' />
                </mesh>
                <mesh
                    castShadow
                    ref={cubeRef}
                    position-x={2}
                    scale={1.5}
                    position-y={1}
                >
                    <boxGeometry />
                    <meshStandardMaterial color='mediumpurple' />
                </mesh>
            </Stage>
        </>
    )
}
