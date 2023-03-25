import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { follow, unfollow, verifyFollow } from "../../services/followService"


export default function FollowButton() {

    const [follower, setFollower] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const followerId = localStorage.getItem("userid")
    const { id: userId } = useParams()

    useEffect(() => {
        async function handleFollow() {
            const result = await verifyFollow({ userId })
            if (result.data.length > 0) {
                setFollower(true)
            }
        }
        handleFollow()

    }, [])

    async function unfollowClick() {
        try {
            await unfollow({ userId, setDisabled })
            setFollower(false)
        } catch (error) {
            console.log(error)
            alert("Não foi possível completar a operação")
        }

    }

    async function followClick() {
        try {
            await follow({ followerId, userId, setDisabled })
            setFollower(true)
        } catch (error) {
            console.log(error)
            alert("Não foi possível completar a operação")
        }

    }

    return (
        <>
            {follower ? (
                <UnfollowButtonContainer disabled={disabled} onClick={unfollowClick}>
                    unfollow
                </UnfollowButtonContainer>

            ) : (
                <FollowButtonContainer disabled={disabled} onClick={followClick}>
                    follow
                </FollowButtonContainer>
            )
            }
        </>
    )
}

const FollowButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 35px;
    border-radius: 6px;
    background-color: #1877f2;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    border: none;
    @media (max-width: 800px){
        margin-left: 70px;
    }
`
const UnfollowButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 35px;
    border-radius: 6px;
    background-color: #ffffff;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #1877f2;
    border: none;
    @media (max-width: 800px){
        margin-left: 70px;
    }
`