import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.css';

const LoadingView: React.FC = () => (
  <div id="app-loading-circle">
    <LoadingOutlined />
  </div>
);

export default LoadingView;
