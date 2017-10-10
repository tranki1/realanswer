import React, { Component } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Collapse,
  Container,
} from 'mdbreact';
import Slider from '../Slider/Slider';

import Questions from '../../questions/Questions/Questions';

class Landing extends Component {
  state = {
    collapse: false,
    collapse2: false,
  };

  toggleTab = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  toggleTab2 = () => {
    this.setState({ collapse2: !this.state.collapse2 });
  };

  render() {
    const { collapse, collapse2 } = this.state;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row">
              <Slider />
            </div>
          </div>
          <Container>
            <Card style={{ margin: '2rem' }}>
              <CardHeader color="deep-orange lighten-1">What's themamaclub?</CardHeader>
              <CardBody>
                <CardTitle>Portal for immigrant mothers residing in Finland</CardTitle>
                <CardText>
                  <p>
                    This is the portals where immigrant mothers residing in Finland can get advises
                    from experts and other mother and update newest information about nearest
                    events, clubs for immigrant mothers{' '}
                  </p>
                  Espoo, Hyvinkää, Järvenpää, Kauniainen, Kerava, Mäntsälä, Pornainen and Tuusula
                  have been selected as pilots in the new system.
                </CardText>
                <Button color="deep-orange" href="/login">
                  Login to ask questions
                </Button>
              </CardBody>
            </Card>
          </Container>
          <Container className="col-md-8">
            <div
              className="mx-auto"
              style={{
                maxWidth: '310px',
              }}
            >
              <Button
                color="brown"
                onClick={this.toggleTab}
                style={{ marginBottom: '1rem' }}
                className="btn-custom"
              >
                MLL's program
              </Button>
              <Button
                color="brown"
                onClick={this.toggleTab2}
                style={{ marginBottom: '1rem' }}
                className="btn-custom"
              >
                Events
              </Button>
            </div>
            <Collapse isOpen={collapse}>
              <Container>
                <p>
                  Are you <strong>immigrant mothers</strong> residing in Finland?
                </p>
                <p>Would you like to get to know other Finish mothers?</p>

                <p>
                  Mannerheim League for Child Welfare, Southern District started ”friend for an
                  immigrant mum” work in 2011. Its aim is to promote immigrant mum’s integration and
                  learning of the Finnish language.
                </p>
                <p className=" font-weight-bold">Additional information and registration:</p>
                <p>Raila Turunen</p>
                <p>tel. 044 9742 863</p>
                <p>
                  raila.turunen(a)mll.fi ”Friend for an immigrant mum” work is supported by STEA
                  (Slot Machine Association), Helsinki City
                </p>
              </Container>
            </Collapse>
            <Collapse isOpen={collapse2}>
              <Container>
                <p>
                  From tomorrow onwards, 2nd September, we will be open every Saturday from 11am to
                  3pm. Hope to see you here!
                </p>
                <p className=" font-weight-bold">Oravannahkatori 1 Espoo, Finland</p>
              </Container>
            </Collapse>
          </Container>
          <Container>
            <Questions />
          </Container>
        </div>
      </div>
    );
  }
}

export default Landing;
