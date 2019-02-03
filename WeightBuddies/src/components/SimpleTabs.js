// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import { Link as RouterLink } from 'react-router-dom'
// import Link from '@material-ui/core/Link';

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// });

// class SimpleTabs extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   render() {
//     const { classes } = this.props;
//     const { value } = this.state;

//     return (
//       <div className={classes.root}>
//         <AppBar position="static" className="appBar">
//           <Tabs value={value} onChange={this.handleChange}>
//             <Tab label="Test"></Tab>
//             <Tab label="Test2"></Tab>
//             {/* <Link to="/about"><Tab label="About Us" /></Link> */}
//           </Tabs>
//         </AppBar>
//         {/* {value === 0 && <TabContainer>Home</TabContainer>}
//         {value === 1 && <TabContainer>User Info</TabContainer>}
//         {value === 2 && <TabContainer>About Us</TabContainer>} */}
//       </div>
//     );
//   }
// }

// SimpleTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTabs);

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu fixed="top" color="black">
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
          as={Link} to='/'
        >
          Home
        </Menu.Item>

        <Menu.Item name='User' active={activeItem === 'User'} onClick={this.handleItemClick} as={Link} to='/user'>
          User
        </Menu.Item>

        {/* <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item> */}
      </Menu>
    )
  }
}