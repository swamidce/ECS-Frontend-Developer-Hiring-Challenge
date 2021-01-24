import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles( (theme) => ({
  root: {
    minWidth: 275,
    margin:10,
    "& .MuiCardActions-root":{
        justifyContent: "flex-end"
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    display: "inline-block",
    maxWidth: 600,
    margin: 20
  },
  form: {
    maxWidth: 200,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    },
    padding: 40
  },
  textMar: {
    marginRight: 35,
    marginLeft: 10
  },
  placeOrder: {
    marginLeft: 10
  },
  totalPriceFinal:{
    marginLeft: 15,
    fontWeight: "bold"

  }
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackBarOpen ,  setSnackBarOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const placeOrder= () => {
    setSnackBarOpen(true);
  }
  const handleSnackBarClose=()=>{
    setSnackBarOpen(false);
  }

  return (
    <div style={{ marginTop: "65px" }}>
      <Link to="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="open drawer">
            <ArrowBackIcon />
          </IconButton>
          <Typography>Back</Typography>
        </div>
      </Link>
      {props.state.cartList.length === 0 ? 
        <Container maxWidth="md" >Your Cart is Empty</Container> :
        <Container maxWidth="md" >
          {props.state.cartList.map((l, index) => {
            return (
              <Card key={l.id} className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {l.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {l.authors}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price:{l.price}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Quantity :< IndeterminateCheckBoxIcon className="small" onClick={() => props.decQuantity(l.bookID)}  /> {l.quantity} <AddBoxIcon className="small" onClick={() => props.incQuantity(l.bookID)} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="secondary" onClick={() => props.removeItems(l.bookID)}>Remove</Button>
                </CardActions>
              </Card>
            )
          })}
          <div class="checkout">
            <Typography variant="h5" component="h2">Total Amount : {(props.state.cartList.reduce((prev, curr) => { return prev + (curr.price * curr.quantity) }, 0.00)).toFixed(2) }</Typography>
          </div> 
          <div class="checkout">
              <Button type="button" onClick={handleOpen} size="small" variant="contained" color="secondary">PROCEED TO CHECKOUT</Button>
          </div>
      
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div>
                <Card className={classes.card} variant="outlined"> 
                  <CardContent>
                  <Typography className={classes.totalPriceFinal}>Check Out Form</Typography>
                    <form className={classes.root} noValidate autoComplete="off">
                      <div>
                        <TextField
                          className={classes.textMar}
                            required
                          id="standard-required"
                          label="Full Name"
                        />

                        <TextField
                          className={classes.textMar}
                          id="standard-required"
                          required
                          label="Email"
                          type="email"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="Address"
                        />

                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="City"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="State"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="Name On Card"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="Credit Card Number"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="Exp Month/Year"
                        />
                        <TextField
                          className={classes.textMar}
                          required
                          id="standard-required"
                          label="CVV"
                        />
                      </div>
                    </form>
                    <Typography className={classes.totalPriceFinal}>Total Amount : {(props.state.cartList.reduce((prev, curr) => { return prev + (curr.price * curr.quantity) }, 0.00)).toFixed(2) }</Typography>
                    <CardActions>
                      <Button onClick={placeOrder}
                        className={classes.placeOrder}
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Place Order
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Fade>
        </Modal>
        </Container>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Your Order has been Placed Succesfully"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackBarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
