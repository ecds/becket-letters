import React, { Component } from "react";

class HeaderBuilder extends Component {
    render() {
        if (this.props.type === 'string') {
            return (
                <h1>{this.props.header}</h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Attendance') {
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
        else if (this.props.entityData.attributes['type-label'] === 'Music') {
            return (
                <h1>
                    <span>{this.props.entityData.attributes.properties !== null ? this.props.entityData.attributes.properties.composer : null}</span>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="comma" />
                    {this.props.entityData.attributes.properties['alternative-titles'].length > 0 ? <span className='spellings'>{this.props.entityData.attributes.properties['alternative-titles'].map((entity, key) => <span key={key} dangerouslySetInnerHTML={{ __html: entity }} className="list-span"></span>)} </span> : ', '}
                    {this.props.entityData.attributes.properties['description'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['description'] }} className="notes" /> : null}
                    ]            {this.props.entityData.attributes.properties['performed-by'] ? <p><span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['performed-by'] }} className="new-line performed-by" /></p> : null}
                    {this.props.entityData.attributes.properties['notes'] ? <p><span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['notes'] }} className="notes" /></p> : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Organization') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} />
                    {this.props.entityData.attributes.properties ?
                        <span>
                            {this.props.entityData.attributes.properties['alternate-spellings'].length > 0 ? <span className='spellings'>{this.props.entityData.attributes.properties['alternate-spellings'].map((entity, key) => <span key={key} dangerouslySetInnerHTML={{ __html: entity }} className="list-span"></span>)} </span> : ''}
                            {this.props.entityData.attributes.properties.description ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.description }} /> : null}
                        </span>
                        : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Place') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} />
                    {this.props.entityData.attributes.properties ?
                        <span>{this.props.entityData.attributes.properties['alternate-spellings'].length > 0 ? <span className='spellings'>{this.props.entityData.attributes.properties['alternate-spellings'].map((entity, key) => <span key={key} dangerouslySetInnerHTML={{ __html: entity }} className="list-span"></span>)} </span> : null}
                            {this.props.entityData.attributes.properties.description && this.props.entityData.attributes.properties.description !== "" ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.description }} /> : null}
                            {this.props.entityData.attributes.properties['links'].length > 0 ? <span className='comma'>{this.props.entityData.attributes.properties['links'].map((entity, key) => <a target="_new" key={key} href={entity}>{entity}</a>)} </span> : null}
                        </span>
                        : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Production') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="label" />
                    {this.props.entityData.attributes.properties['proposal'] && this.props.entityData.attributes.properties['response'] === 'no' ?
                        <span>
                            {this.props.entityData.attributes.properties['proposal'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['proposal'] }} className="proposed-by" /> : null}
                            {this.props.entityData.attributes.properties.response ? <span className="comma">{this.props.entityData.attributes.properties.response}</span> : null}
                            {this.props.entityData.attributes.properties.reason ? <span className="comma">{this.props.entityData.attributes.properties.reason}</span> : null}
                            {this.props.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['notes'] }} className="notes" /> : null}
                        </span>
                        : <span>
                            <span className="detailGroup">
                                {this.props.entityData.attributes.properties.director ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.director }} className="comma director" /> : null}
                                {this.props.entityData.attributes.properties.theatre ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.theatre }} className="comma" /> : null}
                                {this.props.entityData.attributes.properties.city ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.city }} className="comma" /> : null}
                                {this.props.entityData.attributes.properties.date ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.date }} className="comma" /> : null}
                            </span>
                            {this.props.entityData.attributes.properties['cast'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['cast'] }} className="cast" /> : null}
                            {this.props.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['notes'] }} className="notes" /> : null}
                            <br />
                            {this.props.entityData.attributes.properties['staging-beckett'] ? <a href={this.props.entityData.attributes.properties['staging-beckett']} className="btn btn-primary" target="_new">Staging Beckett</a> : null}
                        </span>}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="label" />
                    {this.props.entityData.attributes.properties.date ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.date }} className="comma" /> : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Publication') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} />
                    {this.props.entityData.attributes.properties.author ? <span className="comma">{this.props.entityData.attributes.properties.author}</span> : null}
                    {this.props.entityData.attributes.properties.translator ? <span className="comma">{this.props.entityData.attributes.properties.translator}</span> : null}
                    {this.props.entityData.attributes.properties['publication-information'] ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['publication-information'] }} /> : null}
                    {this.props.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['notes'] }} className="notes" /> : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Reading') {
            return (
                <h1>
                    {this.props.entityData.attributes.properties.authors ? <span>{this.props.entityData.attributes.properties.authors}</span> : null}
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="comma" />
                    {this.props.entityData.attributes.properties.publication ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.publication }} /> : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Translating') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} />
                    {this.props.entityData.attributes.properties.author ? <span className="comma">{this.props.entityData.attributes.properties.author}</span> : null}
                    {this.props.entityData.attributes.properties['translated-into'] ? <span className="comma">{this.props.entityData.attributes.properties['translated-into']}</span> : null}
                    {this.props.entityData.attributes.properties.translator ? <span className="translated-by">{this.props.entityData.attributes.properties.translator}</span> : null}
                    {this.props.entityData.attributes.properties['translated-title'] ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['translated-title'] }} /> : null}
                    {this.props.entityData.attributes.properties['comments'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['comments'] }} /> : null}
                </h1>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            return (
                <div>
                    <h1>
                        {this.props.entityData.attributes.properties.artist ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.artist }} /> : null}
                        {this.props.entityData.attributes.label ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} /> : null}
                        {this.props.entityData.attributes.properties['alternative-spellings'].length > 0 ? <span className='spellings'>{this.props.entityData.attributes.properties['alternative-spellings'].map((entity, key) => <span key={key} dangerouslySetInnerHTML={{ __html: entity }} className="list-span"></span>)} </span> : ', '}
                    </h1>
                    {this.props.entityData.attributes.properties.description ? <h3><span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties.description }} /></h3> : null}
                    {this.props.entityData.attributes.properties['owner-location-accession-number-contemporaneous'] ?
                        <h3>
                            <p><i>Contemporaneous:  </i> {this.props.entityData.attributes.properties['owner-location-accession-number-contemporaneous']}</p>
                        </h3>
                        : null}
                    <h3>
                        <p><i>Current: </i> {this.props.entityData.attributes.properties['owner-location-accession-number-current'] ? <span>{this.props.entityData.attributes.properties['owner-location-accession-number-current']}</span> : 'Unknown'}</p>
                    </h3>
                </div>
            )
        }
        else if (this.props.entityData.attributes['type-label'] === 'Writing') {
            return (
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.label }} className="label" />
                    <span className="comma">{this.props.entityData.attributes.properties.date}</span>
                    {this.props.entityData.attributes.properties.proposal ? <span className="comma">{this.props.entityData.attributes.properties.proposal}</span> : null}
                    {this.props.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{ __html: this.props.entityData.attributes.properties['notes'] }} className="notes" /> : null}
                </h1>
            )
        }
        else {
            return (
                <h1>error</h1>
            )
        }
    }
}

export default HeaderBuilder;