import React from 'react';
import {Helmet} from 'react-helmet-async';

const Title = ({title="Chat App",description="A simple chat application"}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet> 
    </div>
  );
};

export default Title;