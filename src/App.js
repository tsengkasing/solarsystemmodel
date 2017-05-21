/**
 * Created by Think on 2017/5/16.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import World from './World';
import './animate.css';

injectTapEventPlugin();

const stars = [
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
    }
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'overall',

            rotation: new Array(9).fill(true),

            revolution: new Array(9).fill(true),


            //控制面板
            display: false,
            expanded: [false, false]
        }
    }

    handleExpandPanel = (target) => {
        let {expanded} = this.state;
        expanded[target] = !expanded[target];
        this.setState({expanded});
    };

    handleSelectView = (event, value) => {
        console.log(value);
        this.setState({
            view: value
        })
    };

    handleCheckedRotation = (event, isInputChecked, star_index) => {
        let {rotation} = this.state;
        rotation[star_index] = isInputChecked;
        this.setState({rotation});
    };

    handleCheckedRevolution = (event, isInputChecked, star_index) => {
        let {revolution} = this.state;
        revolution[star_index] = isInputChecked;
        this.setState({revolution});
    };

    handleShowPanel = () => {
        const { display } = this.state;
        this.setState({display: !display});
    };

    componentDidMount() {
        this.setState({display: true});
        setTimeout(()=>this.handleExpandPanel(0), 1200);
    }

    render() {
        const radio_button_style = {
            width: '80%'
        };
        return (
            <div>
                <div>
                    <World view={this.state.view} rotation={this.state.rotation} revolution={this.state.revolution} />
                </div>
                <MuiThemeProvider>
                    <div className="controls">
                        <div className="controls__mask">
                            <div className="controls__title bounceInLeft animated" style={this.state.display ? {opacity: 1} : {}} onClick={this.handleShowPanel}>控制面板</div>
                            <div className={`controls__panel ${this.state.display ? 'bounceInDown animated' : 'bounceOutUp animated'}`}>
                                <Paper zDepth={2}>
                                    <div className="controls__subtitle" onClick={()=>this.handleExpandPanel(0)}>转动</div>
                                </Paper>
                                <div className="controls__content" style={{height: this.state.expanded[0] ? 300 : 0}}>
                                    {stars.map((item, index)=>(
                                        <div key={index} className="controls__content__row">
                                            <div>{item.zh}</div>
                                            <div>
                                                <Checkbox
                                                    label="公转"
                                                    checked={this.state.revolution[index]}
                                                    onCheck={(...args) =>this.handleCheckedRevolution(...args, index)}
                                                />
                                            </div>
                                            <div>
                                                <Checkbox
                                                    label="自转"
                                                    checked={this.state.rotation[index]}
                                                    onCheck={(...args) =>this.handleCheckedRotation(...args, index)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className={`controls__panel ${this.state.display ? 'bounceInDown animated' : 'bounceOutUp animated'}`}>
                                <Paper zDepth={2}>
                                    <div className="controls__subtitle" onClick={()=>this.handleExpandPanel(1)}>视角</div>
                                </Paper>
                                <div className="controls__content" style={{height: this.state.expanded[1] ? 400 : 0}}>
                                    <RadioButtonGroup name="view" defaultSelected="overall" onChange={this.handleSelectView}
                                                      valueSelected={this.state.view} className="controls__radioButtons">
                                        <RadioButton
                                            value="overall"
                                            label="上帝视角"
                                            style={radio_button_style}
                                        />
                                        {stars.map((item, index) => (
                                            <RadioButton
                                                key={index}
                                                value={item.en}
                                                label={item.zh}
                                                style={radio_button_style}
                                            />
                                        ))}
                                    </RadioButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}