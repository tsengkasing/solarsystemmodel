/**
 * Created by Think on 2017/5/16.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import World from './World';

injectTapEventPlugin();

const styles = {
    radioButton: {
        marginBottom: 16,
    },
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'overall'
        }
    }

    handleSelectView = (event, value) => {
        console.log(value);
        this.setState({
            view: value
        })
    };

    render() {
        return (
            <div>
                <div>
                    <World view={this.state.view}/>
                </div>
                <MuiThemeProvider>
                    <div className="controls">
                        <div>
                            <RadioButtonGroup name="view" defaultSelected="overall" onChange={this.handleSelectView}
                                              valueSelected={this.state.view}>
                                <RadioButton
                                    value="overall"
                                    label="上帝视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="mercury"
                                    label="水星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="venus"
                                    label="金星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="earth"
                                    label="地球视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="mars"
                                    label="火星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="jupiter"
                                    label="木星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="saturn"
                                    label="土星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="uranus"
                                    label="天王星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="neptune"
                                    label="海王星视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="pluto"
                                    label="冥王星视角"
                                    style={styles.radioButton}
                                />
                            </RadioButtonGroup>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}