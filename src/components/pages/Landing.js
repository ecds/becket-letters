import React, { Component } from "react";
import HomeJumbotron from '../Jumbotron';
import HomeTile from '../utilities/HomeTile';
import DocMetaBuilder from '../utilities/DocMetaBuilder';
import { CardGroup, Container } from 'react-bootstrap';

class Landing extends Component {
  render() {
    const metaBuild = {
      title: "Samuel Beckett's Letters",
      description: "Begin your exploration of Samuel Beckett's letters",
    };

    return (
      <div className="landing" >
        <DocMetaBuilder {...metaBuild} />
        <HomeJumbotron />
        <Container fluid>
          <div className='about'>
            <h2>The Letters of Samuel Beckett, Emory University</h2>
            <p>The Letters of Samuel Beckett at Emory University is a project established to collect and consult as well as transcribe all extant letters by Samuel Beckett, and to publish the selected edition of The Letters of Samuel Beckett in four volumes with Cambridge University Press (2009-2016). The edition has been published in French (Gallimard) and German (Suhrkamp), and it is in publication in Italian (Adelphi) and Chinese (Hunan Literature and Art Press).</p>
            <p>The editorial project consulted and transcribed over 16,000 letters by Samuel Beckett. Since only about 20% of these letters are included in the selected edition, the question arose of how to make the research of more than thirty years available to future scholarship. Letters have two owners: the holder of the literary copyright and the owner of the physical property. Creating and sharing the metadata of Beckett’s letters respects these rights while describing the context and the content of the letters.  </p>
            <p><b>The Location Register of the Letters of Samuel Beckett in Public Archives</b> intends to make the descriptions of Beckett’s letters in public archives available to researchers and to the wider public. The first release of <b>The Location Register</b> was made possible by the support of The Gladys Krieble Delmas Foundation, Christopher Herbert and Nancy Welch, the College of Arts and Sciences of Emory University, Emory Libraries, LITS, and the Emory Center for Digital Scholarship. The second release added Beckett’s letters in Canadian, Irish, English and Scottish Public Archives. The third release, collections in continental and other international Public Archives, is delayed due to recent archival closures. The Location Register (https://beckett.library.emory.edu/) can be browsed by recipient, physical description, the places sent from and to, recipients (in original format and regularized to facilitate searching), language, repository, collection, and previous publication. Users can save pages in Word.</p>
            <p><b>The Linked Data Project of the Letters of Samuel Beckett in Public Archives</b>, currently in development, is based on the Location Register. It indexes the contents of each letter, including persons, places, organizations, productions, publications mentioned, and Samuel Beckett’s writing, translating, reading, and attendance at events. Without including the letters themselves, the Linked Data Project is designed to provide overview of Beckett’s letters for scholars and the interested public, without compromising ownership rights in the letters, and particularly to encourage users to consult the letters themselves in archives. The Linked Data Project has had the support of Christopher Herbert and Nancy Welch, Breon and Lynda Mitchell, and other donors, the College of Arts and Sciences of Emory University, Emory Libraries, LITS, and the Emory Center for Digital Scholarship.</p>
            <p>This site is supported by The Letters of Samuel Beckett at Emory University and the Emory Center for Digital Scholarship. Copyright © 2021 Emory University - All Rights Reserved, 201 Dowman Drive, Atlanta, Georgia 30322 USA, 404.727.6123. The metadata from the letters of Samuel Beckett in Public Archives is open access, which means the data is made freely available for individual study, scholarship and research, and educational purposes. Access to the letters of Samuel Beckett was provided by kind permission of the holders and of the Estate of Samuel Beckett. The photograph of Samuel Beckett in the banner is used with the kind permission of Vera Spoerri Mercer. </p>
            <p>NOTE: Copyright © in the letters written by Samuel Beckett is held by the Estate of Samuel Beckett, all rights reserved and without limitation; permission for publication in any media worldwide in all languages must be obtained in advance from the Estate of Samuel Beckett (Rosica Colin Limited, London). </p>
          </div>
          <div className="home-tiles">
            <h2>Browse Letters By</h2>
            <CardGroup className='landing-group'>
              <HomeTile type='attendance' />
              <HomeTile type='music' />
              <HomeTile type='organization' />
              <HomeTile type='person' />
              <HomeTile type='place' />
              <HomeTile type='production' />
              <HomeTile type='publication' />
            </CardGroup>
            <CardGroup className='landing-group'>
              <HomeTile type='public-event' />
              <HomeTile type='reading' />
              <HomeTile type='repositories' />
              <HomeTile type='translating' />
              <HomeTile type='work-of-art' />
              <HomeTile type='writing' />
            </CardGroup>
          </div>
        </Container>
      </div >
    )
  }
}

export default Landing;
