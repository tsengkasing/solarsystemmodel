/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

export default class Pluto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pluto: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(!this.props.loop) return;
        // eslint-disable-next-line
        this.state.pluto.rotation.y += Constants.ROTATION_SCALE / Constants.PLUTO.period;

        // eslint-disable-next-line
        this.state.pluto.data.angle -= Constants.PLUTO.velocity;

        // eslint-disable-next-line
        this.state.pluto.position.x = Math.cos(this.state.pluto.data.angle) * Constants.PLUTO.orbit_radius;
        // eslint-disable-next-line
        this.state.pluto.position.z = Math.sin(this.state.pluto.data.angle) * Constants.PLUTO.orbit_radius;
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
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.PLUTO.color,
                        shading: THREE.FlatShading,
                        roughness: 0.8,
                        emissive: 0x270000
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