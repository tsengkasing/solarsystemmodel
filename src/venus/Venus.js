/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Venus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            venus: null,
        }
    }

    loop = new WHS.Loop(() => {
        // eslint-disable-next-line
        this.state.venus.data.angle -= Constants.VENUS.velocity;

        // eslint-disable-next-line
        this.state.venus.position.x = Math.cos(this.state.venus.data.angle) * Constants.VENUS.orbit_radius;
        // eslint-disable-next-line
        this.state.venus.position.z = Math.sin(this.state.venus.data.angle) * Constants.VENUS.orbit_radius;
    });

    componentDidMount() {

        this.state.venus.addTo(this.props.parent);
        this.props.parent.addLoop(this.loop);
        this.loop.start();
    }

    render() {
        return (
            <Sphere
                geometry={{
                    radius: Constants.VENUS.model_diam / 2,
                    detail: 2
                }}
                material={new THREE.MeshStandardMaterial({
                    color: Constants.VENUS.color,
                    shading: THREE.FlatShading,
                    roughness: 0.8,
                    emissive: 0x270000
                })}
                position={[Constants.VENUS.orbit_radius / 2, 0, 0]}
                refComponent={component => {
                    // eslint-disable-next-line
                    this.state.venus = component;
                    // eslint-disable-next-line
                    this.state.venus.data = {
                        angle: Math.random() * Math.PI * 2
                    };

                }}>
            </Sphere>
        );
    }
}