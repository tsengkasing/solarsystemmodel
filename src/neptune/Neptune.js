/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Neptune extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            neptune: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(!this.props.loop) return;
        // eslint-disable-next-line
        this.state.neptune.rotation.y += Constants.ROTATION_SCALE / Constants.NEPTUNE.period;

        // eslint-disable-next-line
        this.state.neptune.data.angle -= Constants.NEPTUNE.velocity;

        // eslint-disable-next-line
        this.state.neptune.position.x = Math.cos(this.state.neptune.data.angle) * Constants.NEPTUNE.orbit_radius;
        // eslint-disable-next-line
        this.state.neptune.position.z = Math.sin(this.state.neptune.data.angle) * Constants.NEPTUNE.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.NEPTUNE.inclination;
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
                        radius: Constants.NEPTUNE.model_diam / 2,
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.NEPTUNE.color,
                        shading: THREE.FlatShading,
                        roughness: 0.8,
                        emissive: 0x270000
                    })}
                    position={[Constants.NEPTUNE.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.neptune = component;
                        // eslint-disable-next-line
                        this.state.neptune.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}