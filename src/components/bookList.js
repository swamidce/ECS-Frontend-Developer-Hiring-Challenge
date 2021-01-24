import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Container from '@material-ui/core/Container';
import book from '../images/book.jpg';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    margin:10
  },
  media: {
    height: 0,
    paddingTop: '35.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  card:{
      margin:10,
      display:"flex",
      flexWrap:"wrap"
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" style={{marginTop:"65px"}} >
      <div className={classes.card}>
 { props.books.map((b)=>{
          return(
      <Card key = {b.bookID} className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {b.title.charAt(0)}
                    </Avatar>
                    }
                    title={<Typography >{b.title}</Typography>}
                />
                <CardMedia
                    className={classes.media}
                    image={book}
                    title={b.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Price : {b.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Author : {b.authors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"  style={{display:"flex",marginTop:10}}>
                    Rating : <Rating name="read-only"  style={{marginTop:-4}} value={b.average_rating} readOnly /> ({b.ratings_count})
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" onClick={(e)=>{props.addToCartHandler(b.bookID)}}>
                    <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
                </Card>
          )  
        }) }
        </div>
        </Container >
        )
  }
