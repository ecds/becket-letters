import React, { Component } from "react";

class HeaderBuilder extends Component {
    render() {
        if (this.props.entityData.attributes['type-label'] === 'Attendance') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="label" />
                    {this.props.entityData.attributes.properties ?
                        <span>
                            {this.props.entityData.attributes.properties['alternative-spellings'].length > 0 ? <span className='spellings'>{this.props.entityData.attributes.properties['alternative-spellings'].map((entity, key) => <span key={key} dangerouslySetInnerHTML={{ __html: entity }} className="list-span"></span>)} </span> : null}
                            {this.props.entityData.attributes.properties && this.props.entityData.attributes.properties['place-date'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['place-date'] }} className="comma" /> : null}
                            {this.props.entityData.attributes.properties && this.props.entityData.attributes.properties['attended-with'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['attended-with'] }} className="attended-with" /> : null}
                            {this.props.entityData.attributes.properties && this.props.entityData.attributes.properties['performed-by'] ? <span className="performed-by">{this.props.entityData.attributes.properties['performed-by'].map((entity, key) => <span className="list-span" key={key} dangerouslySetInnerHTML={{ __html: entity }}></span>)}</span> : null}
                        </span>
                        : null}
                </h1>
            )
        }
    }
}

export default HeaderBuilder;