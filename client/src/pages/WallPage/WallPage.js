import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import styles from './styles.js';

import Navbar from '../../components/Navbar/Navbar';
import InfoForm from '../../components/InfoForm/InfoForm';

import { useDispatch } from 'react-redux';

const { Content } = Layout;
const { Title, Text } = Typography;

function WallPage() {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	return (
		<>
			<Layout>
				<Navbar selectedMenu="wall" />
				<Layout>
					<InfoForm></InfoForm>
				</Layout>
			</Layout>
		</>
	);
}

export default WallPage;
