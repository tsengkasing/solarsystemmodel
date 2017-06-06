import React from 'react';
import {App, Sphere, DirectionalLight} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import * as PHYSICS from 'physics-module-ammonext';

import Constants from './Constants';
import Mercury from './mercury/Mercury';
import Venus from './venus/Venus';
import Earth from './earth/Earth';
import Mars from './mars/Mars';
import Jupiter from './jupiter/Jupiter';
import Saturn from './saturn/Saturn';
import Uranus from './uranus/Uranus';
import Neptune from './neptune/Neptune';
import Pluto from './pluto/Pluto';

import Utils from './Utils';

import TEXTURE_SUN from './textures/sun.jpg';

const Empty = () => <div/>;
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

const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

let stars = [];

class World extends React.Component {

    constructor(props) {
        super(props);
        this.angle = 0;
        this.state = {
            world: null,

            view_target: new WHS.Sphere({modules: [new PHYSICS.SphereModule()]}),

            //场景
            scene: new WHS.app.SceneModule(),

            //视角
            view: new WHS.app.CameraModule({
                position: new THREE.Vector3(0, 100, 400),
                far: 100000,
                near: 1
            }),

            sun: null,

            mercury: false,
            venus: false,
            earth: false,
            mars: false,
            jupiter: false,
            saturn: false,
            uranus: false,
            neptune: false,
            pluto: false,

            name: []
        }
    }

    loop = new WHS.Loop(() => {
        // eslint-disable-next-line
        this.state.sun.rotation.y += Constants.ROTATION_SCALE / Constants.SUN.period;

        this.updateCamera();

        // let _z = this.state.view.camera.position.z;
        // if(_z > -4000)
        //     this.state.view.camera.position.z -= 3;
        // else
        //     this.state.view.camera.position.z += 3;
        // console.log(this.state.view.camera.position.z);
    });

    updateCamera = () => {
        if(this.props.view === 'overall') { return; }
        else if(this.props.view === 'moon') {
            let {x, y, z} = this.refs['earth'].state['moon'].position;
            // eslint-disable-next-line
            this.state.view.camera.position = {x: x, y: y, z: z};
            //自转角度
            // this.angle += Math.PI / 180;
            // eslint-disable-next-line
            // this.state.view.camera._native.rotateOnAxis((new THREE.Vector3(0, 1, 0)).normalize(), this.angle);
            return;
        }


        let {x, y, z} = this.refs[this.props.view].state[this.props.view].position;
        // eslint-disable-next-line
        this.state.view.camera.position = {x: x, y: y, z: z};

        //自转角度
        this.angle -= Constants[this.props.view.toUpperCase()].period * Math.PI / 180;
        // eslint-disable-next-line
        // this.state.view.camera._native.rotateOnAxis((new THREE.Vector3(0, 1, 0)).normalize(), this.angle);

    };


    //=========================================================================================================
    //背景的星空
    addStars = () => {
        for ( let z= -1000; z < 1000; z+=20 ) {

            let geometry   = new THREE.SphereGeometry(0.5, 32, 32);
            let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
            let sphere = new THREE.Mesh(geometry, material);

            sphere.position.x = Utils.randomRange(-1 * Math.floor(WIDTH/2),Math.floor(WIDTH/2));
            sphere.position.y = Utils.randomRange(-1 * Math.floor(HEIGHT/2),Math.floor(HEIGHT/2));

            // Then set the z position to where it is in the loop (distance of camera)
            sphere.position.z = z;

            // scale it up a bit
            sphere.scale.x = sphere.scale.y = 2;

            //add the sphere to the scene
            this.state.scene.scene.add( sphere );

            //finally push it to the stars array
            stars.push(sphere);
        }
    };
    //背景的星空
    //=========================================================================================================

    drawOrbit = (radius, rotation) => {
        let segments = 512,
            geometry = new THREE.CircleGeometry( radius, segments );

        geometry.vertices.shift();

        let points = geometry.vertices.map(point => new THREE.Vector3(point.x, point.z, point.y));

        let orbit = new WHS.Group();

        for(let i= 0; i < points.length; i++) {
            let pre = points[i];
            let next = i >= points.length - 1 ? points[0] : points[i + 1];
            let line = new WHS.Line({
                geometry: {
                    curve: new THREE.LineCurve3(pre, next)
                },

                material: new THREE.MeshBasicMaterial({
                    color: 0xffffff
                })
            });

            line.addTo(orbit);
        }

        if(rotation)
            orbit.rotation.z=rotation;
        else
            orbit.rotation.z=0;

        this.state.world.add(orbit);
    };

    componentDidMount() {

        this.drawOrbit(Constants.MERCURY.orbit_radius, Constants.MERCURY.inclination);
        this.drawOrbit(Constants.VENUS.orbit_radius, Constants.VENUS.inclination);
        this.drawOrbit(Constants.EARTH.orbit_radius, Constants.EARTH.inclination);
        this.drawOrbit(Constants.MARS.orbit_radius, Constants.MARS.inclination);
        this.drawOrbit(Constants.JUPITER.orbit_radius, Constants.JUPITER.inclination);
        this.drawOrbit(Constants.SATURN.orbit_radius, Constants.SATURN.inclination);
        this.drawOrbit(Constants.URANUS.orbit_radius, Constants.URANUS.inclination);
        this.drawOrbit(Constants.NEPTUNE.orbit_radius, Constants.NEPTUNE.inclination);
        this.drawOrbit(Constants.PLUTO.orbit_radius, Constants.PLUTO.inclination);

        this.state.world.addLoop(this.loop);
        this.loop.start();


        this.setState({
            mercury: true,
            venus: true,
            earth: true,
            mars: true,
            jupiter: true,
            saturn: true,
            uranus: true,
            neptune: true,
            pluto: true,
        }, () => {
            this.setUpMouseListener();
        });

        new THREE.FontLoader().load('fonts/yeliqunjiheqiebianticu_Regular.json', font => {
            this.addStarNames(font);
        });

        this.setUpKeyListener();

        this.addStars();
    }

