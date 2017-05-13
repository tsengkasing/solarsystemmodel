import React from 'react';
import {App, Sphere, AmbientLight, DirectionalLight} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from './Constants';
import Earth from './earth/Earth';
import Mercury from './mercury/Mercury';
import Venus from './venus/Venus';

const Empty = () => <div/>;

const colors = {
    green: 0x8fc999,
    blue: 0x5fc4d0,
    orange: 0xee5624,
    yellow: 0xfaff70
};

const mouse = new WHS.app.VirtualMouseModule();

const moveCamera = (event, position) => {
    let {x, y, z} = position;
    let runVelocity = Constants.CAMERA_SPEED;
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            z -= runVelocity;
            break;

        case 37: // left
        case 65: // a
            x -= runVelocity;
            break;

        case 40: // down
        case 83: // s
            z += runVelocity;
            break;

        case 39: // right
        case 68: // d
            x += runVelocity;
            break;

        case 16: // shift
            Constants.CAMERA_SPEED *= 2;
            break;

        default:break;
    }
    return {x, y, z};
};

class World extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            world: null,

            //视角
            view: new WHS.app.CameraModule({
                position: new THREE.Vector3(0, 100, 400),
                far: 2000,
                near: 1
            }),

            sun: null,

            earth: <Empty/>,
            mercury: <Empty/>,
            venus: <Empty/>,
        }
    }

    loop = new WHS.Loop(() => {
        this.state.sun.rotation.y += 0.005;
    });

    criterion = () => {
        new WHS.Sphere({ // Create sphere comonent.
            geometry: {
                radius: 3,
                widthSegments: 32,
                heightSegments: 32
            },

            material: new THREE.MeshPhongMaterial({
                color: 0x00ff00
            }),

            position: new THREE.Vector3(0, 100, 1000)
        }).addTo(this.state.world);
    };

    componentDidMount() {
        this.criterion();
        this.state.world.addLoop(this.loop);
        this.loop.start();

        this.setState({
            mercury: <Mercury parent={this.state.world}/>,
            earth: <Earth parent={this.state.world} />,
            venus: <Venus parent={this.state.world} />,
        });

        this.state.sun.on('mouseover', () => {
            // this.state.sun.material.color.set(0xffff00);
            console.log('mouseover sun');
        });

        mouse.track(this.state.sun);

        document.body.addEventListener('keydown', (event) => {
            this.state.view.camera.position = moveCamera(event, this.state.view.camera.position);
            console.log(this.state.view.camera.position);
        }, false);

        document.body.addEventListener('keyup', (event) => {
            if(event.keyCode === 16)
                Constants.CAMERA_SPEED /= 2;
        }, false);
    }

    render() {
        return (
            <App modules={[
                    new WHS.app.ElementModule(),
                    new WHS.app.SceneModule(),
                    this.state.view,
                    new WHS.app.RenderingModule({
                        bgColor: 0x2a3340,

                        renderer: {
                            antialias: true,
                            shadowmap: {
                                type: THREE.PCFSoftShadowMap
                            }
                        }
                    }),
                    new WHS.controls.OrbitModule(),
                    new WHS.app.ResizeModule(),
                    mouse
                ]}
                refApp={world => {
                    this.state.world = world
                }}>
                <AmbientLight
                    light={{
                        color: 0x663344,
                        intensity: 2
                    }}
                />
                <DirectionalLight
                    light={{
                        color: 0xffffff,
                        intensity: 1.5,
                        distance: 800
                    }}
                    shadowmap={{
                        width: 2048,
                        height: 2048,

                        left: -800,
                        right: 800,
                        top: 800,
                        bottom: -800,
                        far: 800
                    }}
                    position={{
                        x: 300,
                        z: 300,
                        y: 100
                    }}
                />
                <Sphere
                    geometry={{
                        radius: Constants.SUN.model_diam / 2,
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.SUN.color,
                        shading: THREE.FlatShading,
                        roughness: 0.9,
                        emissive: 0x270000
                    })}
                    refComponent={component => {
                        this.state.sun = component;
                    }}
                />
                {this.state.mercury}
                {this.state.earth}
                {this.state.venus}
            </App>
        );
    }
}

export default World;
