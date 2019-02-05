import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
	root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
	},
	toolbar: {
    [theme.breakpoints.up('sm')]: {
			...theme.mixins.toolbar
    },
	},
	// menuButton: {
	// 	marginLeft: -12,
	// 	marginRight: 20,
	// },
	
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

function ClippedDrawer(props) {
	const { classes } = props;

	console.log('ClippedDrawer rendering with props', props);

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}> 
				<Toolbar>
				
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
				
					<Typography variant="h6" color="inherit" className={classes.grow} noWrap>
						{props.title}
					</Typography>
					<Button color="inherit" onClick={props.onSideButtonClick}>{props.sideButtonText}</Button>
				</Toolbar>
			</AppBar>

			<nav className={classes.drawer}>
	          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
	          <Hidden smUp implementation="css">
	            <Drawer
	              //container={this.props.container}
	              variant="temporary"
	              anchor={'left'}
	              open={props.isResponsiveMenuOpen}
	              onClose={props.handleDrawerToggle}
	              onClick={props.handleDrawerToggle}
	              classes={{
	                paper: classes.drawerPaper,
	              }}
	            >
				<div className={classes.toolbar} />
				<List>
					{props.sidebarItems.map((item, index) => (
						<Link to={item.path} key={index}>
							<ListItem button>
								<ListItemText primary={item.label} />
							</ListItem>
						</Link>
					))}
				</List>
	            </Drawer>
	          </Hidden>
	          <Hidden xsDown implementation="css">
	            <Drawer
	              classes={{
	                paper: classes.drawerPaper,
	              }}
	              variant="permanent"
	              open
	            >
				<div className={classes.toolbar} />
				<List>
					{props.sidebarItems.map((item, index) => (
						<Link to={item.path} key={index}>
							<ListItem button>
								<ListItemText primary={item.label} />
							</ListItem>
						</Link>
					))}
				</List>
	            </Drawer>
	          </Hidden>
	        </nav>


			<main className={classes.content}>
				<div className={classes.toolbar} />
					{props.content}
			</main>
		</div>
	);
}

ClippedDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
