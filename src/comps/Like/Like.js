import React, { useEffect, useState } from 'react'
import likeService from '../../services/likeService'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export function LikeButton(props) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [listLikes, setListLikes] = useState({})
    const services = likeService()
    const { getLikes, newLike, removeLike, youLike, getTwoUsers } = services
    useEffect(() => {
        async function handleLike() {
            const body = {
                userId: props.idUser,
                postId: props.idPost
            }
            const { data: dataYouLike } = await youLike(body)
            setIsLiked(dataYouLike.status)

            const { data: dataGetLikes } = await getLikes({ postId: props.idPost })
            setLikes(Number(dataGetLikes[0].count))

            const { data: dataTwoUsers } = await getTwoUsers({ postId: props.idPost })

            if (dataYouLike.status) {
                if (dataTwoUsers.length === 0) {
                    dataTwoUsers.push({ name: "You" })
                } else {
                    if (dataTwoUsers.length === 1) {
                        dataTwoUsers.unshift({ name: "You" })
                    } else {
                        dataTwoUsers[0].name = "You"
                    }
                }
            }

            switch (dataGetLikes[0].count) {
                case '2':
                    setListLikes(dataTwoUsers.map(u => u.name).join(', '))
                    break;
                case '1':
                    setListLikes(dataTwoUsers.map(u => u.name).join(', '))
                    break;
                case '0':
                    setListLikes('')
                    break;
                default:
                    setListLikes(dataTwoUsers.map(u => u.name).join(', ') + ' and other ' + (Number(dataGetLikes[0].count) - 2) + ' people')
                    break;
            }
        }
        handleLike()
    }, [])

    const removeLikeButton = async () => {
        const body = {
            userId: props.idUser,
            postId: props.idPost
        }
        await removeLike(body)
        setLikes(Number(likes) - 1);
        setIsLiked(false)
        const { data: dataTwoUsers } = await getTwoUsers({ postId: props.idPost })

        switch (Number(likes) - 1) {
            case 2:
                setListLikes(dataTwoUsers.map(u => u.name).join(', '))
                break;
            case 1:
                setListLikes(dataTwoUsers.map(u => u.name).join(', '))
                break;
            case 0:
                setListLikes('')
                break;
            default:
                setListLikes(dataTwoUsers.map(u => u.name).join(', ') + ' and other ' + (Number(likes) + 1 - 2) + ' people')
                break;
        }
    }

    const addLikeButton = async () => {
        const body = {
            userId: props.idUser,
            postId: props.idPost
        }
        await newLike(body)
        setLikes(likes + 1)
        setIsLiked(true)

        const { data: dataTwoUsers } = await getTwoUsers({ postId: props.idPost })


        if (dataTwoUsers.length === 0) {
            dataTwoUsers.push({ name: "You" })
        } else {
            if (dataTwoUsers.length === 1) {
                dataTwoUsers.unshift({ name: "You" })
            } else {
                dataTwoUsers[0].name = "You"
            }
        }

        switch (likes + 1) {
            case 2:
                setListLikes(dataTwoUsers.map(u => u.name).join(', '))
                break;
            case 1:
                setListLikes('You')
                break;
            case 0:
                setListLikes('')
                break;
            default:
                setListLikes(dataTwoUsers.map(u => u.name).join(', ') + ' and other ' + (Number(likes + 1) - 2) + ' people')
                break;
        }
    };

    return (
        <LikeContainer>
            <Tooltip id="my-tooltip" data-test="tooltip" />
            {isLiked ? <AiFillHeart
                data-test="like-btn"
                size={18}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={listLikes}
                onClick={removeLikeButton} style={{ color: '#AC0000' }} />
                :
                <AiOutlineHeart
                    data-test="like-btn"
                    size={18}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={listLikes}
                    onClick={addLikeButton} style={{ color: 'white' }} />}
            <p data-test="counter">{likes} likes</p>
        </LikeContainer>

    );
}

const LikeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
    }

`


