/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Jupiter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jupiter: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(!this.props.loop) return;
        // eslint-disable-next-line
        this.state.jupiter.rotation.y += Constants.ROTATION_SCALE / Constants.JUPITER.period;

        // eslint-disable-next-line
        this.state.jupiter.data.angle -= Constants.JUPITER.velocity;

        // eslint-disable-next-line
        this.state.jupiter.position.x = Math.cos(this.state.jupiter.data.angle) * Constants.JUPITER.orbit_radius;
        // eslint-disable-next-line
        this.state.jupiter.position.z = Math.sin(this.state.jupiter.data.angle) * Constants.JUPITER.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.JUPITER.inclination;
        this.state.jupiter.addTo(this.state.group);
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
                        radius: Constants.JUPITER.model_diam / 2,
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.JUPITER.color,
                        shading: THREE.FlatShading,
                        roughness: 0.8,
                        emissive: 0x270000
                    })}
                    position={[Constants.JUPITER.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.jupiter = component;
                        // eslint-disable-next-line
                        this.state.jupiter.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}