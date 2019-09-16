import React, { Component } from "react";
import axios from "axios";
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

export class SearchPage extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          entityTypes: []
      };
      this.submitForm = this.submitForm.bind(this);
  }

  submitForm (e) {
		e.preventDefault()
    const data = new FormData(e.target);
		this.props.history.push('/search?query='+e.target.elements.query.value+'&type='+e.target.elements.entity_type.value.toLowerCase());
	}


  componentDidMount() {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entity-types')])
        .then(axios.spread((getAllEntityTypes) => {
            const entityTypes = getAllEntityTypes.data.data;
            this.setState({ entityTypes });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

    render() {

      var EntityType = props => <select name="entity_type">{this.state.entityTypes.map((x) => <option key={x.attributes.label}>{x.attributes['pretty-label']}</option>)}</select>;
        return (
            <div>
                <Container>
                    <Row>
                        <h2>Search</h2>
                    </Row>
                </Container>
                <form  onSubmit={this.submitForm} >
                  <label htmlFor="search">Search Terms</label>
                  <input id="query" name="query" type="text" />
                  <EntityType/>
                  <button>Search</button>
                </form>
                {/*
                <Row className='m-0 searchBoxBg'>
                    <Container >
                        <Row className='dateRange justify-content-md-center'>
                            <Col md={3}>
                                <Row>
                                    <h5>Beginning Date Range</h5>
                                    <InputGroup className="mb-3 ">
                                        <input type="date" name="start date" defaultValue="1954-01-01" min="1954-01-01" max="1970-01-01" />
                                    </InputGroup>

                                </Row>
                            </Col>
                            <Col md={3}>
                                <h5>End Date Range</h5>
                                <InputGroup className="mb-3 ">
                                    <input type="date" name="end date" defaultValue='1970-01-01' min="1954-01-01" max="1970-01-01" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-center'>
                            <Col md={8}>
                                <h5>Search Query</h5>
                                <InputGroup className="mb-3 queryBox">
                                    <FormControl
                                        placeholder="ex. 'Waiting for Godot'"
                                        aria-label="ex. 'Waiting for Godot'"
                                        aria-describedby="basic-addon2"
                                    />

                                    <InputGroup.Append>
                                        <InputGroup.Text>in</InputGroup.Text>
                                        <EntityType/>

                                        <button type='button' onClick={this.handleSearch}>Click Me!</button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>

                    </Container>
                </Row>
                 <Container>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sequi, molestias numquam perferendis delectus cumque dolores aut obcaecati unde fugit, veniam quae vel ipsa repellendus. Recusandae repellendus unde earum. Recusandae.</p>
                </Container> */}
            </div>
        )
    }
}

export default withRouter(SearchPage);
