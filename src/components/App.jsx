import { useCallback, useEffect, useState } from 'react';

import ImageAPI from '../services/pixabay';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Hearts } from  'react-loader-spinner'

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isBtn, setIsBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  // const [isFirst, setIsFirst] = useState(true);
  // const [submitQuery, setSubmitQuery] = useState('');

  useEffect(() => {
    // if (query !== submitQuery) {
      setPage(1);
    //   setQuery(submitQuery);
    // }
  }, [query]);

  const logicRe = useCallback(() => {
    setIsBtn(false);
    setIsLoading(true);

      ImageAPI.searchPixabayApi(query, page).then((response) => {
        if (response.hits.length === 0) {
          setIsLoading(false);
          return toast.error('Wasted!');
        }

        if (response?.status === 400) {
          setIsBtn(false);
          setIsLoading(false);
          throw new Error('Oh, noooooooooooooooooooo');
        }

        setImages(p => {
          if (page === 1) {
            return response.hits;
          } else {
            return [...p, ...response.hits];
          }
        });

        setIsBtn(true);
        setIsLoading(false);
        setTotalHits(response.totalHits);
        // setSubmitQuery(query);

        if (response.hits <= 12) {
          this.setState({isBtn: false});
        }
        
      }).catch(error => {
        setIsBtn(false);
        setIsLoading(false);
        return toast.error(error.message);
      });
  },[query, page]);

  useEffect(() => {
    if (query !== '' || page !== 1) {
      logicRe();
    }
  }, [query, page, logicRe]);

  const handlerSubmitSearchbar = (value) => {
    setQuery(value);
    setPage(1);
    // this.setState({query: value, page: 1});
  };

  const nextPageBtn = () => {
    setPage(prev => prev + 1);
    // this.setState(prev => ({page: prev.page + 1}));
  };

  const openModal = modalData => {
    setModalData(modalData);
  };

  const closeModal = () => {
    setModalData(null);
  };

    return(
      <>
        <Searchbar onSubmit={handlerSubmitSearchbar}/>
        <ImageGallery 
          images={images}
          openModal={openModal}/>
        {isBtn && totalHits !== images.length && <Button onClick={nextPageBtn}/>}
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
        {modalData && <Modal {...modalData} closeModal={closeModal}/>}
      </>
    );
};

export default App;