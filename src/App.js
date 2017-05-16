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
                <div className="controls">
                    <MuiThemeProvider>
                        <div>
                            <RadioButtonGroup name="view" defaultSelected="overall" onChange={this.handleSelectView}
                                              valueSelected={this.state.view}>
                                <RadioButton
                                    value="overall"
                                    label="上帝视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="earth"
                                    label="地球视角"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="saturn"
                                    label="土星视角"
                                    style={styles.radioButton}
                                />
                            </RadioButtonGroup>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }

}