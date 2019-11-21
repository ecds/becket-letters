import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


class Sidebar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Samuel Beckett Letters</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Browse Letters By" id="basic-nav-dropdown">
            <NavDropdown.Item href="/browse-letters-attendance">Attendance</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-music">Music</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-organizations">Organizations</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-people">People</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-places">Places</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-productions">Productions</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-public_events">Public Events</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-publications">Publications</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-readings">Reading</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-repositories">Repository</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-translations">Translations</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-works_of_art">Works of Art</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-writings">Writings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/timeline">Timeline</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Sidebar);
