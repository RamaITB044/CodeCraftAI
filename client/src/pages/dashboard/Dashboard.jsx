import React from 'react'
import "./Dashboard.scss"
import { Grid, Skeleton, Container } from '@mantine/core';
import codz_avatar from '../../assets/images/codz-avatar.png'

const child = <Skeleton height={200} radius="md" animate={true} />;

const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <Container size={1200}>
        <div className="welcome-box">
          <h1>Welcome Anom</h1>
        </div>

        <Grid>
          <Grid.Col xs={12}>
            <div className='intro-card'>
              <img src={codz_avatar} alt="Codz Avatar" />
              <div className="title">
                <p>Code Smarter, With the </p>
                <p>Power of Codz's AI.</p>
              </div>
              <div className="sub-title">
                <p></p>
              </div>
            </div>
          </Grid.Col>

          <Grid.Col xs={3}>
            <div className='card'>

            </div>
          </Grid.Col>
          <Grid.Col xs={3}>
            <div className='card'>

            </div>
          </Grid.Col>
          <Grid.Col xs={6}>
            <div className='card'>

            </div>
          </Grid.Col>

          <Grid.Col xs={12}>
            <div className='card'>

            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}

export default Dashboard