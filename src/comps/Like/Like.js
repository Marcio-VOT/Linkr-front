import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export function LikeButton(props) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [listLikes, setListLikes] = useState({})
    const [mappedNames, setMappedNames] = useState('')

    useEffect(() => {
        async function handleLike() {
            const body = {
                userId: props.idUser,
                postId: props.idPost
            }
            axios.post(process.env.REACT_APP_API_URL+'/getLikes', body)
                .then((res) => {
                    const newLikes = res.data
                    setLikes(res.data)
                    axios.post(process.env.REACT_APP_API_URL+'/twoUsers', body)
                        .then((res) => {
                            
                            const names = res.data
        
                            if(names?.length === 2){
                                setMappedNames(names.map(u => u.name).join(', '))
                                setListLikes(names.map(u => u.name).join(', ') + ' and other ' + (Number(newLikes) - 2) + ' people')
                            }else if(names?.length === 1){
                                
                            }else if(names?.length === 0){

                            }
                            
                        })
                })


        }
        handleLike()

    }, [])
    const handleLikeClick = () => {
        const body = {
            userId: props.idUser,
            postId: props.idPost
        }
        if (isLiked) {

            axios.post(process.env.REACT_APP_API_URL+'/removeLike', body)
                .then((res) => {
                    setLikes(likes - 1);
                    setListLikes(mappedNames + ' and other ' + (Number(likes-1) - 2) + ' people')
                })
        } else {
            axios.post(process.env.REACT_APP_API_URL+'/newLike', body)
                .then((res) => {
                    setLikes(likes + 1);
                    setListLikes(mappedNames + ' and other ' + (Number(likes+1) - 2) + ' people')
                })

        }
        setIsLiked(!isLiked);
    };

    return (
        <>
            <Tooltip id="my-tooltip" />
            {isLiked ? 
                    <AiFillHeart
                        color="#AC0000"
                        style={{cursor:'pointer'}}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={listLikes}
                        onClick={handleLikeClick} />
                :
                <AiOutlineHeart
                    color="white"
                    style={{cursor:'pointer'}}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={listLikes}
                    onClick={handleLikeClick} />} 
        </>

    );
}


