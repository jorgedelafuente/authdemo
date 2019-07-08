import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1
   },
   appBar: {
      backgroundColor: "#616161",
      border: "1px solid black"
   },
   Button: {
      border: "1px solid black"
   },
   menuButton: {
      marginRight: theme.spacing(2)
      // backgroundColor: "#bdbdbd"
   },
   title: {
      flexGrow: 1
   }
}));

export default function ButtonAppBar() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <AppBar position="static" color="inherit" className={classes.appBar}>
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
               >
                  <MenuIcon />
               </IconButton>

               <Typography variant="h6" className={classes.title}>
                  <Link to="/">Reserver App</Link>
               </Typography>

               <Link to="/login">
                  <Button className={classes.Button}>Login</Button>
               </Link>

               <Link to="/register">
                  <Button className={classes.Button}>Register</Button>
               </Link>
            </Toolbar>
         </AppBar>
      </div>
   );
}
