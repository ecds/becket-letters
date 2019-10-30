import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


class Sidebar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Samuel Beckett Letters</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Browse Letters By" id="basic-nav-dropdown">
            <NavDropdown.Item href="/browse-letters-attendance">Letters by Attendance</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-music">Letters by Music</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-organizations">Letters by Organizations</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-people">Letters by People</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-places">Letters by Places</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-productions">Letters by Productions</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-public_events">Letters by Public Events</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-publications">Letters by Publications</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-readings">Letters by Reading</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-translations">Letters by Translations</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-works_of_art">Letters by Works of Art</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-writings">Letters by Writings</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Sidebar);
