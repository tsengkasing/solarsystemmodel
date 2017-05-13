/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Mercury extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mercury: null,
        }
    }

    loop = new WHS.Loop(() => {
        // eslint-disable-next-line
        this.state.mercury.data.angle -= Constants.MERCURY.velocity;

        // eslint-disable-next-line
        this.state.mercury.position.x = Math.cos(this.state.mercury.data.angle) * Constants.MERCURY.orbit_radius;
        // eslint-disable-next-line
        this.state.mercury.position.z = Math.sin(this.state.mercury.data.angle) * Constants.MERCURY.orbit_radius;
    });

    componentDidMount() {

        this.state.mercury.addTo(this.props.parent);
        this.props.parent.addLoop(this.loop);
        this.loop.start();
    }

    render() {
        return (
            <Sphere
                geometry={{
                    radius: Constants.MERCURY.model_diam / 2,
                    detail: 2
                }}
                material={new THREE.MeshStandardMaterial({
                    color: Constants.MERCURY.color,
                    shading: THREE.FlatShading,
                    roughness: 0.8,
                    emissive: 0x270000
                })}
                position={[Constants.MERCURY.orbit_radius / 2, 0, 0]}
                refComponent={component => {
                    // eslint-disable-next-line
                    this.state.mercury = component;
                    // eslint-disable-next-line
                    this.state.mercury.data = {
                        angle: Math.random() * Math.PI * 2
                    };

                }}>
            </Sphere>
        );
    }
}