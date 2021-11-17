const PopupInfo = (props: any) => {
    return (
        <>
            {/*console.log(props.userInfo)*/}
            {
                props.userInfo !== undefined && (
                    (props.userInfo.userID) + `\n` +
                    (props.userInfo.geoLocation.latitude) + `\n` +
                    (props.userInfo.geoLocation.longitude)
                )
            }
            {props.userInfo !== undefined && (
                <button onClick={async () => props.connect(props.userInfo.userID)}>connect</button>
            )
            }
        </>
    )
}
export default PopupInfo
