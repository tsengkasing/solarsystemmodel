/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Earth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            earth: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(!this.props.loop) return;
        // eslint-disable-next-line
        this.state.earth.rotation.y += Constants.ROTATION_SCALE / Constants.EARTH.period;

        // eslint-disable-next-line
        this.state.earth.data.angle -= Constants.EARTH.velocity;

        // eslint-disable-next-line
        this.state.earth.position.x = Math.cos(this.state.earth.data.angle) * Constants.EARTH.orbit_radius;
        // eslint-disable-next-line
        this.state.earth.position.z = Math.sin(this.state.earth.data.angle) * Constants.EARTH.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
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
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.EARTH.color,
                        shading: THREE.FlatShading,
                        roughness: 0.8,
                        emissive: 0x270000
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