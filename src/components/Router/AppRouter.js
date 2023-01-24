import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {publicRoutes} from './routes';
import NotFoundPage from './NotFoundPage';
import Users from '../../pages/Users/Users';


const AppRouter = () => {
  return (
    <div>
      <Routes>
        {publicRoutes.map(({path, element}) =>
          <Route
            path={path}
            key={path}
            element={element}
            exact
          />
        )}
          <Route path="/" element={<Users/>}/>
          <Route exact path="*" element={<NotFoundPage/>}/>

      </Routes>
    </div>
  );
};

export default AppRouter;
