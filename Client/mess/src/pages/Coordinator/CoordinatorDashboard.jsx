import React, { useEffect } from 'react';
import { useContext } from "react"
import { Spin } from "antd";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/sidebar/SideBar';
import Context from '../../context/Context';

const CoordinatorDashboard = props => {


    const { loading, setLoading, success, error, contextHolder, changeActiveTab} = useContext(Context);
    

    useEffect(() => {
        changeActiveTab('DASHBOARD');

    }, [])



    return (
        <>
        {contextHolder}
        <Spin tip="Loading...." size='large' spinning={loading}>
            <div className="home-container">
                <div className="home-header-sidebar"><Header /></div>

                <div className="header-down">
                    <div className="sidebar-container">
                        <Sidebar />
                    </div>
                    <div className="main-content">
                    <h1 >Heading at the Top of the Page</h1>
hello
                    </div>
                </div>

            </div>
        </Spin>
    </>
        
    );
};


export default CoordinatorDashboard;