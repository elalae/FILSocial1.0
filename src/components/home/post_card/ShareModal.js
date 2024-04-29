import React from 'react'
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon
} from 'react-share'

const ShareModal = ({url}) => {
    return (
        <div className="d-flex justify-content-between px-2 py-2">
            <FacebookShareButton url={url} className="mr-6">
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url} className="mr-6">
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <RedditShareButton url={url} className="mr-6">
                <RedditIcon round={true} size={32} />
            </RedditShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
        </div>
    )
}

export default ShareModal
