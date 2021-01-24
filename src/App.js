import React from "react";
import './App.css';
import Appbar from './components/appbar';
import books from'./book.json';
import BookList from './components/bookList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './components/cart';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asc:true,
      searchKeyword: '',
      bookList:books,
      cartList:[],
      snackBarOpen:false
    };
 
  }
  incQuantity=(id)=>{
    let selectedBook = this.state.cartList.find(book=>book.bookID === id);
    selectedBook.quantity=selectedBook.quantity+1;
    let updCartList =  Object.assign([],this.state.cartList,selectedBook);
    this.setState({cartList:updCartList});
  }
  decQuantity = (id) => {
    let updCartList = this.state.cartList;
    let selectedBook = updCartList.find(book => book.bookID === id);
    console.log(selectedBook.quantity);
    if (selectedBook.quantity === 1) {
      updCartList = this.state.cartList.filter(l=>l.bookID !== id);
    }
    else {
      selectedBook.quantity = selectedBook.quantity - 1;
      updCartList =  Object.assign([],this.state.cartList,selectedBook);
    }
    this.setState({ cartList: updCartList });
  }
  
  sortBookList=()=>{
    let isasc= !this.state.asc;
    let booksList = this.state.bookList;
    let sortedList = this.state.asc  ? booksList.sort((a,b)=>b.average_rating-a.average_rating) : booksList.sort((a,b)=>a.average_rating-b.average_rating) ;
    this.setState({bookList:sortedList,asc:isasc});
  }
  addCartHandler=(id)=>{
    let searchResult = this.state.bookList.find(l=>l.bookID === id);
    let updatedCartList = this.state.cartList;
    let selectedBook = this.state.cartList.find(book => book.bookID === id);
    if(!selectedBook){
      updatedCartList.push({...searchResult,quantity:1});
    }
    else{
      selectedBook.quantity= selectedBook.quantity+ 1;
      updatedCartList=Object.assign([],this.state.cartList,selectedBook);
    }
    this.setState({cartList:updatedCartList,snackBarOpen:true})
  }
  removeItems = (id)=>{
    let searchResult = this.state.cartList.filter(l=>l.bookID !== id);
    this.setState({cartList:searchResult})
  }
  handleSearch = (e)=>{
    let currentBookList = [];
    let searchResult = this.state.bookList.find(l=>l.title === e);
    currentBookList.push(searchResult);
    this.setState({bookList:currentBookList})

  }
  searchClear=()=>{
    this.setState({bookList:books})
  }
  handleSnackBarClose=()=>{
    this.setState({snackBarOpen:false})
  }
render() {
  return (
      <Router> 
        <div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snackBarOpen}
        autoHideDuration={3000}
        onClose={this.handleSnackBarClose}
        message="Item has been added to the cart!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackBarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        <Appbar handleSearch={this.handleSearch} searchClear={this.searchClear} sortBookList={this.sortBookList} state={this.state}/>
            <Switch>
                <Route path="/" render={()=>  <BookList books={this.state.bookList} addToCartHandler={this.addCartHandler}/>} exact />
                <Route path="/cart" render={()=><Cart state={this.state} removeItems={this.removeItems} decQuantity={this.decQuantity} incQuantity={this.incQuantity}  />} />
            </Switch>
        </div>
            </Router> 
  );
}
}
