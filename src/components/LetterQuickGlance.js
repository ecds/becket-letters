import React, { Component } from "react";
import axios from "axios";

export class LetterQuickGlance extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            letter: []
        };
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/letters/'+this.props.letterId)])
            .then(axios.spread((getEntityList) => {
                const letter = getEntityList.data.data;
                this.setState({ letter });
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
        if (!error & isLoaded) {
          return (
            <tr>
              <td>{this.state.letter.attributes['recipients'].map((this_recipient) => <a href={'/people/'+this_recipient.id+'/'+this_recipient.label}>{this_recipient.label}</a>)}</td>
              <td>{this.state.letter.attributes['formatted-date']}</td>
              <td className="actions"><a href={'/letters/letterdetails/'+this.state.letter.id}>Explore Letter</a></td>
            </tr>
          )
        }
        else {
          return null
        }
    }
}

export default LetterQuickGlance;
