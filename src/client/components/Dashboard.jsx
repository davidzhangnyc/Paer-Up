/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Logo from './Logo';
import ProfileContainer from './Profile/ProfileContainer';
import ConnectionContainer from './Connections/ConnectionContainer';
import MessageContainer from './Messages/MessageContainer';

const Dashboard = () => {
  const [currentUserName, setCurrentUserName] = useState(null); // the username of whos logged in
  const [allUsersData, setAllUsersData] = useState([]);
  const [renderedPageUserName, setRenderedPageUserName] = useState(null); // the username of the page we wanna see

  useEffect(() => {
    fetch('/api/user')
      .then((data) => data.json())
      .then((items) => {
        setCurrentUserName(items.username);
        setRenderedPageUserName(items.username);
      })
      .catch((err) => console.error(err));

    fetch('/api/connect')
      .then((data) => data.json())
      .then((items) => setAllUsersData(items))
      .then((items) => console.log(items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Sidebar currentUser={currentUserName} resetUser={setRenderedPageUserName} />
      <div className="container">
        <Switch>
          <Route path="/dashboard/messages" render={(props) => <MessageContainer {...props} />} />
          <Route path="/dashboard/connect" render={(props) => <ConnectionContainer {...props} />} />
          <Route
            path="/dashboard/userprofile"
            render={(props) => <ProfileContainer {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
