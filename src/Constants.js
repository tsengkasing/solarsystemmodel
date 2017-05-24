/**
 * Created by Think on 2017/5/13.
 */
let diam_scale = 0.35;
let orbit_scale = 1;
let velocity_scale = 0.5;

export default class Constants {
    static CAMERA_SPEED = 10;

    static ROTATION_SCALE = 0.01;

    //太阳
    static SUN = {
        model_diam: 110 * diam_scale,
        color: 0xee5624,
        period: 25.05
    };

    //水星
    static MERCURY = {
        //直径
        model_diam: 3.4 * diam_scale,
        //公转轨道半径
        orbit_radius: 42* orbit_scale,
        color: 0x959595,
        //自转周期 (天)
        period: 58.65,
        //公转速度
        velocity: 0.0389 * velocity_scale,
        inclination: 7.0 / 180
    };

    //金星 自转方向自东向西
    static VENUS = {
        model_diam: 8.6 * diam_scale,
        orbit_radius: 78* orbit_scale,
        color: 0xff0000,
        period: 243.01,
        velocity: 0.0349 * velocity_scale,
        inclination: 3.39 / 180
    };

    //地球
    static EARTH = {
        model_diam: 9.1 * diam_scale,
        orbit_radius: 108* orbit_scale,
        color: 0x66CCFF,
        period: 0.99,
        velocity: 0.0298 * velocity_scale,
        inclination: 0.0
    };

    //月球
    static MOON = {
        model_diam: 9.1 * 3 / 11 * diam_scale,
        orbit_radius: 108* orbit_scale,
        color: 0x66CCFF,
        period: 27.32,
        velocity: 0.0298 / 12 * velocity_scale,
        inclination: 0.0
    };

    //火星
    static MARS = {
        model_diam: 4.8 * diam_scale,
        orbit_radius: 164* orbit_scale,
        color: 0x66CCFF,
        period: 1.026,
        velocity: 0.0258 * velocity_scale,
        inclination: 1.85 / 180
    };

    //木星
    static JUPITER = {
        model_diam: 102.7 * diam_scale,
        orbit_radius: 559* orbit_scale,
        color: 0x66CCFF,
        period: 0.41,
        velocity: 0.0125 * velocity_scale,
        inclination: 1.31 / 180
    };

    //土星
    static SATURN = {
        model_diam: 283.6 * diam_scale,
        orbit_radius: 1025* orbit_scale,
        color: 0xffffff,
        period: 0.426,
        velocity: 0.0091 * velocity_scale,
        inclination: 2.48 / 180
    };

    //天王星 自转方向自东向西
    static URANUS = {
        model_diam: 33.7 * diam_scale,
        orbit_radius: 2062* orbit_scale,
        color: 0x66CCFF,
        period: 0.667,
        velocity: 0.0065 * velocity_scale,
        inclination: 0.77 / 180
    };

    //海王星
    static NEPTUNE = {
        model_diam: 32.6 * diam_scale,
        orbit_radius: 3233* orbit_scale,
        color: 0x00ff00,
        period: 0.75,
        velocity: 0.0054 * velocity_scale,
        inclination: 1.77 / 180
    };

    //冥王星
    static PLUTO = {
        model_diam: 100.6 * diam_scale,
        orbit_radius: 4248* orbit_scale,
        color: 0xff0000,
        period: 248.06,
        velocity: 0.0037 * velocity_scale,
        inclination: 17.14 / 180
    };

}