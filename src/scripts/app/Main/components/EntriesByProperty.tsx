import * as React from 'react';

import { services } from '../../utils/services';

import { PageModel } from '../models/PageModel';
import { LinearTimeline } from '../controls/LinearTimeline';

export class EntriesByProperty extends React.Component<any, any> {

    state: any;
    model: PageModel;

    constructor(props: any) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = services.get(PageModel);
        this.updateDatasource(this.props.params.property, this.props.params.value);
    }

    public componentWillReceiveProps(nextProps: any) {
        this.updateDatasource(nextProps.params.property, nextProps.params.value);
    }

    public render() {
        if (this.state.error) {
            console.error(this.state.error);

            return (
                <div>An error occurred</div>
            );
        }

        if (this.state.datasource === null) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                <h1>Entries By Property: {this.props.params.property}={this.props.params.value}</h1>

                <LinearTimeline datasource={this.state.datasource} datakey="entries" />
            </div>
        );
    }

    private updateDatasource(property: string, value: string) {
        this.model.getEntriesByProperty(property, value)
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ error: err }); });
    }

}