    addStarNames = (font) => {
        const opts = {
            font: font,
            size: 4,
            height: 1,
            curveSegments: 32,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 0.3,
            bevelSegments: 5
        };

        let star_name_label = [];
        let star_names = ['太阳', '水星', '金星', '地球', '火星', '木星', '土星', '天王星', '海王星', '冥王星'];
        // let star_names = ['SUN', 'Mercury', 'Venus', 'Earth', 'Mars', 'Juniper', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
        star_names.forEach((star, index)=>{
            let text = new THREE.Mesh(new THREE.TextGeometry(star, opts),
                new THREE.MeshBasicMaterial({ color: 0xffffff }));
            // text.geometry.vertices = text.geometry.vertices.slice(0, 100);
            this.state.scene.scene.add(text);
            // text.position.x = index * 1000;
            star_name_label.push(text);
        });

        //设置太阳的位置
        star_name_label[0].position.x = -6;
        star_name_label[0].position.y = 24;

        this.setState({
            name: star_name_label
        })
    };

    setUpMouseListener = () => {
        this.state.sun.on('mouseover', () => {
            this.props.intro(-1);
        });
        mouse.track(this.state.sun);

        ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].forEach((planet, index) => {
            const _planet = this.refs[planet].state[planet];
            _planet.on('mouseover', () => {
                this.props.intro(index);
            });
            mouse.track(_planet);
        });

        const moon = this.refs['earth'].state['moon'];
        moon.on('mouseover', () => {
            this.props.intro(9);
        });
        mouse.track(moon);
    };

    setUpKeyListener = () => {
        document.body.addEventListener('keydown', (event) => {
            // eslint-disable-next-line
            this.state.view.camera.position = moveCamera(event, this.state.view.camera.position);
            // console.log(this.state.view.camera.position);
        }, false);

        document.body.addEventListener('keyup', (event) => {
            if(event.keyCode === 16)
                Constants.CAMERA_SPEED /= 2;
        }, false);
    };

    render() {
        return (
            <App modules={[
                    new WHS.app.ElementModule(),
                    this.state.scene,
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
                    // //第一人称视角
                    // new PHYSICS.FirstPersonModule(this.state.view_target, {
                    //     speed: 500,
                    //     ypos: 0
                    // }),
                    new WHS.controls.OrbitModule(),
                    new WHS.app.ResizeModule(),
                    mouse
                ]}
                refApp={world => {
                    // eslint-disable-next-line
                    this.state.world = world
                }}
                 ref="world"
            >
                {/*<AmbientLight*/}
                    {/*light={{*/}
                        {/*color: 0x663344,*/}
                        {/*intensity: 2*/}
                    {/*}}*/}
                {/*/>*/}
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
                        detail: 2,
                        widthSegments: 64, // Number
                        heightSegments: 64 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: new THREE.TextureLoader().load(TEXTURE_SUN),
                        emissive: 0xff0000
                        // map: THREE.TextureLoader(TEXTURE_SUN)
                        // color: Constants.SUN.color,
                        // shading: THREE.FlatShading,
                        // roughness: 0,
                        // emissive: 0x270000
                    })}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.sun = component;
                    }}
                />
                {this.state.mercury ? <Mercury ref="mercury" parent={this.state.world}
                                               loop={{rotation: this.props.rotation[0], revolution: this.props.revolution[0]}}
                                               name={this.state.name[1]}/> : <Empty/>}

                {this.state.venus ? <Venus ref="venus" parent={this.state.world}
                                           loop={{rotation: this.props.rotation[1], revolution: this.props.revolution[1]}}
                                           name={this.state.name[2]} /> : <Empty/>}
                {this.state.earth ? <Earth ref="earth" parent={this.state.world}
                                           loop={{rotation: this.props.rotation[2], revolution: this.props.revolution[2]}}
                                           loopOfMoon={{rotation: this.props.rotation[9], revolution: this.props.revolution[9]}}
                                           name={this.state.name[3]} /> : <Empty/>}
                {this.state.mars ? <Mars ref="mars" parent={this.state.world}
                                         loop={{rotation: this.props.rotation[3], revolution: this.props.revolution[3]}}
                                         name={this.state.name[4]} /> : <Empty/>}
                {this.state.jupiter ? <Jupiter ref="jupiter" parent={this.state.world}
                                               loop={{rotation: this.props.rotation[4], revolution: this.props.revolution[4]}}
                                               name={this.state.name[5]}/> : <Empty/>}
                {this.state.saturn ? <Saturn ref="saturn" parent={this.refs.world}
                                             loop={{rotation: this.props.rotation[5], revolution: this.props.revolution[5]}}
                                             name={this.state.name[6]}/> : <Empty/>}
                {this.state.uranus ? <Uranus ref="uranus" parent={this.state.world}
                                             loop={{rotation: this.props.rotation[6], revolution: this.props.revolution[6]}}
                                             name={this.state.name[7]} /> : <Empty/>}
                {this.state.neptune ? <Neptune ref="neptune" parent={this.state.world}
                                               loop={{rotation: this.props.rotation[7], revolution: this.props.revolution[7]}}
                                               name={this.state.name[8]} /> : <Empty/>}
                {this.state.pluto ? <Pluto ref="pluto" parent={this.state.world}
                                           loop={{rotation: this.props.rotation[8], revolution: this.props.revolution[8]}}
                                           name={this.state.name[9]} /> : <Empty/>}
            </App>
        );
    }
}

export default World;
