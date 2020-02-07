import React from 'react';
import { connect } from 'react-redux';
import './Notifications.css';

const Notifications = ({
  items,
}) => (
    <div className="notifications">
      {items.map(item => (
        <div key={item.id} className="notification">
          {item.text}
        </div>
      ))}
    </div>
  );

const mapStateToProps = state => ({
  items: state.notifications,
});

export default connect(mapStateToProps)(Notifications);
