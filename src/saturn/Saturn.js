/**
 * Created by Think on 2017/5/14.
 */
import React from 'react';
import {Sphere, Group} from 'react-whs';
import * as WHS from 'whs';
import * as THREE from 'three';

import Constants from '../Constants';

const radiusMin = 110, // Min radius of the asteroid belt.
    radiusMax = 220, // Max radius of the asteroid belt.
    particleCount = 400, // Ammount of asteroids.
    particleMinRadius = 0.1, // Min of asteroid radius.
    particleMaxRadius = 4; // Max of asteroid radius.

const colors = {
    green: 0x8fc999,
    blue: 0x5fc4d0,
    orange: 0xee5624,
    yellow: 0xfaff70
};

export default class Saturn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            saturn: null,
            asteroids: [],
            group: null
        }
    }

    loadAsteroids = () => {
        const dynamicGeometry = new WHS.mesh.DynamicGeometryModule();

        const s1 = new WHS.Dodecahedron({
            geometry: {
                buffer: true,
                radius: 10
            },

            modules: [
                dynamicGeometry
            ],

            material: new THREE.MeshStandardMaterial({
                shading: THREE.FlatShading,
                emissive: 0x270000,
                roughness: 0.9
            })
        });

        const s2 = new WHS.Box({
            geometry: {
                buffer: true,
                width: 10,
                height: 10,
                depth: 10
            },

            modules: [
                dynamicGeometry
            ],

            material: new THREE.MeshStandardMaterial({
                shading: THREE.FlatShading,
                roughness: 0.9,
                emissive: 0x270000
            })
        });

        const s3 = new WHS.Cylinder({
            geometry: {
                buffer: true,
                radiusTop: 0,
                radiusBottom: 10,
                height: 10
            },

            modules: [
                dynamicGeometry
            ],

            material: new THREE.MeshStandardMaterial({
                shading: THREE.FlatShading,
                roughness: 0.9,
                emissive: 0x270000
            })
        });

        const s4 = new WHS.Sphere({
            geometry: {
                buffer: true,
                radius: 10
            },

            modules: [
                dynamicGeometry
            ],

            material: new THREE.MeshStandardMaterial({
                shading: THREE.FlatShading,
                roughness: 0.9,
                emissive: 0x270000
            })
        });

        const asteroids = new WHS.Group();
        asteroids.addTo(this.state.group);

        // Materials.
        const mat = [
            new THREE.MeshPhongMaterial({color: colors.green, shading: THREE.FlatShading}),
            new THREE.MeshPhongMaterial({color: colors.blue, shading: THREE.FlatShading}),
            new THREE.MeshPhongMaterial({color: colors.orange, shading: THREE.FlatShading}),
            new THREE.MeshPhongMaterial({color: colors.yellow, shading: THREE.FlatShading})
        ];

        for (let i = 0; i < particleCount; i++) {
            const particle = [s1, s2, s3, s4][Math.ceil(Math.random() * 3)].clone(),
                radius = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius);

            particle.g_({
                radiusBottom: radius,
                radiusTop: 0,
                height: particle instanceof WHS.Cylinder ? radius * 2 : radius,
                width: radius,
                depth: radius,
                radius
            });

            particle.material = mat[Math.floor(4 * Math.random())]; // Set custom THREE.Material to mesh.

            // Particle data.
            particle.data = {
                distance: radiusMin + Math.random() * (radiusMax - radiusMin),
                angle: Math.random() * Math.PI * 2
            };

            // Set position & rotation.
            particle.position.x = Math.cos(particle.data.angle) * particle.data.distance + this.state.saturn.position.x;
            particle.position.z = Math.sin(particle.data.angle) * particle.data.distance + this.state.saturn.position.z;
            particle.position.y = -10 * Math.random() + 4 + this.state.saturn.position.y;

            particle.rotation.set(Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random());

            particle.addTo(asteroids);
        }

        // Animating rotating shapes around planet.
        this.setState({
            asteroids: asteroids.children
        });
    };

    loop = new WHS.Loop(() => {
        if(this.props.loop.rotation) {
            // eslint-disable-next-line
            this.state.saturn.rotation.y += Constants.ROTATION_SCALE / Constants.SATURN.period;
        }

        if(!this.props.loop.revolution) return;
        if(this.props.name) {
            this.props.name.position.x = this.state.saturn.position.x + 10;
            this.props.name.position.y = this.state.saturn.position.y + 10;
            this.props.name.position.z = this.state.saturn.position.z;
        }

        // eslint-disable-next-line
        this.state.saturn.data.angle -= Constants.EARTH.velocity;

        // eslint-disable-next-line
        this.state.saturn.position.x = Math.cos(this.state.saturn.data.angle) * Constants.SATURN.orbit_radius;
        // eslint-disable-next-line
        this.state.saturn.position.z = Math.sin(this.state.saturn.data.angle) * Constants.SATURN.orbit_radius;


        //小行星
        for (const particle of this.state.asteroids) {
            particle.data.angle += 0.02 * particle.data.distance / radiusMax;

            particle.position.x = Math.cos(particle.data.angle) * particle.data.distance + this.state.saturn.position.x;
            particle.position.z = Math.sin(particle.data.angle) * particle.data.distance + this.state.saturn.position.z;
            particle.position.y = -10 * Math.random() + 4 + this.state.saturn.position.y;

            particle.rotation.x += Math.PI / 60;
            particle.rotation.y += Math.PI / 60;
        }
    });

    componentDidMount() {
        // eslint-disable-next-line
        this.state.group.rotation.z = Constants.SATURN.inclination;
        this.state.group.addTo(this.props.parent);
        this.loadAsteroids();
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
                        radius: Constants.SATURN.model_diam / 2,
                        detail: 2
                    }}
                    material={new THREE.MeshStandardMaterial({
                        color: Constants.SATURN.color,
                        shading: THREE.FlatShading,
                        roughness: 0.8,
                        emissive: 0x270000
                    })}
                    position={[Constants.SATURN.orbit_radius, 0, 0]}
                    refComponent={component => {
                        // eslint-disable-next-line
                        this.state.saturn = component;
                        // eslint-disable-next-line
                        this.state.saturn.data = {
                            angle: Math.random() * Math.PI * 2
                        };

                    }}>
                </Sphere>
            </Group>
        );
    }
}