/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import TEXTURE_URANUS from '../textures/uranus.jpg';
import Constants from '../Constants';

export default class Uranus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uranus: null,
            group: null
        }
    }

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.uranus.rotation.y -= Constants.ROTATION_SCALE / Constants.URANUS.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.uranus.position.x + 10;
            this.props.name.position.y = this.state.uranus.position.y + 10;
            this.props.name.position.z = this.state.uranus.position.z;
        }

        // eslint-disable-next-line
        this.state.uranus.data.angle -= Constants.URANUS.velocity;

        // eslint-disable-next-line
        this.state.uranus.position.x = Math.cos(this.state.uranus.data.angle) * Constants.URANUS.orbit_radius;
        // eslint-disable-next-line
        this.state.uranus.position.z = Math.sin(this.state.uranus.data.angle) * Constants.URANUS.orbit_radius;
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.URANUS.inclination;
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
                        radius: Constants.URANUS.model_diam / 2,
                        detail: 2,
                        widthSegments: 32, // Number
                        heightSegments: 32 // Number
                    }}
                    material={new THREE.MeshStandardMaterial({
                        map: new THREE.TextureLoader().load(TEXTURE_URANUS),
                        roughness: 0.8
                    })}
                    position={[Constants.URANUS.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.uranus = component;
                        // eslint-disable-next-line
                        this.state.uranus.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}