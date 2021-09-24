import Loader from 'react-loader-spinner';

function LoaderSpinner() {
  return (
    //   <Loader
    //     type="Oval"
    //     color="#00BFFF"
    //     height={80}
    //     width={80}
    //     timeout={3000}
    //     className="LoaderSpinner"
    //   />
    
      <Loader
          type="ThreeDots"
          color="#cc4758"
          height={80}
          width={80}          
      />
    );
}

export default LoaderSpinner;