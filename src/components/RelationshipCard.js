import React, { Component } from 'react';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RelationshipCard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      redirectURL: ''
    };

  }

  componentDidMount() {
    console.log(this.props.data.id)
    console.log(this.props.data.attributes["type-label"].toLowerCase() === 'place')
    if (this.props.data.attributes["type-label"].toLowerCase() === 'place') {
      const redirectURL = '/places/' + this.props.data.id
      this.setState({redirectURL})
    }
    else if (this.props.data.attributes["type-label"].toLowerCase() === 'person') {
      const redirectURL = '/people/' + this.props.data.id
      this.setState({redirectURL})
    }

  }




    render() {
      console.log(this.props.data)
        return (
                    <Card className='relationship-card'>
                        <Card.Header><h5>{this.props.data.attributes.label}</h5></Card.Header>
                        <Card.Body>

                        <div dangerouslySetInnerHTML={{__html: this.props.data.attributes.properties.description}} />

                        </Card.Body>
                          {this.state.redirectURL ? <Card.Footer><a href={this.state.redirectURL}>Explore {this.props.data.attributes["type-label"]}</a></Card.Footer> : null}
                    </Card>
        )
    }
}

export default RelationshipCard;
