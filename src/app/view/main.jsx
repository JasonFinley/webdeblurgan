"use client"

import React, { useState } from 'react';
import Image from "next/image";
import { Layout, Menu, Grid } from 'antd';
import ViewDeblur from './deblur';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import LineQRCode from '../components/lineqr';
import AIHelp from './aihelp';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const ViewMain = () => {

    const [selectedKey, setSelectedKey] = useState('1');
    const screens = useBreakpoint();

    const items = [{
        key: '1',
        label : '畫質修復',
    },{
//        key: '2',
//        label : '畫質修復',
//    },{
//        key: '3',
//        label : '圖像濾鏡',
//    },{
        key: '4',
        label : '圖片助理',
    }]

    const handleOnSelectMenu = (e) => {
        console.log('click ', e.key);
        setSelectedKey( e.key );
    }

    return (
    <Layout hasSider>
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'sticky',
                insetInlineStart: 0,
                top: 0,
                bottom: 0,
                scrollbarWidth: 'thin',
                scrollbarGutter: 'stable',
            }}
            breakpoint='xs'
            collapsedWidth={0}
        >
            <div className='w-full h-32 bg-[#061830] flex justify-center items-center'>
                <Image
                    priority
                    unoptimized 
                    height={96} 
                    width={128} 
                    src={"/clearify_logo.png"} 
                    alt="Clearify LOGO"
                    style={{ 
                        width: '100%', 
                        height: 'auto', 
                        objectFit: 'contain' 
                    }}
                />
            </div>
            <Menu 
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']} 
                items={items}
                style={{
                    fontSize: "20px",
                    textAlign: "center"
                }}
                onSelect={ handleOnSelectMenu }
            />
            <div className='absolute left-1 bottom-2'>
                <LineQRCode/>
            </div>
        </Sider>
        <Layout
            style={{background: "#424242ff"}}
        >
            <Header style={{ padding: 0, background: "#061830" }}>
                {   
                    screens.xs && <div
                        className='flex justify-between items-center'
                    >
                        <Image
                            priority
                            unoptimized 
                            height={64} 
                            width={128} 
                            src={"/clearify_logo.png"} 
                            alt="Clearify LOGO"
                            style={{ 
                                width: '128px', 
                                height: '64px', 
                                objectFit: 'contain' 
                            }}
                        />
                        <Dropdown
                            menu={ {
                                items,
                                className: 'custom-dropdown-menu',
                                onClick: handleOnSelectMenu
                            } }
                            trigger={['click']}
                            
                        >
                            <MoreOutlined style={{ fontSize: 36, color: '#ffffffe0', marginRight: "4px" }}/>
                        </Dropdown>
                    </div>
                }
            </Header>
            <Content style={{ 
                    margin: '24px 16px 0', 
                    overflow: 'initial'
                }}
            >
            <div
                style={{
                    padding: 24,
                    height: "100%",
                    minHeight: 360,
                    background: "#061830",
                    borderRadius: 8,
                }}
            >
                {
                    selectedKey === '1' ? (
                        <div>
                            <ViewDeblur/>
                        </div>
                    ) : selectedKey === '2' ? ( 
                        <div className='text-2xl text-white'>畫質修復內容區 - Comming Soon</div>
                    ) : selectedKey === '3' ? (
                        <div className='text-2xl text-white'>圖像濾鏡區 - Comming Soon</div>
                    ) : selectedKey === '4' ? (
                        <div className='h-full w-full text-2xl text-white'>
                            <AIHelp/>
                        </div>
                    ) : (
                        <div className='text-2xl text-white'>Comming Soon</div>
                    )
                }
            </div>
            </Content>
            { selectedKey !== '4' ? (
                <Footer style={{ textAlign: 'center', background: "#424242ff", color: "#ffffff" }}>
                    IT ©{new Date().getFullYear()} Created by AI Clearify Team
                </Footer>
            ) : (<></>)
            }
        </Layout>
    </Layout>);
}

export default ViewMain;