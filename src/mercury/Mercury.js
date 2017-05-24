/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';
import TEXTURE_MERCURY from '../textures/mercury.jpg';

export default class Mercury extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mercury: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.mercury.rotation.y += Constants.ROTATION_SCALE / Constants.MERCURY.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.mercury.position.x + 5;
            this.props.name.position.y = this.state.mercury.position.y + 5;
            this.props.name.position.z = this.state.mercury.position.z;
        }

        // eslint-disable-next-line
        this.state.mercury.data.angle -= Constants.MERCURY.velocity;

        // eslint-disable-next-line
        this.state.mercury.position.x = Math.cos(this.state.mercury.data.angle) * Constants.MERCURY.orbit_radius;
        // eslint-disable-next-line
        this.state.mercury.position.z = Math.sin(this.state.mercury.data.angle) * Constants.MERCURY.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.MERCURY.inclination;
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
                        radius: Constants.MERCURY.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: THREE.ImageUtils.loadTexture(TEXTURE_MERCURY),
                        roughness: 0.8
                    })}
                    position={[Constants.MERCURY.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.mercury = component;
                        // eslint-disable-next-line
                        this.state.mercury.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}