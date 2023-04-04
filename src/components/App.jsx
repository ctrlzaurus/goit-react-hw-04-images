import { Component } from 'react';

import ImageAPI from '../services/pixabay';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Hearts } from  'react-loader-spinner'

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    error: null,
    page: 1,
    images: [],
    isBtn: false,
    isLoading: false,
    modalData: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const {query, page} = this.state;

    if (prevState.query !== query) {
      this.setState({images: [], isBtn: false, isLoading: true, totalHits: 0});

      ImageAPI.searchPixabayApi(query, page).then((response) => {
        if (response.hits.length === 0) {
          this.setState({isLoading: false});
          return toast.error('Wasted!');
        }
        
        this.setState(({ images }) => ({
          images: [...images, ...response.hits],
          isBtn: true,
          isLoading: false,
          totalHits: response.totalHits
        }));
      });
    };
    if (prevState.page !== page) {
      this.setState({isBtn: false, isLoading: true});

      ImageAPI.searchPixabayApi(query, page).then((response) => {
        console.log(response);
        if (response?.status === 400) {
          this.setState({isLoading: false, isBtn: false});
          throw new Error('Oh, noooooooooooooooooooo');
        }
        this.setState(({ images }) => ({
          images: [...images, ...response?.hits],
          isBtn: true,
          isLoading: false,
        }));
        if (response.hits <= 12) {
          this.setState({isBtn: false});
        }
        
      }).catch(error => {
        this.setState({isLoading: false, isBtn: false});
        return toast.error(error.message);
      });
    };
  };

  handlerSubmitSearchbar = (value) => {
    this.setState({query: value, page: 1});
  };

  nextPageBtn = () => {
    this.setState(prev => ({page: prev.page + 1}));
  };

  openModal = modalData => {
    this.setState({ modalData });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const {images, isBtn, isLoading, modalData, totalHits} = this.state;

    return(
      <>
        <Searchbar onSubmit={this.handlerSubmitSearchbar}/>
        <ImageGallery 
          images={images}
          openModal={this.openModal}/>
        {isBtn && totalHits !== images.length && <Button onClick={this.nextPageBtn}/>}
        <ToastContainer />
        {isLoading && <Hearts 
          height="80"
          width="80"
          color="#f0baec"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass="loading"
          visible={true}
        />}
        {modalData && <Modal {...modalData} closeModal={this.closeModal}/>}
      </>
    );
  };
};

export default App;