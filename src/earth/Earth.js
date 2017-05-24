/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';
import TEXTURE_EARTH from '../textures/earth.jpg';
import TEXTURE_MOON from '../textures/moon.jpg';

export default class Earth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            earth: null,
            group: null,
            moon: null
        }
    }

    addMoon = () => {
        const moon = new WHS.Sphere({
            geometry: {
                radius: Constants.MOON.model_diam / 2,
                detail: 2,
                widthSegments: 32, // Number
                heightSegments: 32 // Number
            },

            material: new THREE.MeshStandardMaterial({
                map: THREE.ImageUtils.loadTexture(TEXTURE_MOON),
                roughness: 0.8,
            })
        });

        // Particle data.
        moon.data = {
            distance: 5,
            angle: Math.random() * Math.PI * 2
        };

        // Set position & rotation.
        moon.position.x = Math.cos(moon.data.angle) * moon.data.distance + this.state.earth.position.x;
        moon.position.z = Math.sin(moon.data.angle) * moon.data.distance + this.state.earth.position.z;
        moon.position.y = this.state.earth.position.y;

        moon.rotation.set(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random());

        moon.addTo(this.state.group);
        // eslint-disable-next-line
        this.state.moon = moon;
    };

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.earth.rotation.y += Constants.ROTATION_SCALE / Constants.EARTH.period;
        }

        if(this.props.loop.revolution) {
            if(this.props.name) {
                this.props.name.position.x = this.state.earth.position.x + 10;
                this.props.name.position.y = this.state.earth.position.y + 10;
                this.props.name.position.z = this.state.earth.position.z;
            }

            // eslint-disable-next-line
            this.state.earth.data.angle -= Constants.EARTH.velocity;

            // eslint-disable-next-line
            this.state.earth.position.x = Math.cos(this.state.earth.data.angle) * Constants.EARTH.orbit_radius;
            // eslint-disable-next-line
            this.state.earth.position.z = Math.sin(this.state.earth.data.angle) * Constants.EARTH.orbit_radius;
        }

        if(this.props.loopOfMoon.rotation) {
            this.state.moon.rotation.y -= Constants.ROTATION_SCALE / Constants.MOON.period * 10;
        }

        if(this.props.loopOfMoon.revolution) {
            this.state.moon.data.angle -= 0.02;

            this.state.moon.position.x = Math.cos(this.state.moon.data.angle) * this.state.moon.data.distance + this.state.earth.position.x;
            this.state.moon.position.z = Math.sin(this.state.moon.data.angle) * this.state.moon.data.distance + this.state.earth.position.z;
        }
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.addMoon();
        this.state.group.rotation.z = Constants.EARTH.inclination;
        this.state.group.addTo(this.props.parent);
        this.props.parent.addLoop(this.loop);
        this.loop.start();
    }


    render() {
        return (
            <Group
                refComponent={component=> {
                    // eslint-disable-next-line
                    this.state.group = component;
                }}
            >
                <Sphere
                    geometry={{
                        radius: Constants.EARTH.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: THREE.ImageUtils.loadTexture(TEXTURE_EARTH),
                        roughness: 0.8,
                    })}
                    position={[Constants.EARTH.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.earth = component;
                        // eslint-disable-next-line
                        this.state.earth.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
            );
        }
}