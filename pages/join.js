import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import confetti from 'canvas-confetti';

import Layout from '@/components/Layout'
import Button from '@/components/Button'
import VertSpace from '@/components/VertSpace'
import LoadingCover from '@/components/LoadingCover'
import sendVerify from '../libs/sendVerify'
import joinEvent from '../libs/joinEvent'
import completeSignup from '../libs/completeSignup'
import GETrequest from '@/libs/GETrequest'

// import Effect from 'react-reveal/Zoom'

const Effect = props => props.children

const fireConfetti = () => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

export default function Join () {
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [fieldsNeeded, setFieldsNeeded] = useState([])
    const [user, setUser] = useState({})
    const [verificationSent, setVerificationSent] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { handleSubmit: phoneSubmit } = useForm()
    const { handleSubmit: codeSubmit } = useForm()
    const [member, setMember] = useState(null)
    const [event, setEvent] = useState(null)

    // Get event
    useEffect(() => {
        (async () => {
            try {
                const event = await GETrequest({ endpoint: `/api/event` });
                setEvent(event)
                console.log(event);
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    useEffect(() => {
        if (complete === true) {
            const music = document.getElementById('music')
            music.volume = 0
            music.play()
            fireConfetti()
            // Fade in music
            const volControl = setInterval(() => {
                let vol = music.volume
                if (vol > .95) {
                    return clearInterval(volControl);
                }
                music.volume = vol + .025;
            }, 200);
        }
    }, [complete])

    const stopMusic = () => {
        const music = document.getElementById('music')
        music.pause()
    }

    const sendVerification = async () => {
        setErr('')
        if (!phone) { return setErr('Enter phone number.') }
        await sendVerify({
            phone,
            setLoading,
            setError: setErr,
            setSuccess,
            defaultErr: 'couldnt send verification',
            successMessage: `Verification sent to ${phone}.`
        })
        setVerificationSent(true)
        scrollToTop()
    }

    const submitJoin = async () => {
        setErr('')
        const res = await joinEvent({
            code,
            setLoading,
            setError: setErr,
            setSuccess,
            defaultErr: 'couldnt join event',
            successMessage: ''
        })
        setUser(res.user)
        scrollToTop()

        
        try {
            const memberPass = await GETrequest({ endpoint: `/api/members/${res.user._id}`});
            console.log('Member pass: ', memberPass)
            setMember(memberPass)
        } catch (err) {
            console.log('No member pass: ', err)
        }

        if (res.process_complete) {
            setComplete(true)
        } else {
            setFieldsNeeded(res.fields_needed)
        }
    }

    const onSubmitNewFields = async data => {
        try {
            const res = await completeSignup({
                code,
                fields: data,
                setLoading,
                setError: setErr,
                setSuccess,
                defaultErr: 'couldnt join event',
                successMessage: ''
            })
            scrollToTop()
            setUser(res.user)
            setComplete(true)
        } catch (err) {
            console.log(err)
        }
    }

    const scrollToTop = () => {
        return window.scrollTo(0,0);
    }

    return (
    <>
      <Layout>
          <Wrapper>
              { complete ? (
                  <>
                    <LoadingCover />
                    <h1>all set {user?.nickname ? user?.nickname : user.first_name}!</h1>
                    <MemberDetails member={member} />
                    <VertSpace big />
                    {
                        user?.aniticipaton?.added_by
                        ? <p>yeah, I know who you are motha fuckaaa! you're already on the list!</p>
                        : <></>
                    }
                    <VertSpace big />
                    <p>Bonechella 2022 has limited capacity</p>
                    <VertSpace big />
                    <p>if you make the cut, you'll be getting a text message with more details n shit soon!</p>
                    <VertSpace big />
                    <p>for questions about +1s, text or dm carbone</p>
                    <VertSpace big />
                    <p>feel free to share this link with anyone</p>
                    <VertSpace big />
                    <button onClick={stopMusic} className="stop">stop music</button>
                  </>
                ) : fieldsNeeded.length > 0 ?
                    (
                        <>
                            <Effect bottom>
                                <h1>Phone number lookin good</h1>
                                <VertSpace med />
                                <p>let me know who you are real quick...</p>
                                <VertSpace />
                                <form onSubmit={handleSubmit(onSubmitNewFields)}>
                                    <Input autoFocus={true} label="First name" id="first-name-input" placeholder="Charles" defaultValue={user.first_name} spread={{...register("first_name", { required: true })}} />
                                    <VertSpace small />
                                    <Input label="Last name" id="last-name-input" placeholder="Hagen" defaultValue={user.last_name} spread={{...register("last_name", { required: true })}} />
                                    <VertSpace big />
                                    {errors.first_name && <span>This field is required</span>}
                                    <Button type="submit">SEND IT</Button>
                                </form>
                            </Effect>
                        </>
                    ) :
                    (
                        <>
                            <Effect bottom>
                                <LoadingCover />
                                <h1>Hop on the invite list</h1>
                                <VertSpace med />
                                <p>Let&apos;s fuckn party</p>
                                { verificationSent ?
                                    <> 
                                            <form key="code-enter" onSubmit={codeSubmit(submitJoin)}>
                                                <VertSpace />
                                                <NumberInput autoFocus={true} label="Enter verification code" id="code-input" base={10} length='1234' setNumber={setCode} />
                                                <VertSpace small />
                                                <Button type="submit">Join event</Button>
                                            </form>
                                    </>
                                :
                                    <>
                                            <form key="phone-enter" onSubmit={phoneSubmit(sendVerification)}>
                                                <VertSpace />
                                                <NumberInput autoFocus={true} label="Enter phone number" id="phone-input" placeholder="2672182451" autoFocus={true} length='1234567890' setNumber={setPhone} />
                                                <VertSpace big />
                                                <Button type="submit">SEND IT</Button>
                                            </form>
                                    </>
                                }
                            </Effect>
                            <VertSpace />
                        </>
                    )
              }
            <VertSpace />
            <p className="success">{success}</p>
            {
                event &&
                <>
                    <VertSpace />
                    <p>{event?.counts?.total_invites} on the guest list so far</p>
                    <p>{event?.counts?.active_requests} on the waitlist</p>
                </>
            }
            <VertSpace />
            <p>{err}</p>
            <p>{loading ? 'loading' : ''}</p>
            <audio id="music" src="/love-it.mp3" ></audio>
          </Wrapper>
      </Layout>
      <style jsx>{`
              h1 {
                  font-size: 3.5rem;
                  margin-left: -5px;
              }

              .success {
                  font-size: .75rem;
                  font-style: italic;
                  color: #2416c8;
              }

              .stop {
                  font-size: 0.5rem;
                  background-color: transparent;
                  border-bottom: 1px solid black;
              }
              @media (max-width: 800px) {
                h1 {
                    font-size: 1.5rem;
                }
              }
      `}</style>
    </>
  )
}

const Wrapper = (props) => {

    return (
        <>
            <div>
                {props.children}
            </div>
            <style jsx>{`
                div {
                    max-width: 800px;
                    margin: 200px auto 0 auto;
                }

                @media (max-width: 800px) {
                    div {
                        margin: 50px auto 0 auto;
                        padding: 5px;
                    }
                }
            `}</style>
        </> 
    )
}

const Input = props => {
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>    
            <input
                id={props.id}
                autoFocus={props.autoFocus ? props.autoFocus : false}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                type={props.type ? props.type : 'text'}
                maxLength={props.maxLength}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                {...props.spread}
            ></input>
            <style jsx>{`
                label {
                    display: block;
                    font-size: 0.75rem;
                }

                input {
                    background-color: transparent;
                    border-bottom: 3px solid black;    
                    font-size: 1rem;
                    height: 50px;
                    margin: 0 10px 0 0;
                    max-width: 400px;
                    width: 100%;
                }

                input:focus {
                    outline: 0;
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Firefox */
                input[type=number] {
                    -moz-appearance: textfield;
                }

                input::placeholder {
                    color: #6f4c24;
                }
            `}</style>
        </>
    )
}

const NumberInput = props => {
    function check (e) {
        if (e.which === 8 || e.which === 13) { return }
        if (e.which < 48 || e.which > 57) {
            return e.preventDefault();
        }
    }
    return (
        <>
            <Input spread={{ pattern: '[0-9]*', inputMode: 'numeric' }} autoFocus={props.autoFocus} label={props.label} id={props.id} placeholder={props.placeholder} onChange={e => props.setNumber(e.target.value)} onKeyDown={e => check(e)} maxLength={10} />
        </>
    )
}

const MemberDetails = ({ member }) => {
    if (member == null) { return null }
    return (
        <>
            <VertSpace big />
            <div>
                {
                    member?.image?.url &&
                        <img src={member?.image?.url} />
                }
            </div>
            <style jsx>{`
                img {
                    border-radius: 8px;
                    max-height: 400px;
                    max-width: 200px;
                    object-fit: cover;
                }    
            `}</style>
        </>
    )
}
