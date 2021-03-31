import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as ChannelStore from '../store/Channel';

// At runtime, Redux will merge together...
type ChannelProps =
  ChannelStore.ChannelState // ... state we've requested from the Redux store
  & typeof ChannelStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ channel: string }>; // ... plus incoming routing parameters


class FetchChannel extends React.PureComponent<ChannelProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Channel Items</h1>
            {this.renderChannelTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const channel =this.props.match.params.channel;
      this.props.requestChannelData(channel);
  }

  private renderChannelTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Item</th>
            <th>Desc</th>
            <th>Add</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.channelData.map((channel: ChannelStore.ChannelData) =>
              <tr key={channel.itemName}>
                  <td>{channel.itemName}</td>
                  <td>{channel.itemDesc}</td>
                  <td>{channel.itemExtra}</td>
                  <td>{channel.itemPrice}</td>
              </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    return (
      <div className="d-flex justify-content-between">
        {this.props.isLoading && <span>Loading...</span>}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.channel, // Selects which state properties are merged into the component's props
  ChannelStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchChannel as any);
