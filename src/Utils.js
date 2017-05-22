/**
 * Created by Think on 2017/5/22.
 */

const Colors = {
    red : 0xf85051,
    orange: 0xea8962,
    yellow: 0xdacf75,
    beige: 0xccc58f,
    grey: 0xbab7a1,
    blue: 0x4379a8,
    ocean: 0x4993a8,
    green: 0x24a99b
};

const colorsLength = Object.keys(Colors).length;

export default class Utils {

    static randomRange(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    static getRandomColor(){
        let colIndx = Math.floor(Math.random()*colorsLength);
        let colorStr = Object.keys(Colors)[colIndx];
        return Colors[colorStr];
    }

    static shiftPosition(pos, radius){
        if(Math.abs(pos) < radius){
            if(pos >= 0){
                return pos + radius;
            } else {
                return pos - radius;
            }
        } else {
            return pos;
        }
    }

    // Default parameters
    static parameters = {
        minRadius : 30,
        maxRadius : 50,
        minSpeed:.015,
        maxSpeed:.025,
        particles:500,
        minSize:.1,
        maxSize:2
    };

}