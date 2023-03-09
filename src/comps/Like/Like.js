import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [listLikes, setListLikes] = useState({})
    const [mappedNames, setMappedNames] = useState('')

    useEffect(() => {
        async function handleLike() {
            const body = {
                userId: 2,
                postId: 1
            }
            axios.post(process.env.REACT_APP_API_URL+'/getLikes', body)
                .then((res) => {
                    const newLikes = res.data
                    setLikes(res.data)
                    axios.post(process.env.REACT_APP_API_URL+'/twoUsers', body)
                        .then((res) => {

                            const names = res.data
                            setMappedNames(names.map(u => u.name).join(', '))
                            console.log(newLikes)
                            setListLikes(names.map(u => u.name).join(', ') + ' and other ' + (Number(newLikes) - 2) + ' people')
                        })
                })


        }
        handleLike()

    }, [])
    const handleLikeClick = () => {
        const body = {
            userId: 2,
            postId: 1
        }
        if (isLiked) {

            axios.post(process.env.REACT_APP_API_URL+'/removeLike', body)
                .then((res) => {
                    console.log(res.data)
                    setLikes(likes - 1);
                    setListLikes(mappedNames + ' and other ' + (Number(likes-1) - 2) + ' people')
                })
        } else {
            axios.post(process.env.REACT_APP_API_URL+'/newLike', body)
                .then((res) => {
                    console.log(res.data)
                    setLikes(likes + 1);
                    setListLikes(mappedNames + ' and other ' + (Number(likes+1) - 2) + ' people')
                })

        }
        setIsLiked(!isLiked);
    };

    return (
        <>
            <Tooltip id="my-tooltip" />
            {isLiked ? <AiFillHeart
                data-tooltip-id="my-tooltip"
                data-tooltip-content={listLikes}
                onClick={handleLikeClick} />
                :
                <AiOutlineHeart
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={listLikes}
                    onClick={handleLikeClick} />} {likes}
        </>

    );
}


