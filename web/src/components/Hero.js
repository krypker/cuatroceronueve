import React from "react";

export default function Title(props) {
  return (
    <div className='max-w-xl mx-auto lg:max-w-2xl'>
      <div className='flex flex-col text-center sm:mb-0'>
        <h2 className='mx-6 my-2 font-sans lg:text-3xl text-2xl text-gray-600 font-bold leading-none tracking-normal pb-4 md:mx-auto'>
          {props.header}
        </h2>
        <div className='text-md text-gray-500 lg:text-md mb-2 md:px-10 sm:px-20'>
          {props.message}
        </div>
      </div>
    </div>
  );
}
