import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { useLoadImage } from "./hooks/useLoadImage";
import {usePageIndex} from "./hooks/usePageIndex";
import { Loader } from "./common/loader";

const config = {root: null, rootMargin: "10px", threshold: 1.0}

export const App = () => {
  const [pageState, setPage] = usePageIndex();
  const { images, isLoading, error } = useLoadImage(pageState.page);
  let forwardRef = useRef(null);

  const scrollPage = useCallback((node) => {
    new window.IntersectionObserver(entries => entries.forEach(en => {
      if (en.intersectionRatio > 0) {
        setPage({type: "SET_PAGE"});
      }
    }), config).observe(node);
  }, [setPage]);

  useEffect(() => {
    if(forwardRef.current) {
      scrollPage(forwardRef.current);
    }

  }, [forwardRef, scrollPage]);

  return (
      <div className="">
        <div className="container row">
          {images.map((image, index) => {
            const { author, download_url } = image
            return (
              <div key={index} className="card" style={{ width: 200 }}>
                <div className="card-body ">
                  <img
                    alt={author}
                    className="card-img-top"
                    src={download_url}
                  />
                </div>
                <div className="card-footer">
                  <p className="card-text text-center text-capitalize text-primary">Shot by: {author}</p>
                </div>
              </div>
            )
          })}
        </div>
        <Loader isLoading/>
        <div id="footer" style={{ height: 10, background: "red"}} ref={forwardRef}></div>
      </div>
  );
}

export default App;
