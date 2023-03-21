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
    let youLike = false
    console.log(props)

    useEffect(() => {
        async function handleLike() {
            const body = {
                userId: props.idUser,
                postId: props.idPost
            }
            axios.post(process.env.REACT_APP_API_URL + '/youLike', body)
                .then((res) => {
                    if (res.data === false) {
                        youLike = !res.data
                    }

                
                })
            axios.post(process.env.REACT_APP_API_URL + '/getLikes', body)
                .then((res) => {
                    const newLikes = res.data
                    setLikes(res.data)
                    axios.post(process.env.REACT_APP_API_URL + '/twoUsers', body)
                        .then((res) => {

                            const names = res.data
                        
                            if (youLike) {

                                setIsLiked(true)
                                if (names.length > 0) {
                                    delete names[0].name
                                    names[0].name = "You"
                                }

                            }
                            if (newLikes === 2) {
                                setMappedNames(names.map(u => u.name).join(', '))

                                setListLikes(names.map(u => u.name).join(', '))
                            } else if (newLikes === 1) {
                                setMappedNames(names.map(u => u.name).join(', '))

                                setListLikes(names.map(u => u.name).join(', '))
                            } else if (newLikes === 0) {
                                setListLikes('')
                            } else {
                                setMappedNames(names.map(u => u.name).join(', '))

                                
                                setListLikes(names.map(u => u.name).join(', ') + ' and other ' + (Number(newLikes) - 2) + ' people')
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

            axios.post(process.env.REACT_APP_API_URL + '/removeLike', body)
                .then((res) => {
                    console.log(res.data)
                    setLikes(likes - 1);
                    axios.post(process.env.REACT_APP_API_URL + '/twoUsers', body)
                        .then((res) => {

                            const names = res.data
                            if (likes - 1 === 2) {

                                setMappedNames(names.map(u => u.name).join(', '))

                               
                                setListLikes(names.map(u => u.name).join(', '))
                            } else if (likes - 1 === 1) {

                                setMappedNames(names.map(u => u.name).join(', '))
                               
                                setListLikes(names.map(u => u.name).join(', '))
                            } else if (likes - 1 === 0) {
                                setListLikes('')
                               
                            } else {
                                setMappedNames(names.map(u => u.name).join(', '))

                                console.log(likes + 'maisDeDois')
                                setListLikes(names.map(u => u.name).join(', ') + ' and other ' + (Number(likes + 1) - 2) + ' people')
                            }
                        })
                })
        } else {
            axios.post(process.env.REACT_APP_API_URL + '/newLike', body)
                .then((res) => {
                    console.log('newLike:' + res.data)
                    setLikes(likes + 1);
                    axios.post(process.env.REACT_APP_API_URL + '/twoUsers', body)
                        .then((res) => {
                            youLike = true
                            const names = res.data
                            if (youLike) {

                                setIsLiked(true)

                            }
                            if (likes + 1 === 2) {

                                if (names.length > 0) {
                                    delete names[0].name
                                    names[0].name = "You"
                                }
                                setMappedNames(names.map(u => u.name).join(', '))

                                console.log(likes + 'dois')
                                setListLikes(names.map(u => u.name).join(', '))
                            } else if (likes + 1 === 1) {
                                if (names.length > 0) {
                                    delete names[0].name
                                    names[0].name = "You"
                                }

                                setMappedNames(names.map(u => u.name).join(', '))
                                console.log(likes + 'um')
                                setListLikes('You')
                            } else if (likes + 1 === 0) {
                                setListLikes('')
                                console.log(likes + 'zero')
                            } else {
                                delete names[0].name
                                names[0].name = "You"
                                setMappedNames(names.map(u => u.name).join(', '))

                                console.log(likes + 'maisDeDois')
                                setListLikes(names.map(u => u.name).join(', ') + ' and other ' + (Number(likes + 1) - 2) + ' people')
                            }
                        })
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
                onClick={handleLikeClick} style={{color:'#AC0000'}} />
                :
                <AiOutlineHeart
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={listLikes}
                    onClick={handleLikeClick} style={{color:'white'}}/>} 
        </>

    );
}


