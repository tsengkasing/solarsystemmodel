/**
 * Created by Think on 2017/5/13.
 */
let orbit_scale = 5;
let velocity_scale = 0.5;

export default class Constants {
    static CAMERA_SPEED = 2;

    static SUN = {
        model_diam: 200,
        color: 0xee5624
    };

    //水星
    static MERCURY = {
        model_diam: 3.4,
        orbit_radius: 42* orbit_scale,
        color: 0x959595,
        period: 0.241,
        velocity: 0.0439 * velocity_scale
    };

    //金星
    static VENUS = {
        model_diam: 8.6,
        orbit_radius: 78* orbit_scale,
        color: 0xff0000,
        period: 0.615,
        velocity: 0.0351 * velocity_scale
    };

    //地球
    static EARTH = {
        model_diam: 9.1,
        orbit_radius: 108* orbit_scale,
        color: 0x66CCFF,
        period: 1,
        velocity: 0.0294 * velocity_scale
    };


}