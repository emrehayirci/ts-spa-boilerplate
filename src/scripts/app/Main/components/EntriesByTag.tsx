import * as React from 'react';

import { services } from '../../utils/services';

import { PageModel } from '../models/PageModel';
import { LinearTimeline } from '../controls/LinearTimeline';

export class EntriesByTag extends React.Component<any, any> {

    state: any;
    model: PageModel;

    constructor(props: any) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = services.get(PageModel);
        this.updateDatasource(this.props.params.tag);
    }

    public componentWillReceiveProps(nextProps: any) {
        this.updateDatasource(nextProps.params.tag);
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
                <h1>Entries By Tag: {this.props.params.tag}</h1>

                <LinearTimeline datasource={this.state.datasource} datakey="entries" />
            </div>
        );
    }

    private updateDatasource(tag: string) {
        this.model.getEntriesByTag(tag)
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ error: err }); });
    }

}
