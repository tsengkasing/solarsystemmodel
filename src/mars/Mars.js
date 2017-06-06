/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import TEXTURE_MARS from '../textures/mars.jpg';
import Constants from '../Constants';

export default class Mars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mars: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.mars.rotation.y += Constants.ROTATION_SCALE / Constants.MARS.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.mars.position.x + 10;
            this.props.name.position.y = this.state.mars.position.y + 10;
            this.props.name.position.z = this.state.mars.position.z;
        }

        // eslint-disable-next-line
        this.state.mars.data.angle -= Constants.MARS.velocity;

        // eslint-disable-next-line
        this.state.mars.position.x = Math.cos(this.state.mars.data.angle) * Constants.MARS.orbit_radius;
        // eslint-disable-next-line
        this.state.mars.position.z = Math.sin(this.state.mars.data.angle) * Constants.MARS.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.MARS.inclination;
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
                        radius: Constants.MARS.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: new THREE.TextureLoader().load(TEXTURE_MARS),
                        roughness: 0.8
                    })}
                    position={[Constants.MARS.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.mars = component;
                        // eslint-disable-next-line
                        this.state.mars.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}