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


    static stars = [
        {
            zh: '水星',
            en: 'mercury'
        },
        {
            zh: '金星',
            en: 'venus'
        },
        {
            zh: '地球',
            en: 'earth'
        },
        {
            zh: '火星',
            en: 'mars'
        },
        {
            zh: '木星',
            en: 'jupiter'
        },
        {
            zh: '土星',
            en: 'saturn'
        },
        {
            zh: '天王星',
            en: 'uranus'
        },
        {
            zh: '海王星',
            en: 'neptune'
        },
        {
            zh: '冥王星',
            en: 'pluto'
        },
        {
            zh: '月球',
            en: 'moon'
        }
    ];


    static introduction = [
        {
            title: '水星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 57.909175},
                {key: '赤道半径(公里)', value: 2439.7},
                {key: '体积(地球=1)', value: 0.054},
                {key: '重量(地球=1)', value:0.055},
                {key: '密度(g/cm³)', value:5.427},
                {key: '赤道重力(m/s²)', value:3.7},
                {key: '自转周期(日)', value:58.646},
                {key: '公转周期', value:'87.97日'},
                {key: '轨道离心率', value:0.20563069},
                {key: '表面温度(度)', value:'-173~427'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:0},
                {key: '最亮星等', value:'-1.9等'},
                {key: '最大视直径', value:'11秒'}
            ]
        },
        {
            title: '金星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 108.20893},
                {key: '赤道半径(公里)', value: 6051.8},
                {key: '体积(地球=1)', value: 0.88},
                {key: '重量(地球=1)', value:0.815},
                {key: '密度(g/cm³)', value:5.24},
                {key: '赤道重力(m/s²)', value:8.87},
                {key: '自转周期(日)', value:243},
                {key: '公转周期', value:'224.7日'},
                {key: '轨道离心率', value:0.0086},
                {key: '表面温度(度)', value:'420~485'},
                {key: '自转方向', value:'自东向西'},
                {key: '卫星', value:0},
                {key: '最亮星等', value:'-4.4等'},
                {key: '最大视直径', value:'61秒'}
            ]
        },
        {
            title: '地球',
            contents: [
                {key: '与太阳距离(百万公里)', value: 149.59789},
                {key: '赤道半径(公里)', value: 6378.14},
                {key: '体积(地球=1)', value: 1},
                {key: '重量(地球=1)', value:1},
                {key: '密度(g/cm³)', value:5.515},
                {key: '赤道重力(m/s²)', value:9.766},
                {key: '自转周期(日)', value:0.99726968},
                {key: '公转周期', value:'365.24日'},
                {key: '轨道离心率', value:0.01671022},
                {key: '表面温度(度)', value:'-88~58'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:1}
            ]
        },
        {
            title: '火星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 227.93664},
                {key: '赤道半径(公里)', value: 3397},
                {key: '体积(地球=1)', value: 0.150},
                {key: '重量(地球=1)', value:0.10744},
                {key: '密度(g/cm³)', value:3.94},
                {key: '赤道重力(m/s²)', value:3.693},
                {key: '自转周期(日)', value:1.0260},
                {key: '公转周期', value:'686.93日'},
                {key: '轨道离心率', value:0.0934},
                {key: '表面温度(度)', value:'-87~-5'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:2},
                {key: '最亮星等', value:'-2.8等'},
                {key: '最大视直径', value:'18秒'}
            ]
        },
        {
            title: '木星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 778.41202},
                {key: '赤道半径(公里)', value: 71492},
                {key: '体积(地球=1)', value: 1316},
                {key: '重量(地球=1)', value:317.82},
                {key: '密度(g/cm³)', value:1.33},
                {key: '赤道重力(m/s²)', value:20.87},
                {key: '自转周期(日)', value:0.41354},
                {key: '公转周期', value:'11.8565年'},
                {key: '轨道离心率', value:0.04839},
                {key: '表面温度(度)', value:'-148'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:63},
                {key: '最亮星等', value:'-2.8等'},
                {key: '最大视直径', value:'47秒'}
            ]
        },
        {
            title: '土星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 1426.7254},
                {key: '赤道半径(公里)', value: 60268},
                {key: '体积(地球=1)', value: 763.6},
                {key: '重量(地球=1)', value:95.16},
                {key: '密度(g/cm³)', value:0.70},
                {key: '赤道重力(m/s²)', value:10.4},
                {key: '自转周期(日)', value:0.44401},
                {key: '公转周期', value:'29.448年'},
                {key: '轨道离心率', value:0.0541506},
                {key: '表面温度(度)', value:'-178'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:56},
                {key: '最亮星等', value:'+0.4等'},
                {key: '最大视直径', value:'43秒(环)'}
            ]
        },
        {
            title: '天王星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 2870.9722},
                {key: '赤道半径(公里)', value: 25559},
                {key: '体积(地球=1)', value: 63.1},
                {key: '重量(地球=1)', value:14.371},
                {key: '密度(g/cm³)', value:1.30},
                {key: '赤道重力(m/s²)', value:8.43},
                {key: '自转周期(日)', value:0.718},
                {key: '公转周期', value:'84.02年'},
                {key: '轨道离心率', value:0.047168},
                {key: '表面温度(度)', value:'-216'},
                {key: '自转方向', value:'自东向西'},
                {key: '卫星', value:27},
                {key: '最亮星等', value:'5.6等'},
                {key: '最大视直径', value:'4秒'}
            ]
        },
        {
            title: '海王星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 4498.2529},
                {key: '赤道半径(公里)', value: 24764},
                {key: '体积(地球=1)', value: 57.7},
                {key: '重量(地球=1)', value:17.147},
                {key: '密度(g/cm³)', value:1.76},
                {key: '赤道重力(m/s²)', value:10.71},
                {key: '自转周期(日)', value:0.67125},
                {key: '公转周期', value:'164.79年'},
                {key: '轨道离心率', value:0.00859},
                {key: '表面温度(度)', value:'-214'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:13},
                {key: '最亮星等', value:'7.9等'},
                {key: '最大视直径', value:'0秒'}
            ]
        },
        {
            title: '冥王星',
            contents: [
                {key: '与太阳距离(百万公里)', value: 5906.38},
                {key: '赤道半径(公里)', value: '1151±20'},
                {key: '体积(地球=1)', value: 0.0059},
                {key: '重量(地球=1)', value:0.0022},
                {key: '密度(g/cm³)', value:2.00},
                {key: '赤道重力(m/s²)', value:0.81},
                {key: '自转周期(日)', value:6.387},
                {key: '公转周期', value:'247.92年'},
                {key: '轨道离心率', value:0.2488},
                {key: '表面温度(度)', value:'-233'},
                {key: '自转方向', value:'自西向东'},
                {key: '卫星', value:0},
                {key: '最亮星等', value:'13.7等'},
                {key: '最大视直径', value:'0秒'}
            ]
        },
        {
            title: '月球',
            contents: [
                {key: '半径(公里)', value: '240'},
                {key: '体积(地球=1)', value: 0.0059},
                {key: '重量(地球=1)', value:0.0022},
                {key: '密度(g/cm³)', value:2.00},
                {key: '赤道重力(m/s²)', value:0.81},
                {key: '自转周期(日)', value:6.387},
                {key: '公转周期', value:'27.32日'},
                {key: '轨道偏心率(平均值)', value:0.0549},
                {key: '自转方向', value:'自西向东'},
            ]
        },
    ];
}