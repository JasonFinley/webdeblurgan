"use client"

import { Image } from 'antd';

const LineQRCode = () => {
    return <div className='w-full h-full flex items-center justify-center'>
        <Image
            preview={true}
            src='L_gainfriends_2dbarcodes_GW.png'
            alt='Line QR Code'
            width={180}
            height={180}
        />
    </div>
}

export default LineQRCode;