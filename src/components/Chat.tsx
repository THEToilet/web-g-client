import {Button} from "@mui/material";
import {HelmetProvider} from "react-helmet-async";
import {useRef} from "react";

const Chat = () => {
    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    return (
        <>
            <textarea readOnly={true} ref={remoteMessageRef}/>
            <textarea ref={localMessageRef}/>
            <button onClick={sendDataChanelMessage}>SendDataChannel</button>
            <Button variant="contained" endIcon={<SendIcon/>}>
                Send
            </Button>
        </>
    )
}
export default Chat