import React, { Component } from 'react';
import {Col, Row, Card} from 'react-bootstrap';
import axios from 'axios';

class ProfileLite extends Component {
  constructor(props) {
      super(props);
      this.state= {
        isLoaded: false,
        error: '',
        personData: []
      }
  }

  componentDidMount() {
    axios.all([
        axios.get('../'+this.props.personId+'.json')])
        .then(axios.spread((getPersonData) => {
            const personData = getPersonData.data[0];
            this.setState({ personData });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  render() {
    const { error, isLoaded } = this.state;
    // if there is an error
    if (error) {
        return <div>Error: {error.message}</div>;
    // if not loaded show loading
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    // return now that component has value
    } else {
      const fullName = this.state.personData.FirstName + " " + this.state.personData.LastName;
      return (
          <Row>
            <Col>
              <Card>
                {this.state.personData.FirstName}
                {this.state.personData.LastName}
                {this.state.personData.Descriptions}
                <img alt={fullName} src={this.state.personData.Media.Images.URL} />
              </Card>
            </Col>
          </Row>
    )
  }
}}

export default ProfileLite;
