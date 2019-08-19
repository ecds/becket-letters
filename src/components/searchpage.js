import React, { Component } from "react";
import { Col, Row } from 'react-bootstrap';

export class SearchPage extends Component {

    render() {
        return (
            <div><Row><h1>Search</h1></Row>
                <div className='searchBoxBg'>
                    <div className='container'>
                        <div className='searchBox'>
                            <Row className='searchLine1'>
                                <form>
                                    <input type="text" placeholder='Keyword'></input>
                                </form>
                                <p>in</p>
                                <select>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>

                            </Row>
                            <Row>
                                <form>
                                    <span className='filter'><p className='filterLabel'>Filter Type</p><input type="checkbox"></input></span><span className='filter'><p className='filterLabel'>Filter Type</p><input type="range"></input></span>
                                </form>
                            </Row>
                        </div>
                    </div>
                </div>
                <Row className='searchPara'>
                    <p>lorem Ipsum</p>
                </Row>

            </div>
        )
    }
}

export default SearchPage;