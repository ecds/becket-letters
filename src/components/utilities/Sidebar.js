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
            <NavDropdown.Item href="/browse-letters-organization">Organizations</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-person">People</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-place">Places</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-production">Productions</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-public-event">Public Events</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-publication">Publications</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-reading">Reading</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-repositories">Repository</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-Translating">Translatings</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-work-of-art">Works of Art</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-writing">Writings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href='/filter-search'>Search</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Sidebar);
