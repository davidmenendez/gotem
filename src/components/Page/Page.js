import React from 'react';

const Page = ({
  className,
  children,
}) => (
  <section className={className}>
      <div className="container">
        {children}
      </div>
    </section>
);

export default Page;
