import React from 'react'
import { useSelector } from 'react-redux';
import "./Dashboard.scss"
import { Grid, Skeleton, Container } from '@mantine/core';
import codz_avatar from '../../assets/images/codz-avatar.png'
import code_group from '../../assets/images/code-group.png'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const child = <Skeleton height={200} radius="md" animate={true} />;

const Dashboard = () => {
  const navigate = useNavigate();

  const userData = useSelector(state => state.user.value);

  return (
    <motion.div
    className="Dashboard"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
      <Container size={1200}>
        <div className="welcome-box">
          <h1>Welcome {userData?.userName}</h1>
        </div>

        <Grid gutter="xl">
          <Grid.Col xs={12}>
            <div className='intro-card'>
              <img src={codz_avatar} alt="Codz Avatar" />
              <div className="dash-banner">
              <div className="title">
                <p>Code Smarter, With the Power of Codz's AI.</p>
                <p></p>
              </div>
              <div className="sub-title">
                <p>Codz's AI streamlines coding by automating processes and solving challenges.</p>
              </div>
              <div className='dashboard-btn' id='white-btn' onClick={()=>navigate("/app/playground")}>
                Start Coding
              </div>
              </div>

          
            </div>
          </Grid.Col>

          <Grid.Col xs={3}>
            <div className='card'>
              <p className='title'>Credits Left</p>
              <p className='plan'>{userData?.credits?.value}</p>
              {/* <div className="dashboard-btn">
                Buy More
              </div> */}
            </div>
          </Grid.Col>
          <Grid.Col xs={3}>
            <div className='card'>
              <p className='title'>Current Tier</p>
              {userData?.plan?.plan_name === "Basic" ?
                <p id='basic' className='plan'>Basic</p> : <p id='pro' className='plan'>Pro</p>
              }
              <div className="dashboard-btn" onClick={()=>navigate("/app/pricing")}>
                Upgrade
              </div>
            </div>
          </Grid.Col>
          <Grid.Col xs={6}>
            <div className='codes-card'>
              <div className="left">
                <p className="title">Explore all of</p>
                <p className="title">your amazing</p>
                <p className="title">codes</p>
                <br />
                <div className="dashboard-btn" onClick={()=>navigate("/app/codes")}>My Codes</div>
              </div>
              <div className="right">
                <img src={code_group} alt="code-group" />
              </div>
            </div>
          </Grid.Col>

          <Grid.Col xs={12}>
            <div className='details-card' >
              <div className="details-con">
                <p className="title">Generations</p>
                <p className="value">{userData?.total_code_generations}</p>
              </div>
              <div className="details-con">
                <p className="title">Debuggings</p>
                <p className="value">{userData?.total_code_debuggings}</p>
              </div>
              <div className="details-con">
                <p className="title">Optimizations</p>
                <p className="value">{userData?.total_code_optimizations}</p>
              </div>
              <div className="details-con">
                <p className="title">Summarizations</p>
                <p className="value">{userData?.total_code_summarizations}</p>
              </div>
              {/* <div className="details-con">
                <p className="title">Translations</p>
                <p className="value">{userData?.total_code_translations}</p>
              </div> */}
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </motion.div>
  )
}

export default Dashboard