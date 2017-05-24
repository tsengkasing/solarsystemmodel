/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import TEXTURE_PLUTO from '../textures/pluto.jpg';
import Constants from '../Constants';

export default class Pluto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pluto: null,
            group: null,
            name: null
        }
    }

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.pluto.rotation.y += Constants.ROTATION_SCALE / Constants.PLUTO.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.pluto.position.x + 10;
            this.props.name.position.y = this.state.pluto.position.y + 10;
            this.props.name.position.z = this.state.pluto.position.z;
        }

        // eslint-disable-next-line
        this.state.pluto.data.angle -= Constants.PLUTO.velocity;

        // eslint-disable-next-line
        this.state.pluto.position.x = Math.cos(this.state.pluto.data.angle) * Constants.PLUTO.orbit_radius;
        // eslint-disable-next-line
        this.state.pluto.position.z = Math.sin(this.state.pluto.data.angle) * Constants.PLUTO.orbit_radius;

        if(this.state.name) {
            this.state.name.position.x = this.state.pluto.position.x + 10;
            this.state.name.position.y = this.state.pluto.position.y + 10;
            this.state.name.position.z = this.state.pluto.position.z;
        }
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.PLUTO.inclination;
        this.state.group.addTo(this.props.parent);
        this.props.parent.addLoop(this.loop);
        this.loop.start();
    }

    render() {
        return (
            <Group
                refComponent={component => {
                    // eslint-disable-next-line
                    this.state.group = component;
                }}
            >
                <Sphere
                    geometry={{
                        radius: Constants.PLUTO.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: THREE.ImageUtils.loadTexture(TEXTURE_PLUTO),
                        roughness: 0.8
                    })}
                    position={[Constants.PLUTO.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.pluto = component;
                        // eslint-disable-next-line
                        this.state.pluto.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}