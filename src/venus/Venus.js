/**
 * Created by Think on 2017/5/13.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import TEXTURE_VENUS from '../textures/venus.jpg';
import Constants from '../Constants';

export default class Venus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            venus: null,
            group: null,
        }
    }

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.venus.rotation.y -= Constants.ROTATION_SCALE / Constants.VENUS.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.venus.position.x + 10;
            this.props.name.position.y = this.state.venus.position.y + 10;
            this.props.name.position.z = this.state.venus.position.z;
        }

        // eslint-disable-next-line
        this.state.venus.data.angle -= Constants.VENUS.velocity;

        // eslint-disable-next-line
        this.state.venus.position.x = Math.cos(this.state.venus.data.angle) * Constants.VENUS.orbit_radius;
        // eslint-disable-next-line
        this.state.venus.position.z = Math.sin(this.state.venus.data.angle) * Constants.VENUS.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.VENUS.inclination;
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
                        radius: Constants.VENUS.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: new THREE.TextureLoader().load(TEXTURE_VENUS),
                        roughness: 0.8
                    })}
                    position={[Constants.VENUS.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.venus = component;
                        // eslint-disable-next-line
                        this.state.venus.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}