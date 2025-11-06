"use client"

import { AntdSmallUpload } from "@/app/components/antdupload";
import { Button, Divider, Input } from "antd";
import { useEffect, useRef, useState } from "react";

const DisplayMessage = ({ item }) => {
    if( item.who === "ME" )
        return (
            <div className="w-full flex justify-end">
                {item.type === "IMAGE" ? (
                    <img className="w-56 h-56 object-contain" src={item.value} alt="User Image" />
                ) : (
                    <div className="text-white text-xl">{item.value}</div>
                )
                }
            </div>
        )

    return (
        <div className="w-full flex justify-center">
            {item.type === "IMAGE" ? (
                <img className="max-w-72 max-h-72 object-contain" src={item.value} alt="AI Image" />
            ) : (
                <div className="text-white text-2xl">{item.value}</div>
            )
            }
        </div>
    )
}

const AIHelp = () => {

    const [ msgCnt, setMsgCnt ] = useState(0)
    const [ messageList, setMessageList ] = useState([]);
    const [ upLoadFileObj, setUpLoadFileObj ] = useState({
        created_at: null,
        asset_id: null,
        public_id: null,
        version: null,
        format: null,
        url: null,
        width: 1280,
        height: 960,
        name: null,
        // format: "jpg",
        // url: "https://picsum.photos/id/1/1280/720",
        //width: 1280,
        //height: 720,
        // name: "random_image",
    } );

    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);


    const handleSendMessage = () => {

        if( inputText.length <= 0 ) return;

        const cnt = msgCnt;
        setMessageList( ( pre ) => {
            const newMsgs = [ ...pre ];
            if( upLoadFileObj.url ){
                newMsgs.push({
                    id: `ME-${cnt}`,
                    who: "ME",
                    type: "IMAGE",
                    value: upLoadFileObj.url
                    //value: "https://picsum.photos/1280/720"
                })
            }

            newMsgs.push({
                id: `ME-${cnt + 1}`,
                who: "ME",
                type: "TEXT",
                value: inputText
            })
            return newMsgs
        } )

        setMsgCnt( msgCnt + 2 );
        setUpLoadFileObj({
            created_at: null,
            asset_id: null,
            public_id: null,
            version: null,
            format: null,
            url: null,
            width: 1280,
            height: 960,
            name: null
        } );
        setInputText("");
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgCnt]);

    return (
    <div className="w-full h-full">
        <div className="w-full">
            <div className="w-full pb-32 px-8">
                {
                    messageList.map( (item, idx) => {
                        
                        let isSameWho = idx >= 1 && messageList[idx - 1].who === item.who

                        return (
                            <div key={item.id} className="w-full">
                                { !isSameWho && <Divider style={{ borderColor: '#ffffff50' }}/> }
                                <DisplayMessage item={item}/>
                            </div>
                        )
                    } )
                }
                <div ref={messagesEndRef} />
            </div>
            <div className="fixed bottom-4 w-2/3 h-28 px-2 rounded-xl bg-black flex justify-center items-center">
                <AntdSmallUpload setUploadFileObj={ setUpLoadFileObj } />
                <Input
                    value={inputText}
                    placeholder={"請輸入文字..."}
                    style={{
                        minWidth: "168px",
                        maxWidth: "640px",
                        height: "72px",
                        marginLeft: "8px",
                        marginRight: "8px",
                        fontSize: "20px"
                    }}
                    onChange={ (e) => { setInputText(e.target.value) } }
                />
                <Button
                    style={{
                        color: inputText.length <= 0 ? "#f0f0f050" : "black",
                        fontSize: "20px",
                        fontWeight: "700",
                        width: "72px",
                        height: "72px"
                    }}
                    disabled={ inputText.length <= 0 }
                    onClick={ handleSendMessage }
                >送出</Button>
            </div>
        </div>
    </div>
    )
}

export default AIHelp;